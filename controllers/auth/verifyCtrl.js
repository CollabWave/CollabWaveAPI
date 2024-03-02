const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { v4: uuid } = require("uuid");

const verifyCtrl = async (req, res) => {
  const { userId } = req.params;
  const { info } = req.body;
  console.log(req.body);

  const user = await User.findById(userId);

  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.role === "blogger" && user.socialLinks) {
    if (
      !info.gender ||
      !info.birthDate.date ||
      !info.birthDate.month ||
      !info.birthDate.year ||
      !info.location ||
      !info.phone ||
      !info.language
    ) {
      throw RequestError(400, "All required fields must be filled");
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
      about: info.about,
      education: info.education,
      blogLanguage: info.blogLanguage,
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

    user.info = {
      company: {
        name: info.company.name,
        url: info.company.url,
      },
      location: info.location,
      phone: info.phone,
      language: info.language,
      task: info.task,
    };
  } else {
    throw RequestError(400, "Bad Request");
  }
  user.verificationToken = uuid();
  user.verify = true;
  await user.save();

  res.status(200).json({ status: "success", data: user });
};

module.exports = verifyCtrl;
