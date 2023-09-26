require("dotenv").config({ path: "../../.env" });
const axios = require("axios");

const apiKey = process.env.YOUTUBE_API_KEY;
const channel = "GOALACTION"; //test

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
      return null;
    });
};

const getChannelStatistics = (channelId) => {
  if (!channelId) {
    console.log("Channel ID is not available.");
    return;
  }

  const statsApiUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=statistics`;

  return axios
    .get(statsApiUrl)
    .then((response) => {
      const channelStats = response.data.items[0].statistics;
      const subscriberCount = channelStats.subscriberCount;
      console.log(`Subscriber Count: ${subscriberCount}`);
    })
    .catch((error) => {
      console.error("Error fetching channel statistics:", error);
    });
};

const getYoutubeSubscribersCount = (channelName) => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${channelName}&type=channel`;

  getChannelId(apiUrl).then((channelId) => {
    if (channelId) {
      getChannelStatistics(channelId);
    }
  });
};

getYoutubeSubscribersCount(channel);

module.exports = getYoutubeSubscribersCount;
