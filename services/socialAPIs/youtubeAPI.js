const axios = require("axios");
const { RequestError } = require("../../helpers");
const apiKey = process.env.YOUTUBE_API_KEY;

const getChannelId = (apiUrl) => {
  return axios
    .get(apiUrl)
    .then((response) => {
      const searchResults = response.data.items;
      if (searchResults.length > 0) {
        const channelId = searchResults[0].id.channelId;
        return channelId;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      throw RequestError(500, error);
    });
};

const getChannelStatistics = (channelId) => {
  if (!channelId) {
    console.log("Channel ID is not available.");
    throw RequestError(500, "Channel ID is not available.");
  }

  const statsApiUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics`;

  return axios
    .get(statsApiUrl)
    .then((response) => {
      const channelStats = response.data.items[0].statistics;
      const subscriberCount = channelStats.subscriberCount;
      console.log(subscriberCount);
      if (!subscriberCount) {
        throw RequestError(404, "Account or followers not found");
      }
      return Number(subscriberCount);
    })
    .catch((error) => {
      console.error("Error fetching channel statistics:", error);
      throw RequestError(500, error);
    });
};

const getYoutubeSubscribersCount = (channelName) => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${channelName}&type=channel`;

  return getChannelId(apiUrl).then((channelId) => {
    if (!channelId) {
      throw RequestError(404);
    }
    return getChannelStatistics(channelId);
  });
};

module.exports = getYoutubeSubscribersCount;
