const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { v4: uuid } = require("uuid");
const { checkSocialMediaFollowers } = require("../../services/socialAPIs");

const verifyCtrl = async (req, res) => {
  const { userId } = req.params;
  const { info } = req.body;
  console.log(req.body);

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
    const followersData = await checkSocialMediaFollowers(info.socialLinks);
    console.log(followersData);

    if (!followersData.some(({ followers }) => followers >= 1000)) {
      throw RequestError(
        400,
        "None of the social networks has more than 1000 subscribers."
      );
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
      socialLinks: followersData,
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
      !info.language ||
      info.socialLinks.length === 0
    ) {
      throw RequestError(400, "All required fields must be filled");
    }

    user.info = {
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
  user.verificationToken = uuid();
  user.verify = true;
  await user.save();

  res.status(200).json({ status: "success", data: user });
};

module.exports = verifyCtrl;
