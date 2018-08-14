import dva from 'dva';
import socketModel from './models/socketModel'
import loginedModel from './models/loginModel'
import chatModel from './models/chatModel'
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(socketModel);
app.model(loginedModel);
app.model(chatModel);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
