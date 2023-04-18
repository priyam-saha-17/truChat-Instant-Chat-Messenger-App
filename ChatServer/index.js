//Chat server which has to handle the socket.io connections

const io = require('socket.io')(8000);
console.log("Server has started.......")

const users = {}

// This initiates the io so as to listen to all client requests
io.on('connection', socket =>{

    // whenever a new user joins
    socket.on('new-user-joined', name=> {
            console.log("New user ", name);
            users[socket.id] = name;
            socket.broadcast.emit('user-joined', name);
        });

    // whenever a message is sent by any client, it must be broadcasted to all OTHER users
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    // whenever a user leaves the chat
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})