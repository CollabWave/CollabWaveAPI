require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const formsRouter = require("./routes/forms");
const session = require("express-session");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const { SESSION_KEY } = process.env;

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/blog", blogRouter);
app.use("/api/forms", formsRouter);
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
    },
  })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

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
