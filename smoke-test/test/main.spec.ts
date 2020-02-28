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
    await page.goto(config.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });
    await page.waitFor("app-header");
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

  it("should contain text in a half width article", async () => {
    const halfWidthArticle = await page.$("app-half-width-image-article-unit");
    const articleText = await page.evaluate(
      (element: Element) => element.textContent,
      halfWidthArticle
    );

    expect(halfWidthArticle).toBeTruthy();
    expect(articleText).toBeTruthy();
  });

  it("should contain an ad unit", async () => {
    const adUnit = await page.$("app-basic-ad-unit");
    expect(adUnit).toBeTruthy();
  });

  it("should contain at least 2 top stories highlights", async () => {
    const allGrids = await page.$$(
      "app-grid-container > div > div > app-grid-container"
    );
    const topStoriesHighlight = await allGrids[0];

    const featuredArticles = await topStoriesHighlight.$$(
      "app-featured-article"
    );
    const bigImageArticles = await topStoriesHighlight.$$(
      "app-big-image-article-unit"
    );
    const halfWidthImageArticles = await topStoriesHighlight.$$(
      "app-half-width-image-article-unit"
    );

    expect(
      featuredArticles.length +
        bigImageArticles.length +
        halfWidthImageArticles.length
    ).toBeGreaterThanOrEqual(2);
  });

  it("should contain at least 7 other top stories", async () => {
    const allGrids = await page.$$("app-grid-container > div");
    const topStoriesGrid = await allGrids[0];

    const halfWidthImageArticles = await topStoriesGrid.$$(
      "app-half-width-image-article-unit"
    );
    const halfWidthImageWithoutIntroArticles = await topStoriesGrid.$$(
      "app-half-image-article-without-intro-unit"
    );

    expect(
      halfWidthImageArticles.length + halfWidthImageWithoutIntroArticles.length
    ).toBeGreaterThanOrEqual(7);
  });
});
