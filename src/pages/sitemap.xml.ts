import type { APIRoute } from 'astro';
import { LANGS, homePath } from '../i18n';

/**
 * Minimal sitemap: the two localized home pages with hreflang alternates.
 * Only generated with an absolute site URL (SITE_URL); otherwise it is empty
 * of entries rather than pointing at a placeholder domain.
 */
export const GET: APIRoute = ({ site }) => {
  const urls = site
    ? LANGS.map((lang) => {
        const alternates = LANGS.map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt}" href="${new URL(homePath(alt), site).href}"/>`,
        ).join('\n');
        return `  <url>\n    <loc>${new URL(homePath(lang), site).href}</loc>\n${alternates}\n  </url>`;
      })
    : [];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
