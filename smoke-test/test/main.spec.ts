import { Browser, launch, Page } from "puppeteer";
import puppeteerConfig from "../puppeteer-config";
import config from "./environment-config";
jest.setTimeout(60000);

describe("Mobile Homepage", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await launch(puppeteerConfig);
    page = await browser.newPage();
    const cookieDomain = new URL(config.url).hostname;
    await page.setCookie({
      name: "site-view",
      value: "i",
      domain: cookieDomain,
      path: "/"
    });
    await page.goto(config.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should have correct title", async () => {
    const title = await page.title();
    expect(title).toBe("Latest breaking news NZ | Stuff.co.nz | New Zealand");
  });

  it("should contain header", async () => {
    const header = await page.$("app-header");
    expect(header).toBeTruthy();
  });

  it("should contain footer", async () => {
    const footer = await page.$("app-footer");
    expect(footer).toBeTruthy();
  });

  it("should contain text in a basic article", async () => {
    const basicArticle = await page.$("app-basic-article-unit");
    const articleText = await page.evaluate(
      (element: Element) => element.textContent,
      basicArticle
    );

    expect(basicArticle).toBeTruthy();
    expect(articleText).toBeTruthy();
  });

  it("should contain an ad unit", async () => {
    const adUnit = await page.$("app-basic-ad-unit");
    expect(adUnit).toBeTruthy();
  });

  it("should contain at least 5 top stories", async () => {
    const topStories = await page.$$(
      "app-grid-container > div > div > app-big-image-article-unit"
    );
    expect(topStories.length).toBeGreaterThanOrEqual(5);
  });
});
