const tiktok = require("tiktok-private-api");
const { RequestError } = require("../../helpers");

const getTikTokFollowersCount = async (username) => {
  try {
    const scraper = new tiktok.TikTokClient();

    scraper.state.defaultHeaders = {
      ...scraper.state.defaultHeaders,
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
    };

    const data = await scraper.user.info(username);

    const followersCount = data.userInfo.stats.followerCount;

    return followersCount;
  } catch (error) {
    console.error(error);
    throw RequestError(500, error);
  }
};

module.exports = getTikTokFollowersCount;
