"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/login", methods=["POST"])
def recreate_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    # Verificar si el usuario existe y las credenciales son correctas
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Invalid credentials"}), 401
    
@api.route('/user', methods=['POST'])
def add_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)# Obtiene los datos enviados en el cuerpo de la solicitud en formato JSON   
    new_user = email(email='email')
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Usuario agregado exitosamente', 'user_id': new_user.id}), 201

    
@api.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
        email = get_jwt_identity()
        dictionary = {
             "message": "Hello World " + email
        }

        return jsonify(dictionary)

