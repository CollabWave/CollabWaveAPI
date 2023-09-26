require("dotenv").config({ path: "../../.env" });
const Telegram = require("telegraf/telegram");

const token = process.env.TELEGRAM_TOKEN;

const telegram = new Telegram(token);

const getFollowers = async (chatId) => {
  const data = await telegram.getChatMembersCount(chatId);
  console.log("channel followers count: ", data);
};

getFollowers("@MaketFigma");

module.exports = getFollowers;
