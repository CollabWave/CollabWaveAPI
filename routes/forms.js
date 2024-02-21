const express = require("express");
const { ctrlrWrapper } = require("../helpers");
const sendFormDataCtrl = require("../controllers/forms/sendFormDataCtrl");

const router = express.Router();

router.post("/", ctrlrWrapper(sendFormDataCtrl));

module.exports = router;
