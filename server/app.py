from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():
    # check if image was uploaded
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    try:
        # read image via file.stream
        img = Image.open(file.stream)
        print("Image recieved succesfully!")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"result": "hello this is from the backend"})  # placeholder


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
