import { Builder, Capabilities } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FirefoxOptions } from "selenium-webdriver/firefox";
import { startBrowserStackLocal } from "./browserstack.local";
import "./fast-selenium.ts";

async function buildSpecificBrowserDriver(browser: string) {
  const account = process.env.BS_ACCOUNT;
  const key = process.env.BS_KEY;
  const build = process.env.SPADE_VERSION || "SNAPSHOT";

  if (!key || !account) {
    throw new Error("Provide Browser Stack BS_ACCOUNT and BS_KEY env vars.");
  }

  await startBrowserStackLocal(key, browser);

  let capabilities: any = {
    "browserstack.local": "true",
    "browserstack.user": account,
    "browserstack.key": key,
    "browserstack.debug": true,
    "browserstack.localIdentifier": browser,
    pageLoadStrategy: "eager",
    project: "SPADE",
    build,
    name: "smoke-test"
  };

  switch (browser) {
    case "CHROME":
      capabilities = {
        ...capabilities,
        browserName: "Chrome",
        browser_version: "62.0",
        os: "Windows",
        os_version: "10",
        resolution: "1024x768",
        chromeOptions: {
          args: ["--disable-plugins"]
        }
      };
      break;
    case "IE11":
      capabilities = {
        ...capabilities,
        browserName: "IE",
        browser_version: "11.0",
        os: "Windows",
        os_version: "8.1",
        resolution: "1024x768"
      };
      break;
    case "FIREFOX":
      capabilities = {
        ...capabilities,
        browserName: "Firefox",
        browser_version: "67.0",
        os: "Windows",
        os_version: "10",
        resolution: "1024x768"
      };
      break;
    case "SAFARI":
      capabilities = {
        ...capabilities,
        browserName: "Safari",
        browser_version: "12.0",
        os: "OS X",
        os_version: "Mojave",
        resolution: "1024x768"
      };
      break;
    case "EDGE":
      capabilities = {
        ...capabilities,
        browserName: "Edge",
        browser_version: "18.0",
        os: "Windows",
        os_version: "10",
        resolution: "1024x768"
      };
      break;
    case "IOS":
      capabilities = {
        ...capabilities,
        browserName: "iPhone",
        device: "iPhone 8",
        realMobile: "true",
        os_version: "11"
      };
      break;
    case "ANDROID":
      capabilities = {
        ...capabilities,
        browserName: "android",
        device: "Samsung Galaxy S7",
        realMobile: "true",
        os_version: "6.0"
      };
      break;
    default:
      throw new Error(`Browser [${browser}] not supported`);
  }

  return new Builder()
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(capabilities)
    .build();
}

const localBrowserDrivers: { [key in string]: Function } = {
  CHROME: () => {
    const chromeCapabilities = new ChromeOptions()
      .headless()
      .addArguments("--disable-gpu");
    return new Builder()
      .usingServer("http://chrome:4444/wd/hub")
      .withCapabilities(chromeCapabilities)
      .build();
  },
  FIREFOX: () => {
    const firefoxCapabilities = new FirefoxOptions().headless();
    return new Builder()
      .usingServer("http://firefox:4444/wd/hub")
      .withCapabilities(firefoxCapabilities)
      .build();
  }
};

async function buildDefaultDriver(browser: string | undefined) {
  const defaultBuilder = localBrowserDrivers["CHROME"];
  const driverBuilder = browser
    ? localBrowserDrivers[browser] || defaultBuilder
    : defaultBuilder;
  return driverBuilder();
}

export async function getDriver() {
  if (process.env.E2E_BROWSER) {
    return buildSpecificBrowserDriver(process.env.E2E_BROWSER);
  }
  return buildDefaultDriver(process.env.LOCAL_BROWSER);
}
