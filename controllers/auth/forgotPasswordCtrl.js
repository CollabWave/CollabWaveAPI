const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const {
  createPasswordChangeEmail,
  sendEmail,
} = require("../../services/email");

const forgotPasswordCtrl = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(403, "Email is wrong");
  }

  if (!user.verify) {
    throw RequestError(401, "User not verified");
  }

  const mail = createPasswordChangeEmail(user.id, user.firstName, user.email);

  await sendEmail(mail);

  return res.status(200).json({ message: "Email successfully sent" });
};

module.exports = forgotPasswordCtrl;
