const Post = require("../models/post.model");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { handleSuccess, handleWraningNotExist } = require("../handle-result");
const { handleParamsError } = require("../handle-params");
exports.post_item = (req, res, next) => {
  if (!req.query.id) {
    return res.json(handleParamsError());
  }
  Post.findById(req.query.id)
    .populate("tag", "name")
    .lean()
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      if (post == null) {
        // No results.
        return res.json(handleWraningNotExist("该文章不存在"));
      }
      // Successful, so render.
      // TODO: 反转义markdown和html

      res.json(handleSuccess(post));
    });
};
exports.post_list = (req, res, next) => {
  Post.aggregate([{
    $group:{
      _id:new Date("$createdDate").getMonth()
    }
  }])
    .exec((err, list) => {
      if (err) {
        return next(err);
      }
      list.forEach(item => {
        let { name } = item.tag.reduce((acc, cur) => {
          acc.name = [acc.name, cur.name].join(" ");
          return acc;
        });
        item.tag = name;
      });
      res.json(handleSuccess({ list }));
    });
};
exports.post_edit = [
  // 校验
  body("title", "文章标题不能为空")
    .isLength({ min: 1 })
    .trim(),
  // 处理 tag 参数
  (req, res, next) => {
    const tag = req.body.tag;
    if (!(tag instanceof Array)) {
      if (typeof tag === "undefined") {
        tag = [];
      } else {
        tag = new Array(tag);
      }
      req.body.tag = tag;
    }
    next();
  },

  // 转义
  sanitizeBody("*").escape(),
  sanitizeBody("tag.*").escape(),

  (req, res, next) => {
    console.log("tag", req.body.tag);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        code: 1000,
        message: errors.errors[0].msg
      });
    } else {
      if (req.body.id) {
        // 编辑
        const { id, title, tag, markdown, html } = req.body;
        const updatedDate = new Date();
        Post.findByIdAndUpdate(id, { title, tag, markdown, html,updatedDate }).exec(err => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess());
        });
      } else {
        // 创建
        const { title, tag, markdown, html } = req.body;
        const post = new Post({
          title,
          tag,
          markdown,
          html
        });
        post.save(err => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess());
        });
      }
    }
  }
];
exports.post_delete = (req, res, next) => {
  if (!req.body.id) {
    return res.json(handleParamsError());
  }
  Post.findByIdAndRemove(req.body.id).exec(err => {
    if (err) {
      return next(err);
    } else {
      res.json(handleSuccess());
    }
  });
};
