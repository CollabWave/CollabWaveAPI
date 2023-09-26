const puppeteer = require("puppeteer");
const locateChrome = require("locate-chrome");

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

    values[1];
    const followers = Number(values[1].replace(/\s/g, ""));
    return followers;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
};

module.exports = getFollowersCount;
