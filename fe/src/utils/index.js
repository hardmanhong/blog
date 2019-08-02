export const spliceUrlParams = (params = {}) => {
  if (params === null) {
    return console.error("spliceUrlParams params is null");
  }
  if (Object.prototype.toString.call(params) === "[object Object]") {
    let paramsArr = [];
    let paramsStr = "";
    Object.keys(params).forEach(key => {
      let value = params[key];
      if (value === null || typeof value === "undefined") {
        console.warn("-----------warn params---------------");
        console.table(params);
        console.warn("-----------warn params---------------");
        return;
      }
      paramsArr.push(`${key}=${params[key]}`);
    });
    paramsStr = paramsArr.join("&");
    if (paramsStr) paramsStr = "?" + paramsStr;
    return paramsStr;
  }
};
export const parseUrlParams = (paramsStr = "") => {
  let params = {};
  if(!paramsStr) return {};
  paramsStr
    .split("?")[1]
    .split("&")
    .forEach(param => {
      let paramArr = param.split("=");
      let key = paramArr[0];
      let value = paramArr[1];
      params[key] = value;
    });
  return params;
};
