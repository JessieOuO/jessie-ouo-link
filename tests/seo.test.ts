import { describe, expect, it } from "vitest";
import { readSiteConfig } from "../src/config/site.ts";
import { renderDocument } from "../src/document.tsx";
import { robots, sitemap } from "../src/seo/metadata.ts";

const config = readSiteConfig({ SITE_URL: "https://jessie.example" });
const options = { config, stylesheet: "/assets/site-test.css", fonts: ["/assets/font-test.woff2"] };

describe("pre-rendered HTML and search metadata", () => {
  it("ships the primary destination and identity without executable JavaScript", () => {
    const html = renderDocument(options);
    expect(html).toContain("<!doctype html>");
    expect(html.match(/<h1[ >]/g)).toHaveLength(1);
    expect(html).toContain('href="https://www.linkedin.com/in/jessie-hsieh-ouo"');
    expect(html).toContain('href="https://github.com/JessieOuO"');
    expect(html).not.toMatch(/<script(?! type="application\/ld\+json")/);
    expect(html).not.toContain('type="module"');
  });

  it("uses the same production origin for canonical, social cards and structured data", () => {
    const html = renderDocument(options);
    expect(html).toContain('<link rel="canonical" href="https://jessie.example/"');
    expect(html).toContain('property="og:url" content="https://jessie.example/"');
    expect(html).toContain('property="og:image" content="https://jessie.example/social.png"');
    const structuredText = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    expect(structuredText).toBeDefined();
    const data: unknown = JSON.parse(structuredText ?? "");
    expect(data).toMatchObject({
      "@type": "Person",
      name: "Jessie Hsieh",
      url: "https://jessie.example/",
      sameAs: ["https://www.linkedin.com/in/jessie-hsieh-ouo", "https://github.com/JessieOuO"],
    });
  });

  it("excludes preview and error pages from search without a misleading canonical", () => {
    for (const html of [
      renderDocument({ ...options, config: readSiteConfig({}, true) }),
      renderDocument({ ...options, notFound: true }),
    ]) {
      expect(html).toContain('name="robots" content="noindex, nofollow"');
      expect(html).not.toContain('rel="canonical"');
    }
  });

  it("publishes a consistent crawl policy and sitemap in production only", () => {
    expect(robots(config)).toContain("Sitemap: https://jessie.example/sitemap.xml");
    expect(sitemap(config)).toContain("<loc>https://jessie.example/</loc>");
    const preview = readSiteConfig({}, true);
    expect(robots(preview)).toBe("User-agent: *\nDisallow: /\n");
    expect(sitemap(preview)).toBeNull();
  });
});
