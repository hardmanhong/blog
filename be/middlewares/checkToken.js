const jwt = require("../jwt");
const apiWhitelist = { "/login": true, "/signup": true };
const Blacklist = require("../models/blacklist.model");

module.exports = (req, res, next) => {
  if (apiWhitelist[req.url]) {
    next();
    return;
  }
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["token"] ||
    req.cookies.token;
  if (token) {
    // 确认token
    jwt.verifyToekn(token, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.json({ code: -1, message: "身份已过期，请重新登录" });
        }
        return res.json({ code: -1, message: "身份错误" });
      } else {
        Blacklist.findOne({ token }).exec((err, result) => {
          if (result) {
            return res.json({ code: -1, message: "身份错误" });
          } else {
            next();
          }
        });
      }
    });
  } else {
    // 如果没有token，则返回错误
    return res.json({
      code: -1,
      message: "身份错误"
    });
  }
};
