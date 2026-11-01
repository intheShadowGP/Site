// Pre-publication audit of the generated site (dist/).
// Fails (exit 1) on anything that could leak data or weaken the CSP.
// Usage: npm run audit:dist   — optional: add extra private terms to check
// in a local, git-ignored file private/forbidden-terms.txt (one per line).
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir, userInfo } from 'node:os';

const root = fileURLToPath(new URL('../dist', import.meta.url));
const projectRoot = fileURLToPath(new URL('..', import.meta.url));

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const textExt = /\.(html|css|js|mjs|json|webmanifest|txt|xml|svg|map)$|_headers$/i;
const allowedHosts = new Set([
  'www.w3.org', // SVG / XHTML namespaces
  'www.sitemaps.org', // sitemap namespace
]);
if (process.env.SITE_URL) allowedHosts.add(new URL(process.env.SITE_URL).host);

const checks = [
  { name: 'e-mail address', re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, skip: (m) => /@(font-face|media|supports|keyframes|layer|import|view-transition|property)/i.test(m) || /\.(woff2|png|svg)$/i.test(m) },
  { name: 'phone number', re: /(?:\+33|0033|\b0)[1-9](?:[ .-]?\d{2}){4}\b/g },
  { name: 'GPS coordinates', re: /-?\d{1,3}\.\d{4,},\s*-?\d{1,3}\.\d{4,}/g },
  { name: 'source map', re: /sourceMappingURL/g },
  { name: 'tracker', re: /google-analytics|googletagmanager|gtag\(|fbq\(|hotjar|clarity\.ms|matomo|plausible|umami|segment\.com|doubleclick/gi },
  { name: 'eval-like', re: /\beval\(|new Function\(/g },
  { name: 'local path', re: /[A-Z]:\\(?:Users|claude)|\/Users\/[a-z]|\/home\/[a-z]/gi },
  { name: 'secret-looking token', re: /(?:api[_-]?key|secret|token|passw(?:or)?d)\s*[:=]\s*['"][^'"]{8,}/gi },
];

const extraTerms = [];
try {
  const raw = await readFile(join(projectRoot, 'private', 'forbidden-terms.txt'), 'utf8');
  extraTerms.push(...raw.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#')));
} catch {}
// the build machine's account name must never end up in the output
for (const term of [userInfo().username, homedir()]) if (term && term.length > 2) extraTerms.push(term);

const findings = [];
const files = await walk(root);
let bytes = 0;

for (const file of files) {
  const rel = relative(root, file).replaceAll('\\', '/');
  bytes += (await stat(file)).size;
  if (/\.map$/i.test(rel)) findings.push(`${rel}: source map file`);
  if (/(^|\/)\.(env|git)|\.(log|bak|old|orig|swp)$|(^|\/)(Thumbs\.db|\.DS_Store)$/i.test(rel)) findings.push(`${rel}: development artefact`);
  if (/\.pdf$/i.test(rel)) findings.push(`${rel}: PDF published (original CV?)`);
  if (/\.(jpe?g|tiff?|heic)$/i.test(rel)) findings.push(`${rel}: photo format — check EXIF metadata`);

  if (/\.png$/i.test(rel)) {
    const buf = await readFile(file);
    for (const chunk of ['eXIf', 'tEXt', 'iTXt', 'zTXt']) {
      if (buf.includes(Buffer.from(chunk))) findings.push(`${rel}: PNG metadata chunk ${chunk}`);
    }
  }
  if (!textExt.test(rel)) continue;

  const text = await readFile(file, 'utf8');
  for (const check of checks) {
    for (const match of text.matchAll(check.re)) {
      if (check.skip?.(match[0])) continue;
      findings.push(`${rel}: ${check.name} → ${match[0].slice(0, 60)}`);
    }
  }
  for (const term of extraTerms) {
    if (text.toLowerCase().includes(term.toLowerCase())) findings.push(`${rel}: private term found`);
  }
  for (const match of text.matchAll(/(?:https?:)?\/\/([a-z0-9.-]+\.[a-z]{2,})(?=[/"'\s)>]|$)/gi)) {
    const host = match[1].toLowerCase();
    if (!allowedHosts.has(host)) findings.push(`${rel}: external host → ${host}`);
  }
  if (rel.endsWith('.html')) {
    if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(text)) findings.push(`${rel}: inline script`);
    if (/<style[\s>]|\sstyle=/i.test(text)) findings.push(`${rel}: inline style`);
    if (/<iframe|<embed|<object/i.test(text)) findings.push(`${rel}: embedded third-party frame`);
    if (/<form/i.test(text)) findings.push(`${rel}: form element`);
  }
}

console.log(`audited ${files.length} files (${(bytes / 1024).toFixed(1)} KiB) in dist/`);
if (findings.length) {
  console.error(`\n✖ ${findings.length} finding(s):\n  - ${findings.join('\n  - ')}`);
  process.exit(1);
}
console.log('✔ no personal data, trackers, external hosts, source maps, inline code or metadata found');
