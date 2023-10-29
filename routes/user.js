const express = require("express");
const { updateDataCtrl } = require("../controllers/user");
const { ctrlrWrapper } = require("../helpers");
const { auth } = require("../middlewares");

const router = express.Router();

router.patch("/:userId", auth, ctrlrWrapper(updateDataCtrl));

module.exports = router;
