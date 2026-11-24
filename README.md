# Math Sikney showcase

Static Astro site for **Math Sikney**, the offline mental-math visualizer for Android.

The page is written for people who want the app, not for people reading a changelog. Version numbers, package IDs, hashes and build details are kept in this README and in the APK verification notes below, not in the rendered page.

## Local development

```powershell
cd "E:\Math Sikney Site"
npm install
npm run dev
```

The dev server prints its local URL. For the production build:

```powershell
npm run build
npm run preview
```

## Deploy to Vercel

Repository: [github.com/approxy-dev/math-sikney-site](https://github.com/approxy-dev/math-sikney-site)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/approxy-dev/math-sikney-site)

Import the repository into Vercel. The project is a standard static Astro build:

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none required

`vercel.json` adds long-lived caching for hashed assets and fonts, security headers, and the Android APK content type. Vercel Analytics only loads when the build runs on Vercel (`VERCEL=1`).

## Canonical URL and SEO

`astro.config.mjs` sets the canonical origin used by the canonical tag, Open Graph URLs, structured data and the sitemap. It defaults to the likely Vercel project URL:

```
https://math-sikney-site.vercel.app
```

If the site is deployed to a different domain, set `SITE_URL` before building:

```powershell
$env:SITE_URL = "https://your-domain.example"
npm run build
```

SEO pieces included:

- Canonical link, `og:url`, absolute `og:image` and Twitter image URLs
- `robots` meta with `index, follow` and large image previews
- Generated `/sitemap.xml` and `/robots.txt` (with the sitemap URL)
- `/site.webmanifest` with the app name, theme colour and icons
- JSON-LD graph: `WebSite`, `SoftwareApplication`, `Organization`
- `FAQPage` JSON-LD that matches the visible FAQ
- One `h1`, descriptive title and meta description, descriptive alt text on every screenshot

## Direct APK

The download lives at:

`public/downloads/math-sikney.apk`

- Package: `app.mathsikney.mmv`
- Version: `1.2.0` / version code `3`
- Min SDK: `26` (Android 8.0)
- Size: `2,395,324` bytes (2.3 MB displayed)
- Signature: APK Signature Scheme v2 + v3
- SHA-256: `0d3f5e0085c287d38fd6cc814ced9e45a595063c112d87f483b2fa035190d4ef`

The APK is signed for direct distribution. Keep the signing keystore and credentials private; future updates must use the same signing identity. The unversioned filename keeps download links stable across releases.

## Links

- GitHub: [github.com/approxy-dev](https://github.com/approxy-dev)
- Feedback and contact: [approxydev@gmail.com](mailto:approxydev@gmail.com)

## QA

- `qa-captures/` contains 30 section captures (10 sections × 360/768/1440 px), contact sheets, `audit.json`, and the Lighthouse reports.
- `scripts/qa-harness.html` is the interactive fixed-width harness.
- `scripts/capture.html` is the headless capture page used to export the section PNGs.
- `scripts/og.html` is the source for the 1200 × 630 social card.

## Notes

- The site is a single static page. There is no backend, database or API.
- The download is a direct signed APK, not a Play Store listing.
- The proof gallery is horizontally scrollable and carries a visible swipe/scroll hint.
- The rendered page intentionally omits version numbers, package names, signatures, hashes and build logs.
