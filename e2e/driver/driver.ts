import { Builder, Capabilities } from "selenium-webdriver";
import { startBrowserStackLocal } from "./browserstack.local";
import "./fast-selenium.ts";

async function buildSpecificBrowserDriver(browser: string) {
  const account = process.env.BS_ACCOUNT;
  const key = process.env.BS_KEY;

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
    name: "SPADE"
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

  return await new Builder()
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(capabilities)
    .build();
}

async function buildDefaultDriver() {
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set("chromeOptions", {
    args: ["--headless", "--disable-gpu"]
  });
  return await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();
}

export async function getDriver() {
  if (process.env.E2E_BROWSER) {
    return await buildSpecificBrowserDriver(process.env.E2E_BROWSER);
  }

  return await buildDefaultDriver();
}
