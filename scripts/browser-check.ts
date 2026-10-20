import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { profile } from "../src/config/site.ts";
import { root } from "./build.ts";
import { launchBrowser } from "./lib/browser.ts";
import { startStaticServer } from "./lib/static-server.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const server = await startStaticServer();
const browser = await launchBrowser();
const screenshots = resolve(root, "reports/browser");
await mkdir(screenshots, { recursive: true });
try {
  for (const width of [320, 390, 768, 1440]) {
    for (const colorScheme of ["light", "dark"] as const) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.goto(server.url.href);
      await page.evaluate(() => document.fonts.ready);
      assert((await page.locator("h1").innerText()).includes(profile.name), "Missing title");
      assert(
        (await page.getByRole("link", { name: "Connect on LinkedIn" }).getAttribute("href")) ===
          profile.linkedin,
        "Wrong LinkedIn URL",
      );
      assert(
        (await page.getByRole("link", { name: "GitHub", exact: true }).getAttribute("href")) ===
          profile.github,
        "Wrong GitHub URL",
      );
      assert(
        (await page.getByRole("link", { name: "Blog", exact: true }).getAttribute("href")) ===
          profile.blog,
        "Wrong blog URL",
      );
      assert(
        await page
          .locator(".blog-artwork")
          .evaluate(
            (element) =>
              element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
          ),
        "Blog artwork did not load",
      );
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `Overflow at ${width}`,
      );
      assert(
        (await page.locator('script:not([type="application/ld+json"])').count()) === 0,
        "Executable JavaScript shipped",
      );
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
        .analyze();
      assert(results.violations.length === 0, JSON.stringify(results.violations, null, 2));
      assert(errors.length === 0, errors.join("\n"));
      await page.keyboard.press("Tab");
      assert(
        await page
          .getByRole("link", { name: "Skip to content" })
          .evaluate((link) => link === document.activeElement),
        "Skip link is not first keyboard target",
      );
      await page.keyboard.press("Enter");
      assert(
        await page.locator("main").evaluate((main) => main === document.activeElement),
        "Skip link did not focus main",
      );
      await page.screenshot({
        path: resolve(screenshots, `${width}-${colorScheme}.png`),
        fullPage: true,
      });
      console.info(
        `${width}px ${colorScheme}: no overflow, no WCAG violations, keyboard navigation passed`,
      );
      await context.close();
    }
  }
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(server.url.href);
  assert(
    await page.getByRole("link", { name: "Connect on LinkedIn" }).isVisible(),
    "Primary link requires JavaScript",
  );
  assert(await page.locator("h1").isVisible(), "Content requires JavaScript");
  const missing = await page.goto(new URL("/missing-page", server.url).href);
  assert(missing?.status() === 404, "Missing page should return HTTP 404");
  assert(
    (await page.getByRole("link", { name: "Back to Jessie’s home" }).getAttribute("href")) === "/",
    "404 has no route home",
  );
  console.info("JavaScript disabled and HTTP 404 checks passed.");
} finally {
  await browser.close();
  server.stop(true);
}
