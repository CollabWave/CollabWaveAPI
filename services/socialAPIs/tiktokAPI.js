const tiktok = require("tiktok-private-api");

const getTikTokFollowersCount = async (username) => {
  const scraper = new tiktok.TikTokClient();

  const data = await scraper.user.info(username);
  const followersCount = data.userInfo.stats.followerCount;
  console.log("channel followers count: ", followersCount);
  return followersCount;
};

module.exports = getTikTokFollowersCount;
