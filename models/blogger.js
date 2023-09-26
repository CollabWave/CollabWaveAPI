const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const bloggerSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["food", "sport", ""],
      default: "",
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
      _id: false,
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

    socialLinks: {
      type: {
        facebook: String,
        youtube: String,
        instagram: String,
        tiktok: String,
        telegram: String,
      },
      default: {
        facebook: "",
        youtube: "",
        instagram: "",
        tiktok: "",
        telegram: "",
      },
      _id: false,
    },
    about: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    blogLanguages: [
      {
        type: String,
        enum: [
          "english",
          "russian",
          "ukrainian",
          "french",
          "spanish",
          "german",
        ],
        default: "english",
      },
    ],
  },
  {
    versionKey: false,
    _id: false,
  }
);

bloggerSchema.post("save", handleError);
const Blogger = model("blogger", bloggerSchema);
module.exports = Blogger;
