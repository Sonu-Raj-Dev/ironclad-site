import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // CHANGE THIS to the client's real domain before launch — it builds the
  // canonical URLs and sitemap links.
  site: 'https://ironclad.example',
  vite: { plugins: [tailwindcss()] },
});
