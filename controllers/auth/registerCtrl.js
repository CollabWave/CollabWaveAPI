const { User, Brand, Blogger } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const registerCtrl = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  let newUser;

  if (role === "blogger") {
    newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
      info: new Blogger(),
    });
  } else if (role === "brand") {
    newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
      info: new Brand(),
    });
  } else {
    newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });
  }

  res.status(201).json({ status: "success", data: newUser });
};

module.exports = registerCtrl;
