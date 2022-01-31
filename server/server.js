const express = require("express");
const { PeerServer } = require('peer');

const app = express();
const port = 3000;
const videoChatPort = 3001;

const peerServer = PeerServer({ port: 3001, path: '/peerChat' });


peerServer.on('connection', (client) => { console.log("NEW CONNECTIO N", client.getId(), client)});

app.set("view engine", "ejs"); 
  
app.use(express.static("client")); 
  
// app.get("/" , (req,res)=>{
// });
  

app.listen(port, function(){
        console.log("Surf Board Server Started on port : ", port);
});
