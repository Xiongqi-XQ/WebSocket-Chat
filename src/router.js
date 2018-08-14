import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/Login';
import Chat from './routes/Chat';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/chat" exact component={Chat} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
