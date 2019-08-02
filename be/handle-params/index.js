const { PARAMS_ERROR } = require("../service-code");
exports.handleParamsError = (message = "参数错误") => {
  return {
    code: PARAMS_ERROR,
    message
  };
};
