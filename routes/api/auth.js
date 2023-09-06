const express = require("express");
const jsonParse = express.json();
const router = express.Router();
const AuthController = require("../../controllers/auth");
const auth = require("../../middleware/auth");


router.post("/register", jsonParse, AuthController.register);
router.post("/login", jsonParse, AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.get("/current", auth, AuthController.current);


module.exports = router;
