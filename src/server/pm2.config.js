const path = require('path');

module.exports = {
  apps: [
    {
      name: 'chat',
      script: path.resolve(__dirname, './server.js'),
      watch: [path.resolve(__dirname)],
      ignore_watch: ['**/logs', '**/node_modules'],
      env: {
        NODE_ENV: 'prod',
      },
      out_file: path.resolve(__dirname, './logs/chat-out.log'),
      error_file: path.resolve(__dirname, './logs/chat-error.log'),
    },
  ],
};
