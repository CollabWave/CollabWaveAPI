const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const changePasswordCtrl = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (!user.verify) {
    throw RequestError(401, "User not verified");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashPassword;
  await user.save();

  res.status(200).json({ status: "success", data: user });
};

module.exports = changePasswordCtrl;
