const Post = require("../models/post.model");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { handleSuccess, handleWraningNotExist } = require("../handle-result");
const { handleParamsError } = require("../handle-params");
const { unescape } = require("../utils");
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
      } else {
        if (post == null) {
          // No results.

          return res.json(handleWraningNotExist("该文章不存在"));
        }
        // Successful, so render.
        post.markdown = unescape(post.markdown);
        res.json(handleSuccess(post));
      }
    });
};
exports.post_list = [
  (req, res, next) => {
    //TODO:采用性能更好的分页查询
    //db.posts.find({_id:{$gt:ObjectId("5d482bee2230b8194c1f9052")}}).sort({"createdDate":-1}).limit(10)
    const { status, pageNumber = 1, pageSize = 10 } = req.query;
    const findParams = {};
    if (status) findParams.status = status;
    Post.find(findParams)
      .populate("tag", "name")
      .lean()
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .sort({
        createdDate: -1
      })
      .exec((err, list) => {
        if (err) {
          return next(err);
        }
        const posts = {};

        list.forEach(item => {
          if (item.tag.length) {
            let { name } = item.tag.reduce((acc, cur) => {
              acc.name = [acc.name, cur.name].join(" ");
              return acc;
            });
            item.tag = name;
          } else {
            item.tag = "";
          }

          if (item.createdDate) {
            const date = new Date(item.createdDate);
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            let createDate = year + "年" + month + "月";
            posts[createDate]
              ? posts[createDate].push(item)
              : (posts[createDate] = [item]);
          }
        });
        Post.count(findParams).exec((err, count) => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess({ list: posts, count }));
        });
      });
  }
];
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
  sanitizeBody("markdown").escape(),
  sanitizeBody("html").escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        code: 1000,
        message: errors.errors[0].msg
      });
    } else {
      if (req.body.id) {
        // 编辑
        const { id, title, tag, markdown, html, status } = req.body;
        const updatedDate = new Date();
        Post.findByIdAndUpdate(id, {
          title,
          tag,
          markdown,
          html,
          status,
          updatedDate
        }).exec(err => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess());
        });
      } else {
        // 创建
        const { title, tag, markdown, html, status } = req.body;
        const post = new Post({
          title,
          tag,
          markdown,
          html,
          status
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
