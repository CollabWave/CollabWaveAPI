const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(err);
  res.status(status).json({ status, message });
});

module.exports = app;
