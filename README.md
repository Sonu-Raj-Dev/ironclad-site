# Ironclad Athletic Club — website

Astro + Tailwind 4, static output, all content in four JSON files that the
client edits through Sveltia CMS at `/admin`.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## What lives where

| Thing | File |
|---|---|
| Brand colours (all 8) | `src/styles/global.css` → `@theme` block |
| Header, footer, SEO tags, JSON-LD, all motion JS | `src/layouts/Base.astro` |
| Pages | `src/pages/*.astro` |
| Content the client edits | `src/content/*.json` |
| What the client is allowed to edit | `public/admin/config.yml` |
| Client's uploaded photos | `public/uploads/` |

Photos: `src/components/Photo.astro` shows the styled placeholder slot
whenever a photo field is empty, so the site looks intentional before any
real photography arrives. Fill the field in the CMS and the `<img>` replaces it.

## Launch checklist

1. **Domain** — set `site:` in `astro.config.mjs` and the `Sitemap:` line in
   `public/robots.txt`. Nothing else hardcodes the domain.
2. **Form** — sign up at [web3forms.com](https://web3forms.com), paste the
   access key into `src/content/site.json` → `formAccessKey`. Submissions
   email the gym and redirect to `/thank-you`. Test it once for real.
3. **Repo** — push to GitHub. Set `repo:` in `public/admin/config.yml`.
4. **Host** — Cloudflare Pages or Netlify → connect the repo.
   Build command `npm run build`, output directory `dist`.
5. **CMS auth** — deploy the
   [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) Cloudflare
   Worker, create a GitHub OAuth App pointing at it, put the worker URL in
   `base_url` in `config.yml`. Give the client a GitHub account with write
   access to the repo. ~20 minutes, once.
6. **Local SEO** — claim the Google Business Profile, match the name, address
   and phone to `src/content/site.json` exactly, and paste the Maps embed link
   into the CMS. This moves the needle far more than anything on the page.
7. **Deploy alerts** — turn on build-failure email to *yourself*, not the
   client. A failed build looks to him like "my change didn't save".

## Client's workflow

Go to `yoursite.com/admin` → log in → pick a page → change text or drag in a
new photo → **Publish**. Live in about 30–40 seconds.

## Deliberate simplifications

- **No image optimisation pipeline.** CMS uploads land in `public/uploads` and
  ship as-is; `config.yml` caps them at 2.5 MB. Add `astro:assets` or
  Cloudflare Images if the client starts uploading unresized photos.
  <!-- ponytail: unoptimised uploads, add astro:assets if photo weight hurts LCP -->
- **No content collections / schema validation.** Plain JSON imports. If the
  client can break a field, `config.yml` is where you constrain it.
- **No blog, no sitemap integration, no analytics.** Add when asked.
- **Highlight word** is a plain string match on one heading line — if the
  client types a word that isn't in that line, the red styling just won't apply.
