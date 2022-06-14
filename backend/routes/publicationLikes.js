const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/publicationLikes');
const auth = require('../middleware/auth');

router.post('/publications/:id/likes', auth, likeCtrl.handleLikes);

module.exports = router;