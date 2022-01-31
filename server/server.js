const express = require("express");
const { PeerServer } = require('peer');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const port = 3000;
const videoChatPort = 3001;

const peerServer = PeerServer({ port: 3001, path: '/peerChat' });

io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on("new-message", (data) =>{
                console.log("Got new messege")
                socket.broadcast.emit('new-message', data);
        });
        socket.on("indexSelected", (data) =>{
                console.log("Got new messege")
                socket.broadcast.emit('indexSelected', data);
        });
      });



app.set("view engine", "ejs"); 
  
app.use(express.static("client")); 
  

server.listen(3000)
