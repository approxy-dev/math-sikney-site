# QA report — Math Sikney 1.2.0 launch site

Date: 2026-11-24  
Build: `npm run build` — completed, static output in `dist/`  
Local preview: `http://127.0.0.1:4321/`  
Release shown: Math Sikney **1.2.0**, version code **3**

## What was verified

### Responsive layout
DOM audits at **360, 768 and 1440 px**:

| Width | `documentElement.scrollWidth` | `clientWidth` | Tap targets under 44 px | Horizontal page overflow |
|---:|---:|---:|---:|---|
| 360 | 345 | 345 | 0 | none |
| 768 | 753 | 753 | 0 | none |
| 1440 | 1425 | 1425 | 0 | none |

The proof gallery is an intentional horizontal scroller. It does not widen the document, and it now has a right-edge fade, a “11 captures · swipe or scroll” hint, and an end-state class that removes the fade at the end.

The new `#download` section was checked at all three widths: no child overflows, the two CTAs are 52 px tall, the SHA-256 value wraps at 360 px, and the package card stacks below the copy at 360/768 and sits in the right column at 1440.

### Screenshots
33 section captures are saved in `qa-captures/`:

- 11 sections × 360 px, 768 px and 1440 px
- `intro`, `loop`, `demo`, `download`, `modes`, `ranks`, `proof`, `privacy`, `roadmap`, `tech`, `footer`
- Captured with a fixed-width iframe harness at device scale 1. The 360/768 captures use the full section height; the 1440 captures use a 900 px slice or the full section when taller.

The captures were reviewed visually at all three widths. The download section, 8-item rail, long SHA value, proof fade/hint and the text-only Devanagari note all render as intended.

### Browser checks
- Lighthouse (desktop, local server): **Accessibility 1.00**, **Best Practices 1.00**, **SEO 1.00**. Reports: `qa-captures/lighthouse.json` and `qa-captures/lighthouse.html`.
- Console errors: none.
- Failed requests: none. All image, font, stylesheet and script requests completed.
- All 12 images have `alt` text and load successfully; the 11 proof captures load after the strip is scrolled or approached.
- All in-page `href="#…"` targets resolve.
- JSON-LD parses as a single `SoftwareApplication` object with `softwareVersion: "1.2.0"` and `sameAs: https://github.com/approxy-dev`.
- `/og.png` is a 1200 × 630 PNG and is referenced by `og:image` with type, width, height and alt.
- `/apple-touch-icon.png` is a 180 × 180 PNG and is linked with `sizes="180x180"`.
- Local preview does not request `/_vercel/insights/script.js`; analytics is gated on `VERCEL === "1"`.
- Contrast audit across the page at all three widths: no text below 4.5:1 (or 3:1 for large text).
- No tap target under 44 × 44 px.

### APK download
- URL: `/downloads/math-sikney-1.2.0.apk`
- Local preview: **200**, `Content-Length: 2,395,324`
- SHA-256: `0d3f5e0085c287d38fd6cc814ced9e45a595063c112d87f483b2fa035190d4ef`
- Package: `app.mathsikney.mmv`
- Version: `1.2.0`, version code `3`
- Min SDK 26 / target SDK 36
- Signature: APK Signature Scheme **v2 + v3**, verified with `apksigner`
- Permissions: `VIBRATE` plus the generated dynamic-receiver permission; no `INTERNET`
- `vercel.json` sets `application/vnd.android.package-archive`, `Content-Disposition: attachment`, and a one-hour cache header for APKs. The local Astro preview does not add the MIME type; Vercel does.

### Links
- GitHub: `https://github.com/approxy-dev` — present in the download card and footer.
- Feedback: `mailto:approxydev@gmail.com` — present in the download card and footer.
- The download CTA appears in the topbar, hero, side rail, download section and footer.

### Demo
- Full five-question round completed: `559`, `405`, `713`, `605`, `367` → **5 of 5 held**, summary shown.
- Question 2 used the on-screen keypad; the other four used the text input.
- Each answer produced the correct reveal, digit match, type and score.
- “Go again” restarts at `01 / 05`; `Escape` returns to `Ready` at `00 / 05`.
- The countdown uses the app’s 3.15 s view and 11 s answer timings. The in-app QA pane throttles `requestAnimationFrame`, so the full-round check used a timer-backed rAF shim. The single-question check also passed without the shim in a rendering tab.
- Reduced-motion support remains in code: the mask shutter drops from 260 ms to 30 ms and CSS collapses animations/transitions.

## Changes made for this release

- Removed the improperly rendered Nepali dashboard screenshot and its import.
- Replaced it with a text-only Devanagari language note; no substitute screenshot is claimed.
- Added two real 1.2.0 captures: `stack-five-phone.png` (Stack Challenge) and `stack-golden-receipt.png` (score receipt).
- Updated hero, modes, proof, privacy, roadmap, tech, footer, metadata and JSON-LD from 1.1.0-in-development to 1.2.0 complete.
- Added the `#download` section, APK package card, SHA-256, size and signature details.
- Added the GitHub and feedback email links.
- Added `vercel.json` with security headers, immutable asset caching, and APK MIME/cache rules.
- Added `README.md`, `.gitignore`, a capture harness and an OG card source.
- Added the proof strip fade, scroll hint and end-state handling.
- Added an eager-load fallback for proof images when the strip nears the viewport.

## Not verifiable in this environment

- Mobile Lighthouse performance score and LCP under emulated network/CPU throttling.
- High-DPI (2×/3×) rendering.
- Real `prefers-reduced-motion: reduce` media emulation.
- Installing and launching the APK on a connected Android device. Signatures, manifest, package and permissions were verified statically with `apksigner` and `aapt2`.
- A deployed domain, canonical absolute URL and deployed OG URL. None exists yet; the site uses relative OG paths.
- A Play Store listing. This is a direct signed APK, not a store release.

## Signing

The release APK is signed with a self-signed key created for this project. Keep the keystore and credentials private. Future updates must use the same key, or Android will reject them as an update. The keystore and credentials live outside the site folder at `E:\Math-Sikney-main\Math-Sikney-main\.signing\` and are ignored by the app repository.
