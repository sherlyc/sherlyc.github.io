import { getDriver } from './driver';
import { By, until, WebDriver } from 'selenium-webdriver';
import config from './spaceConfig';

describe('Homepage test', () => {
  let driver: WebDriver;
  beforeAll(async () => {
    driver = await getDriver();
  });
  afterEach(async () => {
    await driver.get('about:blank');
  });
  afterAll(async () => {
    await driver.quit();
  });

  it('should display basic article units', async () => {
    await driver.get(config.url);
    await driver.wait(until.elementLocated(By.css('app-content-block')));
    const contentBlocks = await driver.findElements(
      By.css('app-content-block')
    );
    expect(contentBlocks.length).toBeGreaterThan(0);
    for (const contentBlock of contentBlocks) {
      const article = await contentBlock.findElement(
        By.css('app-basic-article-unit')
      );
      expect(article).toBeTruthy();

      const content = await article.getText();
      expect(content.trim().length).toBeTruthy();

      const image = await article.findElement(By.css('img'));
      expect(image).toBeTruthy();
    }
  });

  it('should navigate to article page when articles are clicked', async () => {
    await driver.get(config.url);
    await driver.wait(until.elementLocated(By.css('app-content-block')));
    const firstContentBlock = await driver.findElement(
      By.css('app-content-block')
    );
    const link = await firstContentBlock.findElement(By.css('a'));
    const href = await link.getAttribute('href');

    link.click();
    await driver.wait(until.elementLocated(By.css('app-content-block')));
    expect(await driver.getCurrentUrl()).toBe(href);
  });
});
