import { By, until, WebDriver } from "selenium-webdriver";

export const getElement = async (driver: WebDriver, selector: string) => {
  await driver.wait(until.elementLocated(By.css(selector)));
  return await driver.findElement(By.css(selector));
};
export const getElements = async (driver: WebDriver, selector: string) => {
  await driver.wait(until.elementLocated(By.css(selector)));
  return await driver.findElements(By.css(selector));
};
