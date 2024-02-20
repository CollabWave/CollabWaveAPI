const { formDataValidation } = require("../../middlewares");
const { createFormDataEmail, sendEmail } = require("../../services/email");

const sendFormDataCtrl = async (req, res) => {
  const { error } = formDataValidation.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  //добавить потом обработку subscribe

  const mail = createFormDataEmail(req.body, "collab.wave.91@gmail.com");

  await sendEmail(mail);

  return res.status(200).json({ message: "Email successfully sent" });
};

module.exports = sendFormDataCtrl;
