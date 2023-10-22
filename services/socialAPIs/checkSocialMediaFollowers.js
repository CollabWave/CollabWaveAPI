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
    try {
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

      followersData.push({
        platform: network.platform,
        username: network.username,
        followers,
      });
    } catch (error) {
      console.error(`An error occurred for ${network.platform}:`, error);
      throw RequestError(
        500,
        `Internal Server Error for ${network.platform}. ${error} `
      );
    }
  }
  return followersData;
}

module.exports = checkSocialMediaFollowers;
