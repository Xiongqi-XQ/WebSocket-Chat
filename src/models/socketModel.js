import io from 'socket.io-client';
import url from '../config';

const socket = io(url);

function douWindow(name = '抖一抖', message = '抖一抖') {
  let dou;
  if (window.dou) {
    dou = window.dou;
  } else {
    dou = window.open('', '', 'width=300,height=100');
    window.dou = dou;
    dou.onbeforeunload = () => (window.dou = null);
  }
  dou.document.title = name;
  dou.document.body.innerHTML = `<p style="
  word-break: break-all;
  text-align: center;
  font-weight: bold;
  ">${message}</p>`;

  const range = 2;
  const interval = 30;
  const stop = 1000;
  let lr = 0;
  const un = setInterval(() => {
    dou.moveBy(++lr % 2 === 0 ? range : -range, 0);
  }, interval);
  setTimeout(() => clearInterval(un), stop);
}
const socketModel = {
  namespace: 'socket',
  state: socket,
  reducers: {},
  effects: {
    login(action) {
      socket.emit('loginToServer', { name: action.name });
    },
    rename({ name }) {
      socket.emit('renameToServer', { name, oldName: window.localName });
    },
    sendMessage({ name, message }) {
      socket.emit('msgToServer', { name, message });
    },
    sendDou({ name, message }) {
      socket.emit('douToServer', { name, message });
    },
  },
  subscriptions: {
    socketSub({ dispatch, history }) {
      socket.on('connect', () => console.log('socket ' + url + ' connected sucess.'));
      socket.on('loginResToClient', data => {
        if (data.result === 1) {
          window.localName = data.name;
          dispatch({ type: 'store/loginSuccess', name: data.name });
          history.push('/chat');
        }
      });
      socket.on('newClient', data => {
        if (data.result === 1) dispatch({ type: 'chat/newClient', name: data.name });
        else if (data.result === 3) dispatch({ type: 'chat/rename', name: data.name, oldName: data.oldName });
        else if (data.result === 4) dispatch({ type: 'chat/reconnect', name: data.name });
      });
      socket.on('chatMsgToClients', data => {
        dispatch({ type: 'chat/newMsg', data });
      });
      socket.on('douToClients', ({ name, message }) => {
        dispatch({ type: 'chat/dou', name, message });
        if (window.localName) douWindow(name, message);
      });
      socket.on('logout', ({ name }) => {
        dispatch({ type: 'chat/logout', name });
      });
    },
  },
};
export default socketModel;
