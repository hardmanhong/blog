const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true, min: 1 },
  tag: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  markdown: { type: String },
  html: { type: String }
});
module.exports = mongoose.model("Post", PostSchema);
