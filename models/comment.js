const mongoose = require("mongoose");

// mongoose.Promise = require('bluebird');
// mongoose.Promise = require('q').Promise;

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
  postPath: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Comment", commentSchema);
