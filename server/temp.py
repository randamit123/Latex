from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
import os
import cv2
import shutil

# temporary backend server using CNN model till ViT is up and running

app = Flask(__name__)
CORS(app)

model_path = "handwritten_math_symbols_CNN_model.keras"  # model

SEGMENTED_DIR = "segmented_symbols"  # temp dir to store segmented images

# data_dir = "/Users/ARand/Desktop/LatexProject/data/extracted_images" # data copy to generate label_names

with open("label_names.txt", "r") as f:
    label_names = [line.strip() for line in f]


model = load_model(model_path)


def segment_symbols(image):
    print("Segmentation started")

    # remove temp output directory if exists
    if os.path.exists(SEGMENTED_DIR):
        shutil.rmtree(SEGMENTED_DIR)

    os.makedirs(SEGMENTED_DIR, exist_ok=True)

    # PIL image to OpenCV
    img = np.array(image)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    # grayscale and blur
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    thresh = cv2.adaptiveThreshold(
        blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2
    )

    # find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    symbol_images = []
    bounding_boxes = []

    # filter and process contours
    boxes_and_areas = [
        (cv2.boundingRect(cnt), cnt) for cnt in contours if cv2.contourArea(cnt) > 100
    ]

    if not boxes_and_areas:
        print("No symbols detected.")
        return [], []

    # sort and filter bounding boxes
    areas = [w * h for (x, y, w, h), _ in boxes_and_areas]
    min_area = np.percentile(areas, 65)

    filtered_boxes = [
        (bbox, cnt) for bbox, cnt in boxes_and_areas if bbox[2] * bbox[3] >= min_area
    ]

    for idx, (bbox, cnt) in enumerate(filtered_boxes):
        x, y, w, h = bbox
        symbol = gray[y : y + h, x : x + w]
        symbol_resized = cv2.resize(symbol, (45, 45))

        symbol_filename = os.path.join(SEGMENTED_DIR, f"symbol_{idx}.png")
        cv2.imwrite(symbol_filename, symbol_resized)

        symbol_images.append(symbol_resized)
        bounding_boxes.append((x, y, w, h))

    print("Segmentation complete")
    return symbol_images, bounding_boxes


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    print("entered")
    try:
        # open and preprocess image
        img = Image.open(file.stream)
        img = img.convert("RGB")
        print("opened")
        # segment images into symbols
        symbol_images, _ = segment_symbols(img)
        print("processed")
        if not symbol_images:
            return jsonify({"error": "No symbols detected in the image."}), 400

        # prediction for each segmented symbol
        print(f"Model input shape: {model.input_shape}")

        predictions = []
        for idx, symbol in enumerate(symbol_images):
            # print(f"symbol {idx}")
            try:
                # print(f"symbol shape {symbol.shape}")
                # convert grayscale symbol to RGB
                symbol = cv2.cvtColor(symbol, cv2.COLOR_GRAY2RGB)
                print(f"Symbol shape after converting to RGB: {symbol.shape}")

                # normalize symbol and expand dimensions to fit model
                symbol = symbol.astype("float32") / 255.0
                symbol = np.expand_dims(symbol, axis=0)
                # print(f"new shape: {symbol.shape}")

                raw_prediction = model.predict(symbol)
                predicted_class = np.argmax(raw_prediction, axis=1)[0]
                prediction = label_names[predicted_class]
                predictions.append(prediction)
                print(f"Prediction for symbol {idx}: {prediction}")

            except Exception as error:
                return jsonify(
                    {"error": f"Prediction error for symbol {idx}: {str(error)}"}
                ), 500

        # combine all predictions into string
        output = " ".join(predictions)
        return jsonify({"result": output})

    except Exception as e:
        return jsonify({"error": f"General error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
