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
      return { content: content.concat({ name, client: 1 }) };
    },
    logout({ content }, { name }) {
      return { content: content.concat({ name, client: 2 }) };
    },
  },
  effects: {},
  subscriptions: {},
};
export default chatModel;
