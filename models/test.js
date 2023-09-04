const { Schema, model, SchemaTypes } = require("mongoose");

const testSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { versionKey: false }
);

const Test = model("test", testSchema);

module.exports = Test;
