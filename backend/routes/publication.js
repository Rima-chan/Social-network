const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/publications', auth, multer, publicationCtrl.createNewPublication);
router.get('/publications/:id', auth, publicationCtrl.getOnePublication);
router.put('/publications/:id', auth, multer, publicationCtrl.updatePublication);
router.delete('/publications/:id', auth, publicationCtrl.deletePublication);
router.get('/publications', auth, publicationCtrl.getAllPublications);

module.exports = router;