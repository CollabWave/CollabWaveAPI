const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "info@konteinerirent.eu" };
  const result = await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
