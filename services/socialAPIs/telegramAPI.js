const Telegram = require("telegraf/telegram");
require("dotenv").config();
const token = process.env.TELEGRAM_TOKEN;
const telegram = new Telegram(token);

const getFollowers = async (name) => {
  try {
    const data = await telegram.getChatMembersCount(`@${name}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getFollowers;
