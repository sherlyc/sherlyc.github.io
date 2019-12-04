import { LaunchOptions } from "puppeteer";

export default {
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
} as LaunchOptions;
