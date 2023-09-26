const getInstagramFollowers = require("./instagramAPI");
const getYoutubeFollowers = require("./youtubeAPI");
const getTelegramFollowers = require("./telegramAPI");
const getTiktokFollowers = require("./tiktokAPI");

async function checkSocialMediaFollowers(socialLinks) {
  if (!socialLinks || socialLinks.length === 0) {
    throw RequestError(400, "At least one social network is required");
  }
  const followersData = [];
  for (const network of socialLinks) {
    let followers;
    if (network.platform === "instagram") {
      const data = await getInstagramFollowers(network.username);
      followers = data[1];
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
    followersData.push({
      platform: network.platform,
      username: network.username,
      followers: Number(followers),
    });
  }
  return followersData;
}

module.exports = checkSocialMediaFollowers;
