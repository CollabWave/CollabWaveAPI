const puppeteer = require("puppeteer");
const locateChrome = require("locate-chrome");

const username = "cristiano"; // test

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

    console.log(`Numbers of posts: ${values[0]}`);
    console.log(`Followers: ${values[1]}`);
    console.log(`Following: ${values[2]}`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
};

getFollowersCount(username);

module.exports = getFollowersCount;
