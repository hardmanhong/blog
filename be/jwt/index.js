const jwt = require("jsonwebtoken");
const KEY = "HONG_BLOG_ADMIN_KEY";

exports.generateToekn = data => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, //秒为单位
      // 自定义字段
      ...data
    },
    KEY
  );
};
exports.verifyToekn = (token, callback) => {
  jwt.verify(token, KEY, (err, decoded) => {
    callback(err, decoded);
  });
};

exports.decodedToken = token=> jwt.decode(token);