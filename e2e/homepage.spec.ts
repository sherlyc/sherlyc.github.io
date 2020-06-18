import { By, until, WebDriver } from "selenium-webdriver";
import { getDriver } from "./driver/driver";
import { getElement, getElements } from "./helpers";
import config from "./spaceConfig";

jest.setTimeout(1000000);

async function pageTobeready(driver: WebDriver) {
  await driver.wait(until.elementLocated(By.css("app-basic-article-unit")));
}

describe("Homepage", () => {
  let driver: WebDriver;
  beforeAll(async () => {
    driver = await getDriver();
  });
  beforeEach(async () => {
    await driver.get(config.url);
    await pageTobeready(driver);
  });
  afterAll(async () => {
    await driver.quit();
  });

  it("should display basic article units", async () => {
    const articles = await getElements(driver, "app-basic-article-unit");
    expect(articles.length).toBeGreaterThan(0);

    for (const article of articles) {
      expect(article).toBeTruthy();

      const content = await article.getText();
      expect(content.trim().length).toBeTruthy();

      const title = await article.findElement(By.css(".title"));
      expect(title).toBeTruthy();
    }
  });

  it("should navigate to article page when articles are clicked", async () => {
    const article = await getElement(driver, "app-basic-article-unit");
    const link = await article.findElement(By.css("a"));
    const href = await link.getAttribute("href");

    link.click();

    await driver.wait(until.urlIs(href));
    expect(await driver.getCurrentUrl()).toBe(href);
  });

  it("should display basic ad units", async () => {
    const ads = await getElements(driver, "app-basic-ad-unit");
    expect(ads.length).toBeGreaterThan(0);
  });

  it("should not have the missing position in article meta tag", async () => {
    const metaElements = await getElements(driver, "meta[itemprop=position]");
    const positions = await Promise.all(
      metaElements.map(async (elem) => await elem.getAttribute("content"))
    );
    positions.forEach((position) => {
      expect(position).not.toEqual("");
      expect(parseInt(position, 10)).toBeGreaterThanOrEqual(0);
    });
  });
});
