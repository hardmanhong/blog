const jwt = require("../jwt");
const apiWhitelist = { "/login": true, "/signup": true, "/upload": true };
const Blacklist = require("../models/blacklist.model");
const verifyToken = (token, { req, res, next })=> {
  return new Promise((resolve, reject) => {
    if (token) {
      // 确认token
      jwt.verifyToken(token, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.json({ code: -1, message: "身份已过期，请重新登录" });
          }
          res.json({ code: -1, message: "身份错误" });
          reject();
        } else {
          Blacklist.findOne({ token }).exec((err, result) => {
            if (result) {
              res.json({ code: -1, message: "身份错误" });
              reject();
            } else {
              resolve();
            }
          });
        }
      });
    } else {
      // 如果没有token，则返回错误
      res.json({
        code: -1,
        message: "身份错误"
      });
      reject();
    }
  });
};
exports.verifyToken = verifyToken;
exports.checkToken = (req, res, next) => {
  if (apiWhitelist[req.url]) {
    next();
    return;
  }
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["token"] ||
    req.cookies.token;
  verifyToken(token, { req, res, next }).then(() => {
    next();
  });
};
