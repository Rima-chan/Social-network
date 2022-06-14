const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/:publicationId/comments', auth, multer, commentCtrl.createNewComment);
router.put('/:publicationId/comments/:commentId', auth, multer, commentCtrl.updateComment);
router.delete('/:publicationId/comments/:commentId', auth, commentCtrl.deleteComment)
router.get('/:publicationId/comments', auth, commentCtrl.getAllComments);

module.exports = router;