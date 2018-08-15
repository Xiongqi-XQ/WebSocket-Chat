import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'dva';
import css from './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  componentDidMount() {
    this.input.current.input.focus();
  }
  handleLogin = event => {
    const name = this.input.current.input.value.trim();
    if (name) {
      const { dispatch } = this.props;
      if (window.localName) dispatch({ type: 'socket/rename', name });
      else dispatch({ type: 'socket/login', name });
      // this.setState({ name: '' });
    }
  };
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <Input placeholder="输入用户名" ref={this.input} onPressEnter={this.handleLogin} />
          <Button className={css.button} onClick={this.handleLogin}>
            进入
          </Button>
        </div>
      </div>
    );
  }
}
export default connect()(Login);
