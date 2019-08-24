var User = require("../models/user.model");
const Blacklist = require("../models/blacklist.model");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const crypto = require("crypto");
const jwt = require("../jwt");

const {
  handleSuccess,
  handleWraningExist,
  handleWraningNotExist,
  handleAuthError
} = require("../handle-result");

const md5 = str => {
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex");
};
const generateSalt = () => {
  const set =
    "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
  var salt = "";
  for (var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
};
const encryptPassword = ({ salt, username, password }) => {
  return md5(salt + username + password).replace(/(.{10})/, `$1${salt}`); // 在第10位插入salt
};

exports.user_signup = [
  body("username")
    .isLength({ min: 1 })
    .trim()
    .withMessage("用户名不能为空"),
  body("password")
    .isLength({ min: 5 })
    .trim()
    .withMessage("密码长度不能小于5"),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code: 1000,
        message: errors.errors[0].msg
      });
    } else {
      let { username, password } = req.body;
      User.findOne({ username }).exec((err, result) => {
        if (result) {
          res.json(handleWraningExist("用户名已存在"));
        } else {
          const salt = generateSalt();
          password = encryptPassword({ salt, username, password });

          const user = new User({
            username,
            password,
            salt
          });
          user.save(err => {
            if (err) {
              console.log("错误", err);
              return next(err);
            } else {
              res.json(handleSuccess());
            }
          });
        }
      });
    }
  }
];
exports.user_login = [
  body("username")
    .isLength({ min: 1 })
    .trim()
    .withMessage("用户名不能为空"),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("密码不能为空"),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code: 1000,
        message: errors.errors[0].msg
      });
    } else {
      const { username, password } = req.body;
      User.findOne({ username }).exec((err, result) => {
        if (result) {
          const salt = result.salt;
          const hash = encryptPassword({ salt, username, password });
          if (hash === result.password) {
            const token = jwt.generateToekn({ id: result._id, username });
            res.json(handleSuccess({ token, username }));
          } else {
            res.json(handleAuthError("用户名或密码不正确"));
          }
        } else {
          res.json(handleAuthError("用户名或密码不正确"));
        }
      });
    }
  }
];
exports.user_logout = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  const exp = jwt.decodedToken(token).exp;
  const blackList = new Blacklist({
    token,
    exp
  });
  blackList.save(err => {
    if (err) {
      console.log("错误", err);
      return next(err);
    } else {
      res.json(handleSuccess());
    }
  });
};
