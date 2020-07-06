const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const app = express();
const server =http.createServer(app);
const io = socketio(server);

const { addUser, removeUser , getUser , getUsersInRoom} = require('./users');

io.on('connection', (socket) => {
    console.log('New Connection!');

    socket.on('join', ({name, room}, callback) =>{
       // console.log (name , room);
       const {error , user } = addUser({id: socket.id, name, room});

       if(error) return callback(error); // error massege return.
    
       socket.emit('message', {user: 'admin', text: `Welcome ${user.name}, join in ${user.room}`});// user who first enter in room
       socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined`});//room member know who has joined.
       //socket.broadcast.to : send massage to everyone except me.
       socket.join(user.room);

       callback();
    });

    socket.on('sendMessage',(message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('messge',{user: user.name, text : message});
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User had left :( ');
    });
});

app.use(router);
server.listen(PORT, () => console.log(`server started, port : ${PORT}  `));
