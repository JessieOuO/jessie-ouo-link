import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { root } from "./build.ts";
import { startStaticServer } from "./lib/static-server.ts";

const server = await startStaticServer();
const chrome = await launch({
  chromePath: Bun.env.CHROME_PATH ?? "/usr/bin/chromium",
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
});
const reportDirectory = resolve(root, "reports/lighthouse");
await mkdir(reportDirectory, { recursive: true });
try {
  const scores: number[] = [];
  for (let run = 1; run <= 3; run++) {
    const result = await lighthouse(server.url.href, {
      port: chrome.port,
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      logLevel: "error",
    });
    if (!result) throw new Error("Lighthouse returned no report");
    const reports = Array.isArray(result.report) ? result.report : [result.report];
    for (const [index, extension] of ["html", "json"].entries()) {
      await Bun.write(resolve(reportDirectory, `mobile-${run}.${extension}`), reports[index] ?? "");
    }
    const categories = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round((value.score ?? 0) * 100),
      ]),
    );
    scores.push(categories.performance ?? 0);
    console.info(`Mobile run ${run}: ${JSON.stringify(categories)}`);
    for (const key of ["accessibility", "best-practices", "seo"]) {
      if ((categories[key] ?? 0) < 100)
        throw new Error(`Lighthouse ${key} is below 100; inspect reports/lighthouse`);
    }
  }
  const median = scores.sort((a, b) => a - b)[1] ?? 0;
  if (median < 95) throw new Error(`Median mobile performance ${median} is below 95`);
  console.info(`Median mobile performance: ${median}/100. Reports: ${reportDirectory}`);
} finally {
  await chrome.kill();
  server.stop(true);
}
