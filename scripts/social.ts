import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { buildSite, root } from "./build.ts";
import { launchBrowser } from "./lib/browser.ts";
import { startStaticServer } from "./lib/static-server.ts";

await buildSite(true);
const server = await startStaticServer();
const browser = await launchBrowser();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    colorScheme: "light",
    bypassCSP: true,
  });
  await page.goto(server.url.href);
  await page.addStyleTag({
    content:
      ".page{width:1200px;min-height:630px;padding:0}.masthead,.footer{display:none}.card{width:1200px;height:630px;margin:0}.card-copy{padding:56px}.card h1{font-size:150px}.signature{font-size:200px}.card{animation:none}",
  });
  await page.evaluate(() => document.fonts.ready);
  await mkdir(resolve(root, "public"), { recursive: true });
  await page.screenshot({ path: resolve(root, "public/social.png") });
  console.info("Created public/social.png (1200 × 630).");
} finally {
  await browser.close();
  server.stop(true);
}
