# Math Sikney showcase

Static Astro site for **Math Sikney 1.2.0**, the offline mental-math visualizer for Android.

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

## Direct APK

The download lives at:

`public/downloads/math-sikney-1.2.0.apk`

- Package: `app.mathsikney.mmv`
- Version: `1.2.0` / version code `3`
- Min SDK: `26` (Android 8.0)
- Size: `2.28 MB`
- Signature: APK Signature Scheme v2 + v3
- SHA-256: `0d3f5e0085c287d38fd6cc814ced9e45a595063c112d87f483b2fa035190d4ef`

The APK is signed for direct distribution. Keep the signing keystore and credentials private; future updates must use the same signing identity.

## Links

- GitHub: [github.com/approxy-dev](https://github.com/approxy-dev)
- Feedback and contact: [approxydev@gmail.com](mailto:approxydev@gmail.com)

## QA

- `QA_REPORT.md` records the responsive, accessibility, APK and interaction checks.
- `qa-captures/` contains 33 section captures (11 sections × 360/768/1440 px) plus `lighthouse.json` and `lighthouse.html`.
- `scripts/qa-harness.html` is the interactive fixed-width harness.
- `scripts/capture.html` is the headless capture page used to export the section PNGs.
- `scripts/og.html` is the source for the 1200 × 630 social card.

## Notes

- The site is a single static page. There is no backend, database or API.
- The download is a direct signed APK, not a Play Store listing.
- The proof gallery is horizontally scrollable and carries a visible swipe/scroll hint.
