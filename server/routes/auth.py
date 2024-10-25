import firebase_admin
from flask import request, jsonify, Blueprint
from firebase_admin import credentials, auth

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    try:
        user = auth.create_user(email=email, password=password)
        return jsonify({
            "message": "User created successfully", 
            "UID": user.uid
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_blueprint.route('/verify-token', methods=['POST'])
def verify_token():
    token = request.headers.get('Authorization')

    try:
        # Verify the ID token
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        return jsonify({'message': 'Token is valid', 'uid': uid}), 200
    except Exception as e:
        return jsonify({'error': 'Invalid token'}), 401