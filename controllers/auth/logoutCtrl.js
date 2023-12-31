const { User } = require("../../models/");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ status: "success", message: "Logout" });
};

module.exports = logoutController;
