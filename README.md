# E2E-Secure-Chat
How to run the project?

Install Python:
```
sudo apt-get install python-dev build-essential
```
Install pip:
pip is a package management system used to install and manage software packages written in Python.
```
sudo apt-get install python-pip
```
Install Gunicorn:
Gunicorn stands for Green Unicorn and it is a Python WSGI (Web Server Gateway Interface) HTTP server for UNIX
```
sudo pip install gunicorn==18.0
```
Run this to install all the dependencies:
```
pip install -r requirements.txt
```
To run the project as a stand-alone WSGI application:
```
gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker server:app
```
