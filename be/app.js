const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectMongoDB = require("./mongodb");
const handleError = require("./handle-error");
const allRouter = require("./routes");
const app = express();
const checkToken = require("./middlewares/checkToken");
// 连接mongoDB
connectMongoDB();
// 设置视图目录及视图模板引擎格式
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
//设置跨域访问
app.use(cors());
// 日志
app.use(logger("dev"));
// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie
app.use(cookieParser());
// 设置静态目录
app.use("/", express.static(path.join(__dirname, "build")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "upload")));

// 设置接口路由
app.use("/api", checkToken, allRouter);
// 处理http错误
app.use(handleError);

module.exports = app;
