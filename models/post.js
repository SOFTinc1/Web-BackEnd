const mongoose = require("mongoose");

// mongoose.Promise = require('bluebird');
// mongoose.Promise = require('q').Promise;

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
