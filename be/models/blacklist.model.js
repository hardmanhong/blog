const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlacklistSchema = new Schema({
  token: { type: String, required: true },
  exp: { type: Number, required: true }
});
module.exports = mongoose.model("Blacklist", BlacklistSchema);
