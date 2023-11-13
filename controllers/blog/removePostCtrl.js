const fs = require("fs").promises;
const path = require("path");
const { BlogPost } = require("../../models");

const removePostCtrl = async (req, res) => {
  const { postId: id } = req.params;

  const post = await BlogPost.findById(id);

  const pathToFile = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "blogImages",
    `${post.image}`
  );

  fs.unlink(pathToFile, function (err) {
    if (err) {
      throw err;
    } else {
      console.log("Successfully deleted the file.");
    }
  });

  const postRemove = await BlogPost.findOneAndDelete({ _id: id });
  if (!postRemove) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json({
    message: "Post deleted",
  });
};

module.exports = removePostCtrl;
