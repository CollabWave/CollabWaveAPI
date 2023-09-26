const getInstagramFollowers = require("./instagramAPI");
const getYoutubeFollowers = require("./youtubeAPI");
const getTelegramFollowers = require("./telegramAPI");
const getTiktokFollowers = require("./tiktokAPI");
const { RequestError } = require("../../helpers");

async function checkSocialMediaFollowers(socialLinks) {
  if (!socialLinks || socialLinks.length === 0) {
    throw RequestError(400, "At least one social network is required");
  }
  const followersData = [];
  for (const network of socialLinks) {
    let followers;
    if (network.platform === "instagram") {
      followers = await getInstagramFollowers(network.username);
    }
    if (network.platform === "telegram") {
      followers = await getTelegramFollowers(network.username);
    }
    if (network.platform === "tiktok") {
      followers = await getTiktokFollowers(network.username);
    }
    if (network.platform === "youtube") {
      followers = await getYoutubeFollowers(network.username);
    }
    if (!followers) {
      throw RequestError(404, `Acount name ${network.platform} is not valid`);
    }
    followersData.push({
      platform: network.platform,
      username: network.username,
      followers,
    });
  }
  return followersData;
}

module.exports = checkSocialMediaFollowers;
