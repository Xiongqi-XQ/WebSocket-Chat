const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const log = console.log;
/**
 *监听客户端连接
 *io是我们定义的服务端的socket
 *回调函数里面的socket是本次连接的客户端socket
 *io与socket是一对多的关系
 */
io.on('connection', socket => {
  let name = '';
  socket.on('loginToServer', data => {
    name = data.name;
    socket.emit('loginResToClient', { result: 1, name });
    socket.broadcast.emit('newClient', { result: 1, name });
    log(`[${new Date().toLocaleString()}]`, 'Login:', name);
  });
  socket.on('msgToServer', data => {
    io.sockets.emit('chatMsgToClients', { message: data.message, name });
    log(`[${new Date().toLocaleString()}]`, 'Chat:', name + ':', data.message);
  });
  socket.on('disconnect', () => {
    if (name) {
      io.sockets.emit('logout', { name });
      log(`[${new Date().toLocaleString()}]`, 'Logout:', name);
    }
  });
});
http.listen(9092, () => console.log('socket server on, at port 9092'));
