
# from flask import Flask, render_template
# from flask_socketio import SocketIO

# app = Flask(__name__)
# socketio = SocketIO(app)

# @app.route('/')
# def login():
#     return render_template('login.html')


# if __name__ == '__main__':
#     socketio.run(app, debug=True)





from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(app)