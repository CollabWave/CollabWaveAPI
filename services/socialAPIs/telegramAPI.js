const Telegram = require("telegraf/telegram");
require("dotenv").config();
const token = process.env.TELEGRAM_TOKEN;
const telegram = new Telegram(token);

const getFollowers = async (name) => {
  const data = await telegram.getChatMembersCount(`@${name}`);
  console.log("channel followers count: ", data);
  return data;
};

module.exports = getFollowers;
