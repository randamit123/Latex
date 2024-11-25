from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model

# temporary backend server using CNN model till ViT is up and running

app = Flask(__name__)
CORS(app)
data_dir = "/Users/ARand/Desktop/LatexProject/data/extracted_images"  # replace this directory with your local copy of the data
model_path = "handwritten_math_symbols_CNN_model.keras"

model = load_model(model_path)

with open("label_names.txt", "r") as f:
    label_names = [line.strip() for line in f]


@app.route("/predict", methods=["POST"])
def predict():
    # check if image was uploaded
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    try:
        # read image via file.stream
        img = Image.open(file.stream)
        img = img.convert("RGB")
        img = img.resize((45, 45))
        img_array = np.array(img)
        img_array = img_array.astype("float32") / 255.0
        img_array = np.expand_dims(img_array, axis=0)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]
    predicted_label = label_names[predicted_class]

    return jsonify({"result": predicted_label})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
