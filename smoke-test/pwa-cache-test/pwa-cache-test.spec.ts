import puppeteer from "puppeteer";
import puppeteerConfig from "../puppeteer-config";
import config from "../test/environment-config";
jest.setTimeout(60000);

xdescribe("Pwa cache test", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
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

  it("should have correct title", async () => {
    const title = await page.title();
    expect(title).toBe("Latest breaking news NZ | Stuff.co.nz | New Zealand");
  });
});
