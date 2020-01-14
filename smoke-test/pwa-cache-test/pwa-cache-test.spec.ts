import puppeteer from "puppeteer";
import puppeteerConfig from "../puppeteer-config";
import config from "../test/environment-config";
import fs from "fs";
import { join } from "path";

jest.setTimeout(60000);

describe("Pwa cache test", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  const screenshotDir = "./screenshots";

  beforeAll(async () => {
    if (!fs.existsSync(screenshotDir)){
      fs.mkdirSync(screenshotDir);
    }

    browser = await puppeteer.launch(puppeteerConfig);
    page = await browser.newPage();
    const cookieDomain = new URL(config.url).hostname;
    await page.setCookie({
      name: "site-view",
      value: "i",
      domain: cookieDomain,
      path: "/"
    });

    await page.goto(config.url, {
      waitUntil: "networkidle0",
      timeout: 60000
    });

    await page.reload({
      waitUntil: "networkidle0",
      timeout: 60000
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should take screenshot", async () => {
    expect.assertions(1);
    try {
      await page.screenshot({
        fullPage: true,
        path: join(screenshotDir, `${config.spadeVersion}.png`)
      });
      expect(true).toBeTruthy();
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
});
