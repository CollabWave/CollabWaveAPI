const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { v4: uuid } = require("uuid");

const verifyCtrl = async (req, res) => {
  const { userId } = req.params;
  const { info } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.role === "blogger") {
    if (
      !info.gender ||
      !info.birthDate.date ||
      !info.birthDate.month ||
      !info.birthDate.year ||
      !info.location ||
      !info.phone ||
      !info.language ||
      info.socialLinks.length === 0
    ) {
      throw RequestError(400, "All required fields must be filled");
    }

    user.info = {
      gender: info.gender,
      birthDate: {
        date: info.birthDate.date,
        month: info.birthDate.month,
        year: info.birthDate.year,
      },
      location: info.location,
      phone: info.phone,
      language: info.language,
      socialLinks: info.socialLinks,
      activity: info.activity,
    };
  } else if (user.role === "brand") {
    if (!info.company || !info.location || !info.phone || !info.language) {
      throw RequestError(400, "All required fields must be filled");
    }

    user.info = {
      company: info.company,
      location: info.location,
      phone: info.phone,
      language: info.language,
      site: info.site,
    };
  } else {
    throw RequestError(400, "Role not found");
  }

  await user.save();

  res.status(200).json({ status: "success", data: user });
};

module.exports = verifyCtrl;
