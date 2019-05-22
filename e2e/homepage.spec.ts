import { getDriver } from './driver';
import { By, until, WebDriver } from 'selenium-webdriver';
import config from './spaceConfig';

describe('Homepage', () => {
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
    await driver.wait(until.elementLocated(By.css('app-basic-article-unit')));
    const articles = await driver.findElements(
      By.css('app-basic-article-unit')
    );
    expect(articles.length).toBeGreaterThan(0);

    for (const article of articles) {
      expect(article).toBeTruthy();

      const content = await article.getText();
      expect(content.trim().length).toBeTruthy();

      const image = await article.findElement(By.css('img'));
      expect(image).toBeTruthy();
    }
  });

  it('should navigate to article page when articles are clicked', async () => {
    await driver.get(config.url);
    await driver.wait(until.elementLocated(By.css('app-basic-article-unit')));
    const article = await driver.findElement(By.css('app-basic-article-unit'));
    const link = await article.findElement(By.css('a'));
    const href = await link.getAttribute('href');

    link.click();
    await driver.wait(until.elementLocated(By.css('app-basic-article-unit')));
    expect(await driver.getCurrentUrl()).toBe(href);
  });

  it('should display basic ad units', async () => {
    await driver.get(config.url);
    await driver.wait(until.elementLocated(By.css('app-basic-ad-unit')));
    const ads = await driver.findElements(By.css('app-basic-ad-unit'));
    expect(ads.length).toBeGreaterThan(0);
  });

  it.only('should display ad when video is clicked', async () => {
    await driver.get(config.url);
    await driver.wait(until.elementLocated(By.css('app-video-unit')));

    // NOT WORKING - click on play button

    // const playButton = await driver.findElement(By.css('.vjs-big-play-button'));
    // playButton.click();

    // Check ad is displayed
  });
});
