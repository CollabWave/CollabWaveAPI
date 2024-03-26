require("dotenv").config();
const fs = require("fs");

const createPasswordChangeEmail = (userId, name, email) => {
  return {
    to: email,
    subject: "Password change request",
    html: `<p>Hello ${name},</p><p>Please click <a target=_blank href="http://localhost:3000/login/change-password/${userId}">here</a> to change your password.</p>
    <p>Best regards,</p>
    <img alt="CollabWave logo" width="250" height="100" src="cid:logo" />
    `,
    attachments: [
      {
        content: fs.readFileSync(`./public/logo.png`, {
          encoding: "base64",
        }),
        filename: "Logo",
        type: "image/png",
        content_id: "logo",
        disposition: "inline",
      },
    ],
  };
};

module.exports = createPasswordChangeEmail;
