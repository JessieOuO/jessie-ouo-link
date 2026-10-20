# OuO says hello

The owner rejected the first editorial calling card and explicitly asked for a cuter design. That correction is the current brief. The original [Taste Skill](https://www.tasteskill.dev/) draw (The page is the object, seed 2097484368) remains in `.taste-skill/direction.json` as historical evidence; its industrial typography and brass palette are superseded, not silently followed.

## Idea and visual direction

The OuO handle becomes the face of a small blue bunny: two eyes and a little u-shaped smile. It waves hello while holding a heart-sealed letter, with a small pink star beside it. The illustration belongs to this identity rather than borrowing a stock portrait or a generic product graphic.

Cream paper, dusty blue ink, powder blue, blush pink and a little butter yellow make the page feel warm and friendly. Nunito supplies rounded letterforms at every size. One generous pill button opens the actual LinkedIn profile. The secondary GitHub link remains in the header. There are no extra marketing sections, invented career claims, counters or testimonials.

Desktop pairs the introduction with the large illustration on one continuous ground. On a phone, the introduction and LinkedIn action appear first, followed by the character. System dark mode keeps the same pastel character and changes the surrounding ground to midnight blue.

## Illustration and motion

`OuoIllustration` is original inline SVG, built specifically for this page. `FlowerMark` is a small reusable SVG for the wordmark and sign-off. The favicon carries the same bunny face. No raster character assets, stock images, illustration libraries or third-party image requests are required. The social PNG is generated from the real page and is not downloaded by the homepage.

CSS animates the bunny’s gentle bob, hand wave and greeting bubble using transforms. The greeting settles within five seconds rather than consuming idle animation frames indefinitely. Hovering or focusing the LinkedIn action gives another little wave. Controls have simple press/hover feedback. `prefers-reduced-motion` removes the movement; no script is required for the content or the links.

## Skill application and departures

Taste’s original uppercase poster direction was the wrong fit for the owner. The new direction follows the owner’s specific correction and retains the useful craft checks: clear first-screen identity, short headlines, one main action, truthful content, responsive composition, readable contrast and visual review in a real browser.

The owner’s cute direction takes precedence over the old dealt palette and fonts. The cream ground, flowers and character drawing are intentional. The skill’s minimum four raster pictures, eight moving elements and footage requirement would add irrelevant media to this small page, so they are not applied. Inspector findings are recorded honestly in [VALIDATION.md](VALIDATION.md); no full skill pass is claimed.

All pictures are original drawings. There are no found assets to credit and no sample career details to replace. The real production domain is still supplied through `SITE_URL` at deployment.
