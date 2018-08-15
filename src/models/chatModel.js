const chatModel = {
  namespace: 'chat',
  state: {
    content: [],
  },
  reducers: {
    newMsg({ content }, { data }) {
      return { content: content.concat(data) };
    },
    newClient({ content }, { name }) {
      return { content: content.concat({ name, client: 1 }) }; // 1 login
    },
    logout({ content }, { name }) {
      return { content: content.concat({ name, client: 2 }) }; // 2 logout
    },
    rename({ content }, { name, oldName }) {
      return { content: content.concat({ name, oldName, client: 3 }) }; // 3 rename
    },
    reconnect({ content }, { name, oldName }) {
      return { content: content.concat({ name, client: 4 }) }; // 4 reconnect
    },
  },
  effects: {},
  subscriptions: {},
};
export default chatModel;
