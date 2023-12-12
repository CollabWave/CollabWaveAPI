const express = require("express");
const {
  loginCtrl,
  registerCtrl,
  logoutCtrl,
  verifyCtrl,
  googleAuthCtrl,
  googleRedirectCtrl,
} = require("../controllers/auth");
const { ctrlrWrapper } = require("../helpers");
const { auth } = require("../middlewares");

const router = express.Router();

router.post("/register", ctrlrWrapper(registerCtrl));
router.post("/verify/:userId", ctrlrWrapper(verifyCtrl));
router.post("/login", ctrlrWrapper(loginCtrl));
router.post("/logout", auth, ctrlrWrapper(logoutCtrl));
router.get("/google", ctrlrWrapper(googleAuthCtrl));
router.get("/google-redirect", ctrlrWrapper(googleRedirectCtrl));

module.exports = router;
