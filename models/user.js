const { Schema, model } = require("mongoose");
const { handleError } = require("../helpers");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "blogger", "brand", ""],
      default: "",
    },
    info: {
      type: Schema.Types.Mixed,
      select: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleError);
const User = model("user", userSchema);

module.exports = User;
