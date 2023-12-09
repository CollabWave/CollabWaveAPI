const Telegram = require("telegraf/telegram");
const { RequestError } = require("../../helpers");
const token = process.env.TELEGRAM_TOKEN;
const telegram = new Telegram(token);

const getFollowers = async (name) => {
  try {
    const data = await telegram.getChatMembersCount(`@${name}`);
    return data;
  } catch (error) {
    console.error(error);
    throw RequestError(500, error);
  }
};
// const getChatInfo = async (name) => {
//   try {
//     const chatInfo = await telegram.getChat(name);
//     return chatInfo;
//   } catch (error) {
//     console.error(error);
//     throw RequestError(500, error);
//   }
// };

module.exports = { getFollowers };
