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
      });


// peerServer.on('connection', (client) => { console.log("NEW CONNECTIO N", client.getId(), client)});

app.set("view engine", "ejs"); 
  
app.use(express.static("client")); 
  
// app.get("/" , (req,res)=>{
// });
  

server.listen(3000)

// app.listen(port, function(){
//         console.log("Surf Board Server Started on port : ", port);
// });