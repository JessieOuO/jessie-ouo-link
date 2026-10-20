import { profile, type SiteConfig } from "../config/site.ts";

export function personData(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.handle,
    ...(config.origin ? { url: `${config.origin}/` } : {}),
    sameAs: [profile.linkedin, profile.github],
  };
}

export function robots(config: SiteConfig): string {
  if (!config.indexable || !config.origin) return "User-agent: *\nDisallow: /\n";
  return `User-agent: *\nAllow: /\n\nSitemap: ${config.origin}/sitemap.xml\n`;
}

export function sitemap(config: SiteConfig): string | null {
  if (!config.indexable || !config.origin) return null;
  const escapedOrigin = config.origin
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapedOrigin}/</loc></url></urlset>\n`;
}
