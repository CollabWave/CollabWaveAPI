const { User, Blogger, Brand } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const registerCtrl = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw RequestError(400, "Email already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  let user;
  if (role === "blogger") {
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
      info: new Blogger(),
      auth: "email",
    });
  } else if (role === "brand") {
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
      info: new Brand(),
      auth: "email",
    });
  }
  if (!user) {
    throw RequestError(404, "Invalid request body");
  }

  res.status(201).json({ status: "success", data: user });
};

module.exports = registerCtrl;
