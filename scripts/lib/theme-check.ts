import assert from "node:assert/strict";
import type { Browser } from "playwright-core";

export async function checkThemes(browser: Browser, url: URL) {
  const context = await browser.newContext({ colorScheme: "light" });
  try {
    const page = await context.newPage();
    const themeIs = (theme: string) =>
      page.waitForFunction((value) => document.documentElement.dataset.theme === value, theme);
    await page.goto(url.href);
    await themeIs("light");
    assert(await page.locator(".scene-sun").isVisible(), "Day scene should show a sun");
    assert(!(await page.locator(".scene-moon").isVisible()), "Day scene should hide the moon");
    await page.emulateMedia({ colorScheme: "dark" });
    await themeIs("dark");
    assert(await page.locator(".scene-moon").isVisible(), "Night scene should show a moon");

    const toggle = page.getByRole("button", { name: "Dark mode", exact: true });
    await toggle.click();
    await themeIs("light");
    assert.equal(await toggle.getAttribute("aria-pressed"), "false");
    assert.equal(await page.evaluate(() => localStorage.getItem("jessie-theme")), "light");
    await page.reload();
    await themeIs("light");
    assert.equal(
      await page.locator('meta[name="theme-color"]').first().getAttribute("content"),
      "#fcfaf5",
    );

    await toggle.focus();
    await page.keyboard.press("Space");
    await themeIs("dark");
    assert.equal(await toggle.getAttribute("aria-pressed"), "true");
    await page.emulateMedia({ colorScheme: "light" });
    await themeIs("dark");

    const otherTab = await context.newPage();
    await otherTab.goto(url.href);
    assert.equal(await otherTab.locator("html").getAttribute("data-theme"), "dark");
    await otherTab.getByRole("button", { name: "Dark mode", exact: true }).click();
    await themeIs("light");
    await otherTab.evaluate(() => localStorage.clear());
    await page.emulateMedia({ colorScheme: "dark" });
    await themeIs("dark");
    console.info(
      "Theme: system changes, click/keyboard toggle, reload persistence, cross-tab synchronization, and reset passed.",
    );
  } finally {
    await context.close();
  }

  const invalid = await browser.newContext({
    colorScheme: "dark",
    storageState: {
      cookies: [],
      origins: [{ origin: url.origin, localStorage: [{ name: "jessie-theme", value: "invalid" }] }],
    },
  });
  try {
    const page = await invalid.newPage();
    await page.goto(url.href);
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  } finally {
    await invalid.close();
  }

  const blocked = await browser.newContext({ colorScheme: "light" });
  try {
    await blocked.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() {
          throw new DOMException("Storage blocked", "SecurityError");
        },
      });
    });
    const page = await blocked.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(url.href);
    await page.getByRole("button", { name: "Dark mode", exact: true }).click();
    assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
    assert.deepEqual(errors, []);
    console.info("Theme: invalid preferences and unavailable storage degrade gracefully.");
  } finally {
    await blocked.close();
  }

  for (const colorScheme of ["light", "dark"] as const) {
    const context = await browser.newContext({ javaScriptEnabled: false, colorScheme });
    try {
      const page = await context.newPage();
      await page.goto(url.href);
      assert(!(await page.getByRole("button", { name: "Dark mode", exact: true }).isVisible()));
      assert(await page.locator(colorScheme === "dark" ? ".scene-moon" : ".scene-sun").isVisible());
      assert.equal(await page.locator("html").getAttribute("data-theme"), null);
    } finally {
      await context.close();
    }
  }
  console.info("Theme: system colors and sun/moon scenes still work without JavaScript.");
}
