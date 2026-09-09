// Built from `site` in astro.config.mjs, so the domain lives in exactly one place.
const PATHS = ['/', '/about', '/services', '/contact'];

export function GET({ site }) {
  const urls = PATHS.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
