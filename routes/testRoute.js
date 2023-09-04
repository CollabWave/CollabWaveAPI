const express = require("express");
const { testCtrl } = require("../controllers");
const testRouter = express.Router();

testRouter.post("/", testCtrl);

module.exports = testRouter;
