# QA report — Math Sikney consumer site

Date: 2026-11-24  
Build: `npm run build` — completed, static output in `dist/`  
Local preview: `http://127.0.0.1:4321/`  
Scope: consumer-facing rewrite, removal of version/build details, and SEO pass

## What changed

- Removed the `#roadmap` and `#tech` sections, version chips, release labels, version numbers, version codes, package ID, SHA-256, signature details, SDK numbers, build log and test/lint counts from the rendered page.
- Rewrote the hero, loop, demo, download, ranks, proof, privacy and footer copy for a general audience.
- Added a visible seven-question FAQ with matching `FAQPage` structured data.
- Renamed the download to the unversioned `/downloads/math-sikney.apk` and updated every download link.
- Added canonical, `og:url`, absolute social image URLs, a robots meta tag, `/sitemap.xml`, `/robots.txt`, `/site.webmanifest`, and a JSON-LD graph (`WebSite`, `SoftwareApplication`, `Organization`, `FAQPage`).
- Regenerated `og.png` without version text.
- Fixed the footer logo sizing and made all footer links at least 44 × 44 px.

## Responsive layout

DOM audits at **360, 768 and 1440 px** with a mobile viewport at 360 and 768:

| Width | `documentElement.scrollWidth` | Viewport | Horizontal page overflow | Tap targets under 44 px | `h1` count |
|---:|---:|---:|---|---:|---:|
| 360 | 360 | 360 | none | 0 | 1 |
| 768 | 768 | 768 | none | 0 | 1 |
| 1440 | 1440 | 1440 | none | 0 | 1 |

The proof gallery remains an intentional horizontal scroller and does not widen the document. The only negative-offset element is the demo's decorative mask plane, which is clipped inside the panel and does not create page overflow.

The download card stacks below the copy at 360/768 and sits in the right column at 1440. The FAQ becomes a single column below 900 px. The footer nav collapses to a full-width row on small screens.

## Screenshots

30 section captures are saved in `qa-captures/`:

- 10 sections × 360, 768 and 1440 px
- `intro`, `loop`, `demo`, `download`, `modes`, `ranks`, `proof`, `privacy`, `faq`, `footer`
- Captured through Chrome DevTools Protocol at device scale 1, using the full section height
- Contact sheets: `qa-captures/sheet-360.png` and `qa-captures/sheet-1440.png`
- Raw audit data: `qa-captures/audit.json`

The captures were reviewed at all three widths. The hero, mode list, two-column rank ladder at 360 px, proof strip, FAQ and footer render as intended.

## Browser checks

- Lighthouse (desktop, local server): **Accessibility 1.00**, **Best Practices 1.00**, **SEO 1.00**. Reports: `qa-captures/lighthouse.json` and `qa-captures/lighthouse.html`.
- Console errors and warnings: none.
- Failed requests: none. All document, image, font, stylesheet and script requests completed.
- All screenshots carry descriptive `alt` text.
- All in-page `href="#…"` targets resolve.
- JSON-LD parses as a `WebSite` + `SoftwareApplication` + `Organization` graph plus a `FAQPage` whose questions and answers match the visible FAQ.
- `/og.png` is a 1200 × 630 PNG with no version text and is referenced by absolute `og:image` and `twitter:image` URLs.
- `/apple-touch-icon.png` is a 180 × 180 PNG and is linked with `sizes="180x180"`.
- Local preview does not request `/_vercel/insights/script.js`; analytics stays gated on `VERCEL === "1"`.
- No tap target under 44 × 44 px after the footer fixes.

## SEO checks

- Title: “Math Sikney — offline mental math trainer for Android” (53 characters)
- Meta description: 154 characters, includes the brand, platform and value proposition
- Canonical: `https://math-sikney-site.vercel.app/` (default origin; override with `SITE_URL`)
- `/sitemap.xml` → **200**, one URL with `lastmod`, `changefreq` and `priority`
- `/robots.txt` → **200**, allows all crawlers and points at the sitemap
- `/site.webmanifest` → **200**, `application/manifest+json`
- `og:url`, `og:image`, `twitter:image` are absolute URLs
- No version, package, hash, SDK or build-log strings remain in `dist/index.html`

## APK download

- URL: `/downloads/math-sikney.apk`
- Local preview: **200**, 2,395,324 bytes
- Old versioned URL `/downloads/math-sikney-1.2.0.apk`: **404**, as intended
- SHA-256: `0d3f5e0085c287d38fd6cc814ced9e45a595063c112d87f483b2fa035190d4ef` — unchanged after the rename
- Package: `app.mathsikney.mmv`
- Version: `1.2.0`, version code `3`
- Min SDK 26 / target SDK 36
- Signature: APK Signature Scheme **v2 + v3**, verified with `apksigner`
- Permissions: `VIBRATE` plus the generated dynamic-receiver permission; no `INTERNET`
- `vercel.json` sets `application/vnd.android.package-archive`, `Content-Disposition: attachment`, and a one-hour cache header for APKs. The local Astro preview does not add the MIME type; Vercel does.

## Links

- GitHub: `https://github.com/approxy-dev` — download card and footer
- Feedback: `mailto:approxydev@gmail.com` — download card and footer
- The download CTA appears in the topbar, hero, side rail, download section and footer.

## Demo

- Full five-question round completed with the text input: `559`, `405`, `713`, `605`, `367` → **5 of 5 held**.
- Every answer produced the correct reveal, digit match and `Exact` classification.
- The summary appeared with five filled beads and the updated copy.
- The demo still uses the app's own view, answer and peek timings internally; those timings are no longer printed in the page copy.
- Reduced-motion support remains in code: the mask shutter drops from 260 ms to 30 ms and CSS collapses animations/transitions.

## Not verifiable in this environment

- A deployed Vercel URL. No Vercel CLI or authentication is available here. The canonical origin defaults to `https://math-sikney-site.vercel.app`; set `SITE_URL` if the real domain differs.
- Mobile Lighthouse performance and LCP under emulated network/CPU throttling.
- High-DPI (2×/3×) rendering.
- Real `prefers-reduced-motion: reduce` media emulation.
- Installing and launching the APK on a connected Android device. Signatures, manifest, package and permissions were verified statically with `apksigner` and `aapt2`.
- A Play Store listing. This is a direct signed APK, not a store release.

## Signing

The release APK is signed with a self-signed key created for this project. Keep the keystore and credentials private. Future updates must use the same key, or Android will reject them as an update. The keystore and credentials live outside the site folder at `E:\Math-Sikney-main\Math-Sikney-main\.signing\` and are ignored by the app repository.
