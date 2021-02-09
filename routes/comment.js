const express = require("express");

const CommentController = require("../controllers/comment");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, CommentController.createComment);

router.put("/:id", checkAuth, CommentController.updateComment);

router.get("", CommentController.getComments);

// router.get("/:id", CommentController.getPost);

router.delete("/:id", checkAuth, CommentController.deleteComment);

module.exports = router;
