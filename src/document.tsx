import { renderToStaticMarkup } from "react-dom/server";
import type { SiteConfig } from "./config/site.ts";
import { profile } from "./config/site.ts";
import { HomePage } from "./pages/home.tsx";
import { NotFoundPage } from "./pages/not-found.tsx";
import { personData } from "./seo/metadata.ts";

type DocumentOptions = Readonly<{
  config: SiteConfig;
  stylesheet: string;
  fonts: readonly string[];
  notFound?: boolean;
}>;

export function renderDocument({ config, stylesheet, fonts, notFound = false }: DocumentOptions) {
  const title = notFound ? "Page not found | Jessie Hsieh" : "Jessie Hsieh (OuO) | Personal Home";
  const canonical = !notFound && config.origin ? `${config.origin}/` : null;
  return `<!doctype html>${renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={profile.description} />
        <meta name="author" content={profile.name} />
        <meta
          name="robots"
          content={config.indexable && !notFound ? "index, follow" : "noindex, nofollow"}
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#fcfaf5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#202938" media="(prefers-color-scheme: dark)" />
        {canonical && <link rel="canonical" href={canonical} />}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {fonts.map((font) => (
          <link
            key={font}
            rel="preload"
            href={font}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
        <link rel="stylesheet" href={stylesheet} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={profile.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={profile.description} />
        {canonical && <meta property="og:url" content={canonical} />}
        {config.origin && <meta property="og:image" content={`${config.origin}/social.png`} />}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Jessie Hsieh’s homepage with OuO, a smiling blue bunny waving hello"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={profile.description} />
        {config.origin && <meta name="twitter:image" content={`${config.origin}/social.png`} />}
        {!notFound && (
          <script type="application/ld+json">
            {JSON.stringify(personData(config)).replaceAll("<", "\\u003c")}
          </script>
        )}
      </head>
      <body>{notFound ? <NotFoundPage /> : <HomePage />}</body>
    </html>,
  )}`;
}
