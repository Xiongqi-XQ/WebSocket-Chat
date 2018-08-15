import io from 'socket.io-client';
import url from '../config';

const socket = io(url);

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
      socket.on('logout', ({ name }) => {
        dispatch({ type: 'chat/logout', name });
      });
      // socket.on('renameToClients', ({ result, name, oldName }) => {
      //   if (result === 3) dispatch({ type: 'chat/rename', name, oldName });
      // });
    },
  },
};
export default socketModel;
