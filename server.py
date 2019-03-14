from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
from werkzeug import secure_filename

app = Flask(__name__)
app.config.from_object('config.Config')
socketio = SocketIO(app)

users = {}
public_keys={}
nmsgs=0

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
    print('Username', username, 'added!')

@socketio.on('publKey', namespace='/keys')
def receive_public_key(arr):
   public_keys[arr[0]]=arr[1]

@socketio.on('resetDHpair', namespace='/keys')
def send_reset_request(arr):
   emit('resetDHRequest',arr,room=users[arr['receiver']])

@socketio.on('resetChainKeys', namespace='/keys')
def send_reset_request(arr):
   emit('resetChainKeyRequest',arr,room=users[arr['receiver']])

@socketio.on('public_key_request', namespace='/keys')
def send_public_key(arr):
   global nmsgs
   print("here sender",arr[0])
   print("here receiver",arr[1])
   print(public_keys[arr[1]])
   info=[public_keys[arr[1]],nmsgs]
   emit('public_key_returning',info,room=users[arr[0]])

@socketio.on('private_message', namespace='/private')
def private_message(payload):
   global nmsgs
   recipient_session_id = users[payload['username']]
   message = payload['message']
   info=[message,nmsgs,payload['sender']]
   nmsgs+=1
   emit('new_private_message', info, room=recipient_session_id)

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
