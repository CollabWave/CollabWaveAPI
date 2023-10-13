const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { User } = require("../../models");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(403, "Email or password is wrong");
  }
  const passwordCompare = await bCrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequestError(403, "Email or password is wrong");
  }
  if (!user.verify) {
    throw RequestError(401, "User not verified");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  const data = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  res.status(200).json({ status: "success", data });
};

module.exports = loginController;
