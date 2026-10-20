import { chromium } from "playwright-core";

export function launchBrowser() {
  return chromium.launch({
    executablePath: Bun.env.CHROME_PATH ?? "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
}
