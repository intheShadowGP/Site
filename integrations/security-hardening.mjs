// Build-time hardening: emits the _headers file, strips source maps and
// development leftovers, and fails the build if a page would need
// 'unsafe-inline' (inline scripts, inline styles, style attributes).
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cacheRules, securityHeaders } from '../config/security.mjs';

/** @param {string} dir */
async function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function headersFile() {
  const lines = ['/*'];
  for (const [k, v] of Object.entries(securityHeaders())) lines.push(`  ${k}: ${v}`);
  for (const rule of cacheRules) {
    if (rule.pattern === '/*') lines.push(`  Cache-Control: ${rule.value}`);
  }
  for (const rule of cacheRules) {
    if (rule.pattern !== '/*') lines.push('', rule.pattern, `  Cache-Control: ${rule.value}`);
  }
  return lines.join('\n') + '\n';
}

const FORBIDDEN_FILES = [/\.map$/i, /(^|[\\/])\.env/i, /\.DS_Store$/i, /Thumbs\.db$/i, /desktop\.ini$/i];

/** @returns {import('astro').AstroIntegration} */
export default function securityHardening() {
  return {
    name: 'gp:security-hardening',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await walk(root);
        /** @type {string[]} */
        const problems = [];

        for (const file of files) {
          const rel = relative(root, file);
          if (FORBIDDEN_FILES.some((re) => re.test(rel))) {
            await rm(file);
            logger.warn(`removed development artefact: ${rel}`);
            continue;
          }
          if (!file.endsWith('.html')) continue;
          const html = await readFile(file, 'utf8');
          const inlineScripts = html.match(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/gi);
          if (inlineScripts) problems.push(`${rel}: inline <script> (${inlineScripts.length})`);
          if (/<style[\s>]/i.test(html)) problems.push(`${rel}: inline <style> block`);
          if (/\sstyle=/i.test(html)) problems.push(`${rel}: style="" attribute`);
          if (/\son[a-z]+=/i.test(html)) problems.push(`${rel}: inline event handler`);
          if (/sourceMappingURL/i.test(html)) problems.push(`${rel}: source map reference`);
        }

        for (const file of files.filter((f) => /\.(js|css)$/.test(f))) {
          const text = await readFile(file, 'utf8').catch(() => '');
          if (/sourceMappingURL/.test(text)) problems.push(`${relative(root, file)}: source map reference`);
        }

        if (problems.length) {
          throw new Error(`CSP/hardening check failed:\n  - ${problems.join('\n  - ')}`);
        }

        await writeFile(join(root, '_headers'), headersFile(), 'utf8');
        logger.info('strict CSP compatible output verified; _headers written');
      },
    },
  };
}
