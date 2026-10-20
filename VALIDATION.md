# Blog artwork update verification

Verified 2026-10-20 with Bun 1.4.3 and Chromium. This bounded update keeps the approved cute palette, replaces the hero character with the requested cat sitting on a crocodile from the owner’s blog, removes its caption and adds Blog beside GitHub. The production audit uses `https://jessie.example` as an unpublished test fixture; set the real `SITE_URL` before deployment.

## Checks

- Biome formatting/lint/check, including the React domain: passed.
- TypeScript 7 strict / ESNext: passed.
- Vitest: all 14 tests passed, including the updated Person structured data with the blog URL.
- Browser checks at 320, 390, 768 and 1440px, light and dark: passed. No horizontal overflow, browser console errors or axe WCAG A/AA / best-practice violations. Checked LinkedIn, GitHub and Blog destinations, successful artwork loading, keyboard/skip navigation, JavaScript disabled and HTTP 404 behavior.
- Desktop and mobile visual review: original blog artwork is intact and transparent, sky/clouds remain, matching yellow/sage fields appear behind it, and there is no visible image caption. Both header links fit at 320px. Dark mode adapts the background while retaining the artwork’s colors.
- No dependencies were added or changed. Existing Bun lockfile and pinned versions remain in place.

## Transfer and rendering

Production output: **5,451 bytes HTML**, **5,705 bytes CSS**, **39,128 bytes font**, **0 bytes executable browser JavaScript**. The self-hosted lossless WebP artwork variants are **37,164 bytes (480px)**, **51,958 bytes (640px)** and **86,846 bytes (960px)**; the browser chooses one using `srcset`/`sizes`, rather than downloading all variants. Image dimensions and the reserved illustration aspect ratio prevent layout shift. The image has high fetch priority and content-hashed immutable caching.

The social PNG was regenerated from the real composed page; it is not loaded by the homepage. The artwork is served locally, so homepage rendering does not depend on the blog server. Source/provenance is recorded in [ASSETS.md](ASSETS.md).

## Lighthouse mobile

Three consecutive production-build runs using default mobile throttling:

| Run | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| 1 | 100 | 100 | 100 | 100 |
| 2 | 100 | 100 | 100 | 100 |
| 3 | 100 | 100 | 100 | 100 |

FCP approximately **0.8s**, LCP **1.5s**, TBT **0ms**, CLS **0**. These are local lab measurements, not measurements of the eventual public domain. Reports and screenshots are reproducible through the existing browser/performance scripts and uploaded by CI. Automated accessibility tools do not constitute a complete human WCAG conformance assessment.

## Design scope

The real blog image supersedes the generated bunny and its wave interaction. No biography, job claims, additional sections or new primary actions were introduced. The existing flower wordmark, footer and favicon remain. [DESIGN.md](DESIGN.md) records the owner-directed composition and the historical Taste Skill context. This component update does not claim a full pass against the skill’s unrelated picture/motion quotas.
