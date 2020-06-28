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

  it("should contain an ad unit", async () => {
    const adUnit = await page.$("app-basic-ad-unit");
    expect(adUnit).toBeTruthy();
  });

  it("should contain either homepage article highlight or defcon in top stories", async () => {
    const homepageHighlights = await page.$$(
      "app-grid-container:first-of-type app-homepage-highlight-article"
    );
    const defcon = await page.$$("app-grid-container:first-of-type app-defcon");

    if (homepageHighlights.length === 2) {
      expect(true).toBeTruthy();
    } else if (defcon.length === 1) {
      expect(false).toBeTruthy();
    } else {
      expect(false).toBeTruthy();
    }
  });

  it("should contain at least 7 homepage article in top stories", async () => {
    const homepageArticles = await page.$$(
      "app-grid-container:first-of-type app-homepage-article"
    );

    expect(homepageArticles.length).toBeGreaterThanOrEqual(7);
  });

  it("should contain latest headlines in top stories", async () => {
    const latestHeadlineArticles = await page.$$(
      "app-grid-container:first-of-type app-vertical-article-list a"
    );

    expect(latestHeadlineArticles.length).toBeGreaterThanOrEqual(6);
  });

  it("should contain editors pick, coronavirus, and national", async () => {
    const moduleHeaders = await page.$$eval(
      "app-grid-container > div > div > app-module-header > div",
      (headers) => headers.map((header) => header.textContent)
    );

    expect(moduleHeaders).toEqual(
      expect.arrayContaining(["editors' picks", "coronavirus", "national"])
    );
  });
});
