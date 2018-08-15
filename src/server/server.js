const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 9092;
const log = console.log;
/**s
 *监听客户端连接
 *io是我们定义的服务端的socket
 *回调函数里面的socket是本次连接的客户端socket
 *io与socket是一对多的关系
 */
let count = 0;
io.on('connection', socket => {
  // console.log(socket);
  let socketName = '';
  log(`[${new Date().toLocaleString()}]`, '😐', `Connect(${++count})`);
  socket.on('loginToServer', data => {
    socketName = data.name;
    const name = data.name;
    socket.emit('loginResToClient', { result: 1, name });
    socket.broadcast.emit('newClient', { result: 1, name });
    log(`[${new Date().toLocaleString()}]`, '😎', 'Login:', name);
  });
  socket.on('msgToServer', ({ name, message }) => {
    if (!socketName) {
      socketName = name;
    }
    io.sockets.emit('chatMsgToClients', { message, name });
    log(`[${new Date().toLocaleString()}]`, '💬', 'Chat:', name + ':', message);
  });
  socket.on('disconnect', () => {
    if (socketName) {
      io.sockets.emit('logout', { name: socketName });
    }
    log(`[${new Date().toLocaleString()}]`, '👻', `Logout(${--count}):`, socketName);
  });
});
http.listen(port, () => log(`[${new Date().toLocaleString()}]`, '🎮', 'Server On:', port));
