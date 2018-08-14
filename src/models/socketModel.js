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
    sendMessage(action) {
      socket.emit('msgToServer', { message: action.message });
    },
  },
  subscriptions: {
    socketSub({ dispatch, history }) {
      socket.on('connect', () => console.log('socket ' + url + ' connected sucess.'));
      socket.on('loginResToClient', data => {
        if (data.result === 1) {
          dispatch({ type: 'store/loginSuccess', name: data.name });
          dispatch({ type: 'chat/newClient', name: data.name });
          history.push('/chat');
        }
      });
      socket.on('newClient', data => {
        if (data.result === 1) dispatch({ type: 'chat/newClient', name: data.name });
      });
      socket.on('chatMsgToClients', data => {
        dispatch({ type: 'chat/newMsg', data });
      });
      socket.on('logout', ({ name }) => {
        dispatch({ type: 'chat/logout', name });
      });
    },
  },
};
export default socketModel;
