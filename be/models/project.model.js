const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  title: { type: String, required: true, min: 1 },
  cover: { type: String, required: true},
  markdown: { type: String },
  html: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: null }
});
module.exports = mongoose.model("Project", ProjectSchema);
