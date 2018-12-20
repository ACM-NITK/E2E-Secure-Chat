from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
from werkzeug import secure_filename

app = Flask(__name__)
app.config.from_object('config.Config')
socketio = SocketIO(app)

users = {}
@socketio.on('message')
def handlemessage( json ):
    print('message received '+ str( json ))
    socketio.emit('message', json)  

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@socketio.on('message from user', namespace='/messages')
def receive_message_from_user(message):
    emit('from flask', message, broadcast=True)

@socketio.on('username', namespace='/private')
def receive_username(username):
    users[username] = request.sid
    print('Username added!')

@socketio.on('private_message', namespace='/private')
def private_message(payload):
    recipient_session_id = users[payload['username']]
    message = payload['message']

    emit('new_private_message', message, room=recipient_session_id)

@app.route('/upload')
def upload_file():
   return render_template('upload.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def uploader_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename(f.filename))  #saves the file 
      print('file saved')
      return redirect(url_for('chat'))  #socketio.emit('uploadfile', f) wont work

if __name__ == '__main__':
    socketio.run(app)
