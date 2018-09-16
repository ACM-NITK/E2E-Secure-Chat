from flask import Flask,render_template, request, redirect, url_for
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config.from_object('config.Config')
socketio = SocketIO(app)

@socketio.on('message')
def handlemessage(msg):
    send( msg ,broadcast=True)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

if __name__ == '__main__':
    socketio.run(app, debug=True)