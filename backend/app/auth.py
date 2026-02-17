from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app import db
from app.models import User
from flask import current_app
from app.reminders import send_reminders

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    hashed = generate_password_hash(data['password'])
    user = User(username=data['username'], email=data['email'], password_hash=hashed)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({'token': token, 'username': user.username}), 200

@auth_bp.route('/test-reminder', methods=['GET'])
def test_reminder():
    send_reminders(current_app._get_current_object())
    return jsonify({'message': 'Reminder job ran'}), 200