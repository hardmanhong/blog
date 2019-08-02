var Tag = require("../models/tag.model");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { handleSuccess, handleWraningExist } = require("../handle-result");
const { handleParamsError } = require("../handle-params");

const async = require("async");
exports.tag_create = [
  body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("标签名不能为空"),
  body("color")
    .isLength({ min: 7 })
    .trim()
    .withMessage("颜色值必须为16进制"),

    sanitizeBody('*').trim().escape(),

  (req, res, next) => {
    console.log("请求参数", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("校验信息", errors);
      return res.json({
        code: 1000,
        message: errors.errors[0].msg
      });
    } else {
      const { name, color } = req.body;
      Tag.findOne({ name }).exec((err, find) => {
        if (find) {
          res.json(handleWraningExist("标签名称已存在"));
        } else {
          const tag = new Tag({
            name,
            color
          });
          tag.save(err => {
            if (err) {
              return next(err);
            }
          });
          res.json(handleSuccess(tag._id));
        }
      });
    }
  }
];
exports.tag_list = (req, res, next) => {
  Tag.find()
    .sort({ _id: 1 })
    .exec((err, list) => {
      if (err) {
        return next(err);
      }
      res.json(
        handleSuccess({
          list
        })
      );
    });
};
exports.tag_delete = (req, res, next) => {
  if (!req.body.id) {
    return res.json(handleParamsError());
  }
  Tag.findByIdAndRemove(req.body.id).exec(err => {
    if (err) {
      return next(err);
    } else {
      // TODO:
      // 1. 若有文章关联到这个tag，则要删除这篇文章下的tag
      res.json(handleSuccess());
    }
  });
};
exports.tag_edit = [
  body("id")
    .isLength({ min: 1 })
    .trim()
    .withMessage("ID不能为空"),
  body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("标签名不能为空"),
  body("color")
    .isLength({ min: 7 })
    .trim()
    .withMessage("颜色值必须为16进制"),

  sanitizeBody("id")
    .trim()
    .escape(),
  sanitizeBody("name")
    .trim()
    .escape(),
  sanitizeBody("color")
    .trim()
    .escape(),

  (req, res, next) => {
    console.log("请求参数", req.body);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("校验信息", errors);
      return res.json({
        code: 1000,
        message: errors.errors[0].msg
      });
    } else {
      const { id, name, color } = req.body;
      Tag.findByIdAndUpdate(id, { name, color }, err => {
        if (err) {
          return next(err);
        } else {
          res.json(handleSuccess());
        }
      });
    }
  }
];
