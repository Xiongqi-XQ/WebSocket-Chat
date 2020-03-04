const path = require("path");
const { WEB_ROOT } = process.env;
module.exports = {
  apps: [
    {
      name: "chat",
      script: path.resolve(__dirname, "./server.js"),
      watch: true,
      ignore_watch: ["**/logs", "**/node_modules"],
      env: {
        NODE_ENV: "prod"
      },
      out_file: path.resolve(WEB_ROOT, "./logs/chat/out.log"),
      error_file: path.resolve(WEB_ROOT, "./logs/chat/error.log")
    }
  ]
};
