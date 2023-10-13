const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["admin", "blogger", "brand"],
      required: true,
    },
    info: {
      type: Schema.Types.Mixed,
      select: false,
      _id: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    verificationToken: {
      type: String,
      default: "",
    },
    auth: {
      type: String,
      enum: ["email", "google"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleError);
const User = model("user", userSchema);

module.exports = User;
