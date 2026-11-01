import type { APIRoute } from 'astro';
import { withBase } from '../config/paths';

// Crawlers only read /robots.txt at the domain root: on a GitHub Pages
// project site this file is informative and the sitemap must be submitted
// to search engines directly.
export const GET: APIRoute = ({ site }) => {
  const lines = ['User-agent: *', 'Allow: /', `Disallow: ${withBase('/404/')}`];
  if (site) lines.push('', `Sitemap: ${new URL(withBase('/sitemap.xml'), site).href}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
