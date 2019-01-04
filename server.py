from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit
import werkzeug.serving
import ssl
import OpenSSL

app = Flask(__name__)
app.config.from_object('config.Config')
socketio = SocketIO(app)

class PeerCertWSGIRequestHandler( werkzeug.serving.WSGIRequestHandler ):
    def make_environ(self):
        environ = super(PeerCertWSGIRequestHandler, self).make_environ()
        x509_binary = self.connection.getpeercert(True)
        x509 = OpenSSL.crypto.load_certificate( OpenSSL.crypto.FILETYPE_ASN1, x509_binary )
        environ['peercert'] = x509
        return environ

users = {}
certificates = {}

app_key = './server.key'
app_key_password = None
app_cert = './server.pem'

ca_cert = 'ca.pem'

ssl_context = ssl.create_default_context( purpose=ssl.Purpose.CLIENT_AUTH,
                                          cafile=ca_cert )
ssl_context.load_cert_chain( certfile=app_cert, keyfile=app_key, password=app_key_password )
ssl_context.verify_mode = ssl.CERT_REQUIRED

@socketio.on('message')
def handlemessage( json ):
    print('message received '+ str( json ))
    socketio.emit('message', json)  

@app.route('/')
def index():
    #certificates['1'] = request.environ['peercert'] #to store the certificates in the dictionary
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

if __name__ == '__main__':
   app.run( ssl_context=ssl_context, request_handler=PeerCertWSGIRequestHandler )

 