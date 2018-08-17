const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 9002;
const log = (...rest) => console.log(`[${new Date().toLocaleString()}]`, ...rest);
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
  log('😐', `Connect(${++count})`);
  socket.on('loginToServer', data => {
    const name = data.name;
    socketName = name;
    socket.emit('loginResToClient', { result: 1, name });
    io.sockets.emit('newClient', { result: 1, name });
    log('😀', 'Login:', name);
  });
  socket.on('renameToServer', ({ name, oldName }) => {
    socketName = name;
    socket.emit('loginResToClient', { result: 1, name });
    io.sockets.emit('newClient', { result: 3, name, oldName });
    log('📝', 'Rename:', oldName, '->', name);
  });
  socket.on('msgToServer', ({ name, message }) => {
    if (!socketName) {
      socketName = name;
      io.sockets.emit('newClient', { result: 4, name });
      log('😎', 'Reconnect:', name);
    }
    io.sockets.emit('chatMsgToClients', { message, name });
    log('💬', name + ':', message);
  });
  socket.on('douToServer', ({ name, message }) => {
    if (!socketName) {
      socketName = name;
      io.sockets.emit('newClient', { result: 4, name });
      log('😎', 'Reconnect:', name);
    }
    socket.broadcast.emit('douToClients', { message, name });
    log('👋', name + ':', message);
  });
  socket.on('disconnect', () => {
    if (socketName) {
      io.sockets.emit('logout', { name: socketName });
    }
    log('👻', `Logout(${--count}):`, socketName || 'noName');
  });
});
http.listen(port, () => log('🍰', 'Server On:', port));
