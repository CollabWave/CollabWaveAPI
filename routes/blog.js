const express = require("express");
const { ctrlrWrapper } = require("../helpers");
const { upload } = require("../middlewares");
const {
  addPostCtrl,
  getPostsCtrl,
  removePostCtrl,
} = require("../controllers/blog");

const router = express.Router();

router.get("/", ctrlrWrapper(getPostsCtrl));
router.post("/", upload.single("image"), ctrlrWrapper(addPostCtrl));
router.delete("/:postId", ctrlrWrapper(removePostCtrl));

module.exports = router;
