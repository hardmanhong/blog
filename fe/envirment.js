//设置环境变量
const configArgv = JSON.parse(process.env.npm_config_argv);
const original = configArgv.original.slice(1);
const stage = original[1] ? original[1].replace(/-/g, '') : 'dev';
let webUrl = {
  dev: 'http://127.0.0.1:9999/',
  pro: 'http://127.0.0.1:9999/',
};
let WEB_URL = webUrl[stage];

module.exports = {
  WEB_URL,
};
