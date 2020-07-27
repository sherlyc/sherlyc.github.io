import * as fs from "fs";
import { join } from "path";
import { Browser, DirectNavigationOptions, launch, Page } from "puppeteer";
import puppeteerConfig from "../puppeteer-config";
import config from "./environment-config";

jest.setTimeout(80000);

describe("Pwa cache test", () => {
  let browser: Browser;
  let page: Page;
  const screenshotDir = "./screenshots";

  beforeAll(async () => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }

    browser = await launch(puppeteerConfig);
    page = await browser.newPage();

    const loadStrategy: DirectNavigationOptions = {
      waitUntil: "networkidle0",
      timeout: 80000
    };
    await page.goto(config.url, loadStrategy);

    await page.reload(loadStrategy);
    await page.reload(loadStrategy);
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
