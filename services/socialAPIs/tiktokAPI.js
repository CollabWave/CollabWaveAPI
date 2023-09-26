const tiktok = require("tiktok-private-api");

const getTikTokFollowersCount = async (username) => {
  try {
    const scraper = new tiktok.TikTokClient();

    const data = await scraper.user.info(username);
    const followersCount = data.userInfo.stats.followerCount;

    return followersCount;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getTikTokFollowersCount;
