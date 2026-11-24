import { defineConfig } from "astro/config";

// Canonical origin used for canonical tags, Open Graph URLs, the sitemap and
// structured data. Override with SITE_URL when the site moves to a custom domain.
const site = process.env.SITE_URL ?? "https://math-sikney-site.vercel.app";

export default defineConfig({
  site,
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
