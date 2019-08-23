const tagRouter = require("./tag.route");
const postRouter = require("./post.route");
const userRouter = require("./user.route");
const projectRouter = require("./project.route");
const uploadRouter = require("./upload.route");

module.exports = [
  tagRouter,
  postRouter,
  userRouter,
  projectRouter,
  uploadRouter
];
