const express = require("express");

const router = express.Router();
const likeCtrl = require("../controllers/postLikes");
const auth = require("../middleware/auth");

router.post("/posts/:id/likes", auth, likeCtrl.handleLikes);

module.exports = router;
