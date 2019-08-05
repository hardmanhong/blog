const mongoose = require("mongoose");

const connectMongoDB = () => {
  // 连接mongoDB
  const mongoDB = "mongodb://localhost:27017/blog";
  mongoose.connect(mongoDB,{useNewUrlParser: true});
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB 连接错误："));
};
module.exports = connectMongoDB;
