const express = require("express");

const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/:postId/comments", auth, multer, commentCtrl.createNewComment);
router.put(
  "/:postId/comments/:commentId",
  auth,
  multer,
  commentCtrl.updateComment
);
router.delete("/:postId/comments/:commentId", auth, commentCtrl.deleteComment);
router.get("/:postId/comments", auth, commentCtrl.getAllComments);

module.exports = router;
