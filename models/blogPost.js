const { Schema, model } = require("mongoose");

const { handleError } = require("../helpers");

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    swag: {
      type: String,
      default: "",
    },
    image: {
      type: String,
    },
  },
  { versionKey: false }
);

blogPostSchema.post("save", handleError);
const BlogPost = model("blogPost", blogPostSchema);

module.exports = BlogPost;
