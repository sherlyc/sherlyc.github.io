import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getLogoText() {
    return element(by.css('app-root span.logo')).getText();
  }
}
