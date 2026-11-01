import { defineConfig } from 'astro/config';
import securityHardening from './integrations/security-hardening.mjs';

/**
 * Public site URL. Leave SITE_URL unset until a domain is chosen:
 * canonical links, Open Graph URLs and the sitemap are then omitted
 * instead of pointing at a placeholder domain.
 */
const site = process.env.SITE_URL || undefined;

/**
 * Sub-path the site is served from. "/" at a domain root (custom domain,
 * Cloudflare Pages, user site); "/Site" for https://<user>.github.io/Site/.
 */
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  // No telemetry, no dev overlay leaking into builds.
  devToolbar: { enabled: false },
  build: {
    format: 'directory',
    // Every stylesheet is emitted as a file so the CSP needs no 'unsafe-inline'.
    inlineStylesheets: 'never',
    assets: '_assets',
  },
  compressHTML: true,
  vite: {
    build: {
      // Never inline scripts or assets as data:/inline blocks (strict CSP).
      assetsInlineLimit: 0,
      sourcemap: false,
      cssCodeSplit: true,
    },
  },
  integrations: [securityHardening()],
});
