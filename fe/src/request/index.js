import axios from "axios";
import { message } from "antd";
message.config({
  top: 50
});
const request = axios.create({
  baseURL: "http://127.0.0.1:9999/api",
  timeout: 30000
});
const pending = {};
const CancelToken = axios.CancelToken;
const addToken = config => {
  //1.时间戳
  const timestamp = new Date().getTime();
  config.headers.timestamp = timestamp;
  //2.token
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
};
const addPending = config => {
  const { url, method, data } = config;
  const completeUrl = [url, method, JSON.stringify(data)].join("-");
  config.cancelToken = new CancelToken(cancel => {
    if (!pending[completeUrl]) {
      pending[completeUrl] = cancel;
    }
  });
};
const removePending = config => {
  const { url, method, data } = config;
  const completeUrl = [url, method, JSON.stringify(data)].join("-");
  if (pending[completeUrl]) {
    pending[completeUrl]("取消重复请求");
    delete pending[completeUrl];
  }
};
const handleRequest = config => {
  console.log("处理请求", config);
  addToken(config);
  removePending(config);
  addPending(config);
};
const handleResponse = response => {
  console.log("处理响应", response);
  const { status, data, config } = response;
  const { code, message } = data;
  if (status === 200) {
    if (code === 200) {
      return Promise.resolve(data);
    } else {
      if (config.headers.catchCode) {
        return Promise.resolve(data);
      } else {
        message.error(message || "操作失败");
        return Promise.reject(data);
      }
    }
  } else {
    message.error("网络不佳，稍后再试");
    return Promise.reject();
  }
};
const handleResponseError = error => {
  if (axios.isCancel(error)) {
    message.warning("网络请求中，请勿重复操作");
    console.log("网络请求中");
  } else if (error.response) {
    console.log("status", error.response);
    switch (error.response.status) {
      case 404:
        message.error("接口地址有误");
        break;
      case 500:
        message.error("服务器出错，稍后再试");
        break;
      default:
        message.warning("网络不佳，稍后再试");
        break;
    }
  } else {
    message.error("服务器出错，稍后再试");
  }
};
// 添加请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    handleRequest(config);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    console.log("请求错误", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return handleResponse(response);
  },
  error => {
    // 对响应错误做点什么
    console.dir("响应错误", error.response);
    handleResponseError(error);
    return Promise.reject(error);
  }
);
export default request;
