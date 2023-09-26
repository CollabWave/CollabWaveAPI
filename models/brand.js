const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const brandSchema = new Schema(
  {
    type: {
      type: String,
      default: "brand",
    },
    company: {
      type: { name: String, url: String },
      default: { name: "", url: "" },
      _id: false,
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
    task: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, _id: false }
);

brandSchema.post("save", handleError);
const Brand = model("brand", brandSchema);
module.exports = Brand;
