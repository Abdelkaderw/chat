from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/<room>')
def chat(room):
    return render_template('index.html', room=room)

@socketio.on('join')
def on_join(data):
    username = data['pseudo']
    room = data['room']
    join_room(room)

    emit('message', {
        'pseudo': 'SYSTEM',
        'message': username + " a rejoint le salon"
    }, room=room)

@socketio.on('send_message')
def handle_message(data):
    emit('message', data, room=data['room'])

if __name__ == '__main__':
    socketio.run(app, debug=True)