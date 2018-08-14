import React from 'react';
import { List, Input, Button } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import css from './chat.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.chatDiv = React.createRef();
    this.input = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (!this.props.name) this.props.history.push('/');
  }
  componentDidUpdate() {
    let { firstChild } = this.chatDiv.current;
    this.chatDiv.current.scrollTop = firstChild.offsetHeight;
    // console.log(this.chatDiv.current);
    // return true;
  }
  handleSendMessage = event => {
    const message = this.input.current.input.value;
    if (message) {
      this.props.dispatch({ type: 'socket/sendMessage', message });
      this.input.current.input.value = '';
    }
  };
  render() {
    const { content, name } = this.props;
    return (
      <div className={css.listWrapper} ref={this.chatDiv}>
        <List
          split={false}
          className={css.list}
          dataSource={content}
          locale={{ emptyText: '欢迎到来 ' + name }}
          renderItem={item =>
            !item.client ? (
              <List.Item className={item.name !== name ? '' : css.self}>
                <div>
                  {item.name !== name ? item.name + ':' : ''} {item.message}
                </div>
              </List.Item>
            ) : item.client === 1 ? (
              <List.Item className={css.newClient}>
                <div>欢迎 {item.name} 加入聊天室</div>
              </List.Item>
            ) : (
              <List.Item className={css.leaveClient}>
                <div>{item.name} 离开聊天室</div>
              </List.Item>
            )
          }
        />
        <div className={css.chatBox}>
          <Input
            placeholder="聊天啊"
            ref={this.input}
            // value={message}
            // onChange={event => this.setState({ message: event.target.value })}
            onPressEnter={this.handleSendMessage}
          />
          <Button type="primary" onMouseDown={event => event.preventDefault()} onClick={this.handleSendMessage}>
            发送
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(({ chat: { content }, store: { name } }) => ({ content, name }))(withRouter(Chat));
