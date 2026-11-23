import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config.ts';

export default defineConfig({
  site: siteConfig.url,
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: 'never' },
});
