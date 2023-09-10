const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const bloggerSchema = new Schema(
  {
    type: {
      type: String,
      default: "blogger",
    },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    birthDate: {
      type: {
        date: Number,
        month: Number,
        year: Number,
      },
      default: {
        date: 0,
        month: 0,
        year: 0,
      },
    },
    location: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      enum: ["en", "ru", "uk"],
      default: "en",
    },
    socialLinks: [
      {
        type: String,
        enum: ["facebook", "twitter", "instagram", "youtube"],
      },
    ],
    activity: [
      {
        type: String,
      },
    ],
  },
  { versionKey: false }
);

bloggerSchema.post("save", handleError);
const Blogger = model("blogger", bloggerSchema);
module.exports = Blogger;
