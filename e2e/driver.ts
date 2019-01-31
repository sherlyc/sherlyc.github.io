import { Builder, Capabilities } from 'selenium-webdriver';

export async function getDriver() {
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('chromeOptions', {
    args: ['--headless', '--disable-gpu']
  });
  return await new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();
}
