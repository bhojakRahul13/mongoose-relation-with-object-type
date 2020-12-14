const mongoose = require("mongoose");

//Post - Title,Content
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
module.exports = mongoose.model("Post", postSchema);
