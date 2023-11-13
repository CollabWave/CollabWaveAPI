const fs = require("fs").promises;
const path = require("path");
const { BlogPost } = require("../../models");
const Jimp = require("jimp");

const imagesDir = path.join(__dirname, "..", "..", "public", "blogImages");

const addPostCtrl = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${req.body.slug}.${extention}`;

  const resultUpload = await Jimp.read(tempUpload);
  resultUpload.resize(517, 570).write(path.join(imagesDir, filename));

  const imageURL = path.join(filename);

  const newPost = await BlogPost.create({ ...req.body, image: imageURL });

  fs.unlink(tempUpload);

  return res.status(201).json(newPost);
};

module.exports = addPostCtrl;
