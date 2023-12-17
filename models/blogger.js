const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const bloggerSchema = new Schema(
  {
    type: {
      type: String,
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

    socialLinks: [
      {
        platform: {
          type: String,
          enum: ["facebook", "youtube", "instagram", "tiktok", "telegram"],
          required: true,
        },
        username: {
          type: String,
          default: "",
        },
        followers: {
          type: Number,
          default: 0,
        },
      },
    ],

    about: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    blogLanguage: {
      type: String,
      enum: ["english", "russian", "ukrainian", "french", "spanish", "german"],
      default: "english",
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

bloggerSchema.post("save", handleError);
const Blogger = model("blogger", bloggerSchema);
module.exports = Blogger;
