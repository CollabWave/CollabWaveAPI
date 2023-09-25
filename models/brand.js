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
