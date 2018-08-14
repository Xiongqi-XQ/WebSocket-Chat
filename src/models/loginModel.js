const loginedModel = {
  namespace: 'store',
  state: {
    name: ''
  },
  reducers: {
    loginSuccess(state, action) {
      return { name: action.name };
    },
  },
  effects: {},
  subscriptions: {},
};
export default loginedModel;
