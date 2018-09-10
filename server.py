
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/chat/')
def chat_():
    return render_template('chat.html')

@app.route('/login/')
def login():
    return render_template('login.html')

@socketio.on('message event')
def message_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json)

if __name__ == '__main__':
    socketio.run(app, debug=True)

