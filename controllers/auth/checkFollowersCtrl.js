const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const { checkSocialMediaFollowers } = require("../../services/socialAPIs");

const checkFollowersCtrl = async (req, res) => {
  const { userId } = req.params;
  const { socialLinks } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.role === "brand") {
    throw RequestError(400, "Bad Request");
  }
  const followersData = await checkSocialMediaFollowers(socialLinks);
  console.log(followersData);
  if (!followersData.some(({ followers }) => followers >= 1000)) {
    throw RequestError(
      400,
      "None of the social networks has more than 1000 subscribers."
    );
  }
  user.socialLinks = followersData;
  await user.save();
  res.status(200).json({ status: "success", data: user });
};

module.exports = checkFollowersCtrl;
