import { getDriver } from './driver';
import { By, until, WebDriver } from 'selenium-webdriver';
import config from './spaceConfig';
import { getElements, getElement } from './helpers';

jest.setTimeout(60000);

describe('Homepage', () => {
  let driver: WebDriver;
  beforeAll(async () => {
    driver = await getDriver();
  });
  beforeEach(async () => {
    await driver.get(config.url);
  });
  afterEach(async () => {
    await driver.get('about:blank');
  });
  afterAll(async () => {
    await driver.quit();
  });

  it('should display basic article units', async () => {
    const articles = await getElements(driver, 'app-basic-article-unit');
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
    const article = await getElement(driver, 'app-basic-article-unit');
    const link = await article.findElement(By.css('a'));
    const href = await link.getAttribute('href');

    link.click();
    await driver.wait(until.elementLocated(By.css('app-basic-article-unit')));
    expect(await driver.getCurrentUrl()).toBe(href);
  });

  it('should display basic ad units', async () => {
    const ads = await getElements(driver, 'app-basic-ad-unit');
    expect(ads.length).toBeGreaterThan(0);
  });

  it('should display ad when video is clicked', async () => {
    // TODO: Need to force ads to play in test environment. See EX-505.
    const button = await getElement(driver, '.vjs-big-play-button');
    await button.click();

    const adVideoPlayer = driver.findElement(
      By.css('.vjs-ima3-ad-container video')
    );
    await driver.wait(until.elementIsVisible(adVideoPlayer), 6000);
    const adUrl = await adVideoPlayer.getAttribute('src');
    expect(adUrl).toBeTruthy();
  });

  it('should change video player url when selecting a video from playlist', async () => {
    const videoPlayer = await driver.findElement(By.css('.video-js video'));
    const initialUrl = await videoPlayer.getAttribute('src');

    const playlistItems = await driver.findElements(
      By.css('.vjs-playlist-item')
    );
    const randomPlaylistItem = playlistItems[2];
    await randomPlaylistItem.click();
    const newUrl = await videoPlayer.getAttribute('src');

    expect(newUrl).toBeTruthy();
    expect(initialUrl).not.toEqual(newUrl);
  });
});
