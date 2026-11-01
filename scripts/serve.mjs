// Local production server for dist/ that applies the real security headers,
// so CSP, Trusted Types and friends can be tested before deployment.
// HSTS and upgrade-insecure-requests are left out because this serves plain
// HTTP on localhost. Usage: npm run serve  (PORT=4322 by default)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cacheRules, securityHeaders } from '../config/security.mjs';

const root = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const port = Number(process.env.PORT ?? 4322);
const host = '127.0.0.1';
const base = (process.env.BASE_PATH ?? '').replace(/\/+$/, '');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const baseHeaders = securityHeaders({ https: false });

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0] ?? '/');
  const target = normalize(join(root, decoded));
  if (target !== root && !target.startsWith(root + sep)) return null; // traversal
  for (const candidate of [target, join(target, 'index.html')]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { ...baseHeaders, Allow: 'GET, HEAD' }).end();
      return;
    }
    let url = req.url ?? '/';
    // mirror a sub-path deployment (BASE_PATH=/Site): / -> /Site/, /Site/x -> x
    if (base) {
      if (url === '/' || url === base) {
        res.writeHead(302, { ...baseHeaders, Location: `${base}/` }).end();
        return;
      }
      url = url.startsWith(`${base}/`) ? url.slice(base.length) : '/__not_found__';
    }
    const [pathname = '/', query] = url.split('?');
    // mirror static hosts: /fr -> /fr/
    if (!pathname.endsWith('/') && !extname(pathname) && (await resolveFile(pathname + '/index.html'))) {
      res.writeHead(301, { ...baseHeaders, Location: base + pathname + '/' + (query ? `?${query}` : '') }).end();
      return;
    }
    let file = await resolveFile(url);
    let status = 200;
    if (!file || file.endsWith(`${sep}_headers`)) {
      file = join(root, '404.html');
      status = 404;
    }
    const body = await readFile(file);
    const cache = pathname.startsWith('/_assets/') ? cacheRules[0].value : cacheRules[1].value;
    res.writeHead(status, {
      ...baseHeaders,
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': cache,
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    // never leak stack traces or paths
    res.writeHead(500, { ...baseHeaders, 'Content-Type': 'text/plain; charset=utf-8' }).end('Internal error');
  }
}).listen(port, host, () => {
  console.log(`GP production preview with security headers: http://localhost:${port}${base}/`);
});
