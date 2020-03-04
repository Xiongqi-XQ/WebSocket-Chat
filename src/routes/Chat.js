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
  componentDidMount() {
    // this.input.current.input.focus();
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
      this.props.dispatch({ type: 'socket/sendMessage', message, name: this.props.name });
      this.input.current.input.value = '';
    }
  };
  handleDou = () => {
    const message = this.input.current.input.value || '抖啊抖啊抖';
    const { dispatch, name } = this.props;
    dispatch({ type: 'socket/sendDou', message, name: name });
    dispatch({ type: 'chat/dou', name, message });
  };
  renderClient = ({ name, client, oldName, message }) => {
    switch (client) {
      case 1:
        return (
          <List.Item className={css.newClient + ' client'}>
            <div>欢迎 {name} 加入聊天室</div>
          </List.Item>
        );
      case 2:
        return (
          <List.Item className={css.leaveClient + ' client'}>
            <div>{name} 离开聊天室</div>
          </List.Item>
        );
      case 3:
        return (
          <List.Item className={css.renameClient + ' client'}>
            <div>{oldName + ' -> 换了个新名字 -> ' + name} </div>
          </List.Item>
        );
      case 4:
        return (
          <List.Item className={css.reconnectClient + ' client'}>
            <div>{name === this.props.name ? '欢迎您' : name + ' 回到聊天室'} </div>
          </List.Item>
        );
      case 5:
        return (
          <List.Item className={css.douClient + ' client'}>
            <div>{'[抖一抖] ' + (name === this.props.name ? '我' : name) + ': ' + message} </div>
          </List.Item>
        );
      default:
        return;
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
            ) : (
              this.renderClient(item)
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
          <Button onClick={this.handleDou}>抖一抖</Button>
          <Button type="primary" onMouseDown={event => event.preventDefault()} onClick={this.handleSendMessage}>
            发送
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(({ chat: { content }, store: { name } }) => ({ content, name }))(withRouter(Chat));
