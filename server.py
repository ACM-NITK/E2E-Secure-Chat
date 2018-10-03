from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config.from_object('config.Config')
socketio = SocketIO(app)

users = {}

@app.route('/')
def index():
    return render_template('chat.html')

# @app.route('/chat')
# def chat()
#     return render_template('chat.html')

@socketio.on('message from user', namespace='/messages')
def receive_message_from_user(message):
    emit('from flask', broadcast=True)

@socketio.on('username', namespace='/private')
def receive_username(username):
    users[username] = request.sid
    print('Username added!')

@socketio.on('private_message', namespace='/private')
def private_message(payload):
    recipient_session_id = users[payload['username']]
    message = payload['message']

    emit('new_private_message', message, room=recipient_session_id)

if __name__ == '__main__':
    socketio.run(app)