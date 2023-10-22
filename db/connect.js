const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", async (err) => {
  console.log(`Monggose connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
module.exports = connectDB;
