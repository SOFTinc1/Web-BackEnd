const Post = require("../models/post");
const Comment = require("../models/comment");


exports.createComment = (req, res, next) => {

  const comment = new Comment({
    content: req.body.content,
    creator: req.userData.userId
  });
  comment
    .save()
    .then(createdComment => {

      Post.findById(req.params.id, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          Post.comments.push(comment);
          comment.save();
          res.status(201).json({
            message: "Comment added successfully",
            comment: {
              ...createdComment,
              id: createdComment._id
            }
          });
        }
      })
    })
    // .catch(error => {
    //   res.status(500).json({
    //     message: "Creating a comment failed!"
    //   });
    // });
};

// exports.getComments = (req, res, next) => {
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const commentQuery = Comment.find();
//   let fetchedComments;
//   if (pageSize && currentPage) {
//     commentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
//   commentQuery
//     .then(documents => {
//       fetchedComments = documents;
//       return Comment.count();
//     })
//     .then(count => {
//       res.status(200).json({
//         message: "Comments fetched successfully!",
//         comments: fetchedComments,
//         maxComments: count
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching Comments failed!"
//       });
//     });
// };

exports.getComments = async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  try {
    const commentQuery = await Comment.find();
    if (pageSize && currentPage) {
      commentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    commentQuery;

    const totalComment = await Comment.countDocuments();

    res.status(200).json({
      message: "Comments fetched successfully!",
      comments: commentQuery,
      maxComments: totalComment
    });

  } catch (error) {
    res.status(500).json({
      message: "Fetching Comments failed!"
    });
  }


};

// exports.getComment = (req, res, next) => {
//   Comment.findById(req.params.id)
//     .then(comment => {
//       if (comment) {
//         res.status(200).json(comment);
//       } else {
//         res.status(404).json({ message: "comment not found!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching comment failed!"
//       });
//     });
// };

exports.updateComment = (req, res, next) => {
  const comment = new Comment({
    _id: req.body.id,
    content: req.body.content,
    creator: req.userData.userId
  });
  Comment.updateOne({ _id: req.params.id, creator: req.userData.userId }, comment)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Comment Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};

exports.deleteComment = (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};


