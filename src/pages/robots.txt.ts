import type { APIRoute } from "astro";

const fallback = new URL("https://math-sikney-site.vercel.app");

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? fallback;
  const sitemap = new URL("/sitemap.xml", origin).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
