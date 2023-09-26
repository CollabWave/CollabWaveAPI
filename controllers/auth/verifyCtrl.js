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
      info.blogLanguages.length === 0
    ) {
      throw RequestError(400, "All required fields must be filled");
    }
    if (
      !info.socialLinks.facebook &&
      !info.socialLinks.youtube &&
      !info.socialLinks.instagram &&
      !info.socialLinks.tiktok &&
      !info.socialLinks.telegram
    ) {
      throw RequestError(400, "Social Links fields must be filled");
    }
    user.info = {
      type: info.type,
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
      about: info.about,
      education: info.education,
      blogLanguages: info.blogLanguages,
    };
  } else if (user.role === "brand") {
    if (
      !info.company.name ||
      !info.birthDate.date ||
      !info.birthDate.month ||
      !info.birthDate.year ||
      !info.location ||
      !info.phone ||
      !info.language
    ) {
      throw RequestError(400, "All required fields must be filled");
    }
    if (
      !info.socialLinks.facebook &&
      !info.socialLinks.youtube &&
      !info.socialLinks.instagram &&
      !info.socialLinks.tiktok &&
      !info.socialLinks.telegram
    ) {
      throw RequestError(400, "Social Links fields must be filled");
    }
    user.info = {
      type: "brand",
      company: {
        name: info.company.name,
        url: info.company.url,
      },
      socialLinks: info.socialLinks,
      location: info.location,
      phone: info.phone,
      language: info.language,
      task: info.task,
    };
  } else {
    throw RequestError(400, "Role not found");
  }

  await user.save();

  res.status(200).json({ status: "success", data: user });
};

module.exports = verifyCtrl;
