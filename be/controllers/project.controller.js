const Project = require("../models/project.model");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { handleSuccess, handleWraningNotExist } = require("../handle-result");
const { handleParamsError } = require("../handle-params");
const { unescape } = require("../utils");
exports.project_item = (req, res, next) => {
  if (!req.query.id) {
    return res.json(handleParamsError());
  }
  Project.findById(req.query.id)
    .lean()
    .exec((err, project) => {
      if (err) {
        return next(err);
      } else {
        if (project == null) {
          // No results.
          return res.json(handleWraningNotExist("该记录不存在"));
        }
        // Successful, so render.
        project.markdown = unescape(project.markdown);
        res.json(handleSuccess(project));
      }
    });
};
exports.project_list = [
  (req, res, next) => {
    //TODO:采用性能更好的分页查询
    //db.projects.find({_id:{$gt:ObjectId("5d482bee2230b8194c1f9052")}}).sort({"createdDate":-1}).limit(10)
    const { pageNumber = 1, pageSize = 10 } = req.query;
    Project.find()
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
        list.forEach(item => {
          if (item.createdDate) {
            const date = new Date(item.createdDate);
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            let createDate = year + "年" + month + "月";
            item.createdDate = createDate;
          }
        });
        Project.count().exec((err, count) => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess({ list, count }));
        });
      });
  }
];
exports.project_edit = [
  // 校验
  body("title", "标题不能为空")
    .isLength({ min: 1 })
    .trim(),
  body("cover", "封面图片不能为空")
    .isLength({ min: 1 })
    .trim(),
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
        const { id, title, cover, markdown, html } = req.body;
        const updatedDate = new Date();
        Project.findByIdAndUpdate(id, {
          title,
          cover,
          markdown,
          html,
          updatedDate
        }).exec(err => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess());
        });
      } else {
        // 创建
        const { title, cover, markdown, html } = req.body;
        const project = new Project({
          title,
          cover,
          markdown,
          html
        });
        project.save(err => {
          if (err) {
            return next(err);
          }
          res.json(handleSuccess());
        });
      }
    }
  }
];
exports.project_delete = (req, res, next) => {
  if (!req.body.id) {
    return res.json(handleParamsError());
  }
  Project.findByIdAndRemove(req.body.id).exec(err => {
    if (err) {
      return next(err);
    } else {
      res.json(handleSuccess());
    }
  });
};
