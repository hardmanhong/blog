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
  if (!paramsStr) return {};
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
export const findTopRoutes = (menuJson, childId, result) => {
  result = result || [];
  let menuStr =
    typeof menuJson === "string" ? menuJson : JSON.stringify(menuJson);
  let reg = new RegExp(
    'id":"([^"]+)"[^\\}\\]\\[\\{]+\\[\\{[^\\}\\]\\[\\{]+id":"' + childId
  );

  if (reg.test(menuStr)) {
    result.push(menuStr.match(reg)[1]);
    return findTopRoutes(menuStr, menuStr.match(reg)[1], result);
  } else {
    return result;
  }
};
export const findPathByLeafId = (leafId, nodes, path) => {
  if (path === undefined) {
    path = [];
  }
  for (var i = 0; i < nodes.length; i++) {
    var tmpPath = path.concat();
    const { id, name } = nodes[i];
    tmpPath.push({ id, name });
    if (leafId == nodes[i].id) {
      return tmpPath;
    }
    if (nodes[i].children) {
      var findResult = findPathByLeafId(leafId, nodes[i].children, tmpPath);
      if (findResult) {
        return findResult;
      }
    }
  }
};
