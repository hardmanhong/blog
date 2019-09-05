const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const verifyToken = require("../middlewares/checkToken").verifyToken;

exports.upload = (req, res, next) => {
  console.log("upload");
  const form = new formidable.IncomingForm();
  const targetDir = path.join(__dirname, "../public/upload");
  form.encoding = "utf-8"; //设置编码
  form.uploadDir = targetDir; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; //设置图片大小
  //检验存储上传的文件夹是否存在
  form.parse(req, function(err, fields, file) {
    var filePath = "";
    verifyToken(fields.token, { req, res, next }).then(() => {
      //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。
      if (file.tmpFile) {
        filePath = file.tmpFile.path;
      } else {
        for (var key in file) {
          if (file[key].path && filePath === "") {
            filePath = file[key].path;
            break;
          }
        }
      }

      //文件移动的目录文件夹，不存在时创建目标文件夹
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
      }
      var fileExt = filePath.substring(filePath.lastIndexOf("."));
      //判断文件类型是否允许上传
      if (".jpg.jpeg.png.gif".indexOf(fileExt.toLowerCase()) === -1) {
        var err = new Error("此文件类型不允许上传");
        res.json({ code: -1, message: "此文件类型不允许上传" });
      } else {
        //以当前时间戳对上传文件进行重命名
        var fileName = new Date().getTime() + fileExt;
        var targetFile = path.join(targetDir, fileName);
        //移动文件
        fs.rename(filePath, targetFile, function(err) {
          if (err) {
            res.json({ code: -1, message: "操作失败" });
          } else {
            //上传成功，返回文件的相对路径
            var fileUrl = "public/upload/" + fileName;
            res.json({ code: 200, data: fileUrl });
          }
        });
      }
    });
  });
};
