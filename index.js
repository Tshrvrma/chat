const express= require('express');
const { Socket } = require('node:dgram');
const {createServer}=require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const app= express();
 const server= createServer(app);
 const io = new Server(server,{
  connectionStateRecovery: {}
});
const PORT=3000;
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });
  io.on('connection', (socket) => {
    console.log('A user connected',socket.id);
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
      });
  });
 server.listen(PORT,()=>
 {
    console.log(`server started at port ${PORT}`)
 })
