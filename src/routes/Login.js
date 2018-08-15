import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'dva';
import css from './login.css';

class Login extends React.Component {
  state = {
    name: '',
  };
  handleLogin = event => {
    const name = this.state.name.trim();
    if (name) {
      const { dispatch } = this.props;
      dispatch({ type: 'socket/login', name });
      // this.setState({ name: '' });
    }
  };
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <Input
            placeholder="输入用户名"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            onPressEnter={this.handleLogin}
          />
          <Button className={css.button} disabled={!this.state.name} onClick={this.handleLogin}>
            进入
          </Button>
        </div>
      </div>
    );
  }
}
export default connect()(Login);
