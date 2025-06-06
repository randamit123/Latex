import os
from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
import cv2
import shutil
from dotenv import load_dotenv
from openai import OpenAI

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://latex-hazel.vercel.app"]}})

# config
UPLOAD_FOLDER = "uploaded_images"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

model_path = "../handwritten_math_symbols_CNN_model.keras"  # model

SEGMENTED_DIR = "segmented_symbols"  # temp dir to store segmented images

# data_dir = "/Users/ARand/Desktop/LatexProject/data/extracted_images" # data copy to generate label_names

with open("../label_names.txt", "r") as f:
    label_names = [line.strip() for line in f]


model = load_model(model_path)


def openai_helper(message_text, image_url):
    # load env and connect client
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Message to send
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": f"{message_text}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": image_url,
                    },
                },
            ],
        }
    ]

    # API call
    completion = client.chat.completions.create(model="gpt-4o", messages=messages)
    return completion.choices[0].message


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


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/predict", methods=["POST"])
def predict():
    # check if image was uploaded
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file and allowed_file(file.filename):
        # remove any old images in the upload folder
        for f in os.listdir(app.config["UPLOAD_FOLDER"]):
            os.remove(os.path.join(app.config["UPLOAD_FOLDER"], f))

        # secure filename
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        # save uploaded file
        file.save(file_path)

        try:
            # open and preprocess image
            img = Image.open(file_path)
            img = img.convert("RGB")
            print("Image recieved succesfully!")

            # segment images into symbols
            symbol_images, _ = segment_symbols(img)

            if not symbol_images:
                return jsonify({"error": "No symbols detected in the image."}), 400

            # prediction for each segmented symbol
            predictions = []
            for idx, symbol in enumerate(symbol_images):
                symbol = cv2.cvtColor(symbol, cv2.COLOR_GRAY2RGB)
                symbol = symbol.astype("float32") / 255.0
                symbol = np.expand_dims(symbol, axis=0)
                raw_prediction = model.predict(symbol)
                predicted_class = np.argmax(raw_prediction, axis=1)[0]
                prediction = label_names[predicted_class]
                predictions.append(prediction)

            # combine all predictions into string
            output = " ".join(predictions)

            image_url = url_for("uploaded_file", filename=filename, _external=True)

            message_text = f"This is the LaTeX output generated by my model: {output}. Does this LaTeX expression correctly represent the content in the provided image?"

            try:
                llm_response = openai_helper(message_text, image_url)
                print(llm_response)
            except Exception as e:
                llm_response = f"OpenAI Error: {str(e)}"

            return jsonify({"result": output})

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    else:
        return jsonify({"error": "Invalid file type."}), 400


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5001, debug=True)
