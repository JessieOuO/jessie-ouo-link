import { cp, mkdir, rm } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { readSiteConfig } from "../src/config/site.ts";
import { renderDocument } from "../src/document.tsx";
import { robots, sitemap } from "../src/seo/metadata.ts";

export const root = resolve(import.meta.dir, "..");
export const outputDirectory = resolve(root, "dist");

export async function buildSite(preview = false) {
  // Validate before removing the previous build.
  const config = readSiteConfig(Bun.env, preview);
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(resolve(root, "public"), outputDirectory, { recursive: true });
  // Keep fonts external: a CSS data URI would delay text and prevent independent caching.
  const fonts: { path: string; size: number }[] = [];
  let cssSource = await Bun.file(resolve(root, "src/styles/site.css")).text();
  for (const sourcePath of ["@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2"]) {
    const file = Bun.file(resolve(root, "node_modules", sourcePath));
    const bytes = await file.arrayBuffer();
    const hash = new Bun.CryptoHasher("sha256").update(bytes).digest("hex").slice(0, 12);
    const asset = `/assets/${basename(sourcePath, ".woff2")}-${hash}.woff2`;
    await Bun.write(resolve(outputDirectory, `.${asset}`), bytes);
    fonts.push({ path: resolve(outputDirectory, `.${asset}`), size: file.size });
    cssSource = cssSource.replace(`../../node_modules/${sourcePath}`, asset);
  }
  const cssInput = resolve(outputDirectory, "site.css");
  await Bun.write(cssInput, cssSource);
  const result = await Bun.build({
    entrypoints: [cssInput],
    outdir: outputDirectory,
    naming: "assets/[name]-[hash].[ext]",
    minify: true,
    target: "browser",
    external: ["/assets/*"],
  });
  await rm(cssInput);
  if (!result.success) throw new AggregateError(result.logs, "CSS build failed");
  const assetPath = (path: string) => path.replace(outputDirectory, "");
  const stylesheet = result.outputs.find((file) => file.path.endsWith(".css"));
  if (!stylesheet) throw new Error("Build did not emit a stylesheet");
  const client = await Bun.build({
    entrypoints: [resolve(root, "src/client/theme.ts")],
    target: "browser",
    format: "iife",
    minify: true,
  });
  if (!client.success) throw new AggregateError(client.logs, "Theme script build failed");
  const themeOutput = client.outputs[0];
  if (!themeOutput) throw new Error("Build did not emit the theme script");
  const themeScript = await themeOutput.text();
  const scriptHash = new Bun.CryptoHasher("sha256").update(themeScript).digest("base64");
  const headerFile = Bun.file(resolve(outputDirectory, "_headers"));
  await Bun.write(
    headerFile,
    (await headerFile.text()).replace("script-src 'none'", `script-src 'sha256-${scriptHash}'`),
  );
  const documentOptions = {
    config,
    stylesheet: assetPath(stylesheet.path),
    fonts: fonts.map((file) => assetPath(file.path)),
    themeScript,
  };
  await Bun.write(resolve(outputDirectory, "index.html"), renderDocument(documentOptions));
  await Bun.write(
    resolve(outputDirectory, "404.html"),
    renderDocument({ ...documentOptions, notFound: true }),
  );
  await Bun.write(resolve(outputDirectory, "robots.txt"), robots(config));
  const sitemapXml = sitemap(config);
  if (sitemapXml) await Bun.write(resolve(outputDirectory, "sitemap.xml"), sitemapXml);
  if (preview) {
    const headers = Bun.file(resolve(outputDirectory, "_headers"));
    await Bun.write(headers, `${await headers.text()}\n/*\n  X-Robots-Tag: noindex, nofollow\n`);
  }
  const htmlBytes = Bun.file(resolve(outputDirectory, "index.html")).size;
  const cssBytes = stylesheet.size;
  const fontBytes = fonts.reduce((sum, font) => sum + font.size, 0);
  // Enforce transfer budgets on uncompressed output, before CDN compression.
  const scriptBytes = themeOutput.size;
  if (htmlBytes > 12_000 || cssBytes > 12_000 || fontBytes > 80_000 || scriptBytes > 4_000) {
    throw new Error(`Page exceeds budget: HTML ${htmlBytes}, CSS ${cssBytes}, fonts ${fontBytes}`);
  }
  console.info(
    `${preview ? "Preview (noindex)" : "Production"} build: HTML ${htmlBytes} B (includes ${scriptBytes} B theme script), CSS ${cssBytes} B, fonts ${fontBytes} B`,
  );
  return documentOptions;
}

if (import.meta.main) await buildSite(Bun.argv.includes("--preview"));
