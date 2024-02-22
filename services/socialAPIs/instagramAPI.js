const puppeteer = require("puppeteer");
const locateChrome = require("locate-chrome");
const { RequestError } = require("../../helpers");

const getFollowersCount = async (instaName) => {
  const executablePath = await new Promise((resolve) =>
    locateChrome((arg) => resolve(arg))
  );
  const browser = await puppeteer.launch({ executablePath, headless: "new" });

  const page = await browser.newPage();

  try {
    await page.setDefaultNavigationTimeout(120000);

    await page.goto(`https://www.instagram.com/${instaName}/`);

    await page.waitForSelector("span._ac2a");

    const values = await page.$$eval("span._ac2a span", (elements) =>
      elements.slice(0, 3).map((el) => el.textContent)
    );

    const followers = values[1];
    let followersCount = 0;

    if (!followers) {
      throw RequestError(404, "Account or followers not found");
    }
    const numericString = followers.replace(/\D/g, "");

    if (followers.includes("K")) {
      followersCount = parseInt(numericString) * 1000;
    } else if (followers.includes("M")) {
      followersCount = parseInt(numericString) * 1000000;
    } else {
      followersCount = parseInt(numericString);
    }
    return followersCount;
  } catch (error) {
    console.error("An error occurred:", error);
    throw RequestError(500, error);
  } finally {
    await browser.close();
  }
};

module.exports = getFollowersCount;
