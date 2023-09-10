const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const brandSchema = new Schema(
  {
    type: {
      type: String,
      default: "brand",
    },
    company: {
      type: String,
      default: "",
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
    site: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

brandSchema.post("save", handleError);
const Brand = model("brand", brandSchema);
module.exports = Brand;
