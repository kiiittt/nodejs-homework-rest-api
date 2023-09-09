const express = require("express");
const jsonParse = express.json();
const router = express.Router();
const AuthController = require("../../controllers/auth");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const { verifyEmail, resendVerifyEmail } = require("../../controllers/auth");



router.post("/register", jsonParse, AuthController.register);
router.post("/login", jsonParse, AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.get("/current", auth, AuthController.current);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  AuthController.uploadAvatar
);
// router.post("/verify", auth, AuthController.verifyEmail);
// router.get(
//   "/verify/:verificationToken", auth,
//   AuthController.resendVerifyEmail
// );


router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", resendVerifyEmail);

module.exports = router;
