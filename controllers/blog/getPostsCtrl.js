const { BlogPost } = require("../../models");

const getPostsCtrl = async (req, res) => {
  const posts = await BlogPost.find();

  res.status(200).json(posts);
};

module.exports = getPostsCtrl;
