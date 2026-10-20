# A little corner of Jessie’s internet

The current brief preserves the soft palette, rounded Nunito typography and the owner’s cat-on-a-crocodile artwork. The scenery now has a recognizable sun in light mode and a crescent moon with stars in dark mode. A header button switches both the page and the scene.

## Composition and artwork

The exact requested illustration comes from the Test Automation section of [Jessie’s blog](https://blog.jessie-ouo.link/). Its cream/yellow cat and green crocodile sit over the existing sky, clouds and pale sage meadow. The daytime sun has soft round rays; at night it becomes a cream crescent with a few small stars. These are decorative SVG shapes, synchronized with the current page theme. The original raster artwork is unchanged.

`BlogIllustration` layers a decorative SVG background with the original transparent artwork. It has meaningful image alt text and no visible text underneath. The art is resized into 480, 640 and 960px lossless WebP variants and served locally with responsive selection, high fetch priority and immutable content-hashed filenames. The full transparent canvas is retained. Source details are in [ASSETS.md](ASSETS.md).

The original bunny, letter, star and their waving animation are removed from the hero. The page keeps its short entrance and control feedback with reduced-motion support. The small existing flower wordmark and footer remain unchanged. The existing favicon is retained.

On a phone the text/action come first, followed by the image. GitHub, Blog and the 44px theme button fit at 320px; small-screen header spacing adjusts to accommodate the extra control. Light mode shows a moon button, and dark mode shows a sun button. The button has a stable accessible label and `aria-pressed` state, and works with keyboard and touch.

With no saved preference, the page follows live system changes. Clicking saves a manual preference; it persists across reloads and syncs across tabs. A tiny bundled TypeScript enhancement applies the preference before the stylesheet, avoiding a flash of the opposite theme. It needs no React runtime. System colors and the matching scene remain available without JavaScript, with the inactive button hidden. The only new script is permitted through a build-generated CSP hash.

## Taste Skill context

The original [Taste Skill](https://www.tasteskill.dev/) draw in `.taste-skill/direction.json` belongs to the first editorial attempt and is historical, superseded by the owner’s cute direction. This update is a bounded change within that approved direction, not a new random draw. The retained craft principles are clear identity, short headlines, one primary action, truthful content, accessible contrast, responsive layout and review in a real browser.

The earlier minimum-four-images/eight-moving-elements/video quotas remain inapplicable to this small, performance-focused personal page. No full inspector pass is claimed. The current visual intent is one recognizable image selected by the owner, with a few matching color fields and no image caption.
