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

       if(error) return callback(error);

       
    });

    socket.on('disconnect', () => {
        console.log('User had left :( ');
    });
});

app.use(router);
server.listen(PORT, () => console.log(`server started, port : ${PORT}  `));
