import { defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'shay-hadar-portfolio',
    compatibilityDate: '2026-11-23',
    workersDev: true,
    assets: {
      htmlHandling: 'force-trailing-slash',
      notFoundHandling: '404-page',
    },
  },
});
