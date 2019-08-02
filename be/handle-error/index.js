const createError = require("http-errors");
// catch 404 and forward to error handler
const handle404 = (req, res, next) => {
  res.status(404);
  next(createError(404));
};
// error handler

const handleOther = (req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};
module.exports = [handle404,handleOther];
