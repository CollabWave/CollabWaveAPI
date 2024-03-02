const loginCtrl = require("./loginCtrl");
const registerCtrl = require("./registerCtrl");
const verifyCtrl = require("./verifyCtrl");
const logoutCtrl = require("./logoutCtrl");
const googleAuthCtrl = require("./googleAuthCtrl");
const googleRedirectCtrl = require("./googleRedirectCtrl");
const checkFollowersCtrl = require("./checkFollowersCtrl");

module.exports = {
  registerCtrl,
  logoutCtrl,
  googleAuthCtrl,
  googleRedirectCtrl,
  verifyCtrl,
  loginCtrl,
  checkFollowersCtrl,
};
