import { getDriver } from './driver';
import { By, Key, until, WebDriver } from 'selenium-webdriver';

describe('do something dummy', () => {
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

  it('should return "Stuff.co.nz" as first result in google when search for stuff', async () => {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('stuff', Key.RETURN);
    await driver.wait(until.titleIs('stuff - Google Search'), 1000);
    const h3s = await driver.findElements(By.css('h3'));
    const firstLinkText = await h3s[0].getText();
    expect(firstLinkText.startsWith('Stuff.co.nz')).toBeTruthy();
  });
});
