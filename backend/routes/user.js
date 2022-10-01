const express = require("express");

const router = express.Router();
const userCtrl = require("../controllers/user");
const passValidation = require("../middleware/passValidator");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/users/signup", passValidation, userCtrl.signup);
router.post("/users/login", userCtrl.login);
router.get("/users/:id", auth, userCtrl.getOneUser);
router.put("/users/:id", auth, multer, userCtrl.updateProfil);
router.delete("/users/:id", auth, userCtrl.deleteProfil);
router.get("/users", auth, userCtrl.getAll);

module.exports = router;
