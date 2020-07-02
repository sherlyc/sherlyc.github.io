import { By, until, WebDriver } from "selenium-webdriver";
import { getDriver } from "./driver/driver";
import { getElement, getElements } from "./helpers";
import config from "./spadeConfig";

jest.setTimeout(600000);

async function pageToBeReady(driver: WebDriver) {
  await driver.wait(
    until.elementLocated(By.css("app-homepage-article")),
    30000
  );
}

describe("Homepage", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await getDriver();
    await driver.get(config.url);
    await pageToBeReady(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("should have correct title", async () => {
    const title = await driver.getTitle();
    expect(title).toBe("Latest breaking news NZ | Stuff.co.nz | New Zealand");
  });

  it("should display basic ad units", async () => {
    const ads = await getElements(driver, "app-basic-ad-unit");
    expect(ads.length).toBeGreaterThan(0);
  });

  it("should contain header", async () => {
    const header = await getElement(driver, "app-header");
    expect(header).toBeTruthy();
  });

  it("should contain footer", async () => {
    const header = await getElement(driver, "app-header");
    expect(header).toBeTruthy();
  });

  it("should contain an ad unit", async () => {
    const adUnit = await getElement(driver, "app-basic-ad-unit");
    expect(adUnit).toBeTruthy();
  });

  it("should contain either homepage article highlight or defcon in top stories", async () => {
    const homepageHighlights = await getElements(
      driver,
      "app-grid-container:first-of-type app-homepage-highlight-article"
    );
    const defcon = await driver.findElements(
      By.css("app-grid-container:first-of-type app-defcon")
    );

    expect(homepageHighlights.length === 2 || defcon.length === 1).toBeTruthy();
    expect(homepageHighlights.length === 2 && defcon.length === 1).toBeFalsy();
  });

  it("should contain at least 7 homepage article in top stories", async () => {
    const homepageArticles = await getElements(
      driver,
      "app-grid-container:first-of-type app-homepage-article"
    );

    expect(homepageArticles.length).toBeGreaterThanOrEqual(7);
  });

  it("should contain latest headlines in top stories", async () => {
    const latestHeadlineArticles = await getElements(
      driver,
      "app-grid-container:first-of-type app-vertical-article-list a"
    );

    expect(latestHeadlineArticles.length).toBeGreaterThanOrEqual(6);
  });

  it("should contain editors pick, coronavirus, and national", async () => {
    const moduleHeaders = await getElements(
      driver,
      "app-grid-container > div > div > app-module-header > div"
    );

    const moduleHeaderTexts = await Promise.all(
      moduleHeaders.map((header) => header.getText())
    );

    expect(moduleHeaderTexts).toEqual(
      expect.arrayContaining(["editors' picks", "coronavirus", "national"])
    );
  });
});
