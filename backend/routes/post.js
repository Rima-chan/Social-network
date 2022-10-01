const express = require("express");

const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/posts", auth, multer, postCtrl.createNewPost);
router.get("/posts/:id", auth, postCtrl.getOnePost);
router.put("/posts/:id", auth, multer, postCtrl.updatePost);
router.delete("/posts/:id", auth, postCtrl.deletePost);
router.get("/posts", auth, postCtrl.getAllPosts);

module.exports = router;
