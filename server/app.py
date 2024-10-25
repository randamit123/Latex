import firebase_admin
from flask import Flask, request, jsonify
from firebase_admin import credentials, auth
from routes.auth import auth_blueprint

cred = credentials.Certificate("./auth-config.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)

app.register_blueprint(auth_blueprint, url_prefix="/auth")

@app.route('/')
def root():
    return "root"


if __name__  == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)