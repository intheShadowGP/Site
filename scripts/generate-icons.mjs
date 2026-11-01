// Renders the raster icons and the Open Graph image from the vector mark.
// sharp writes no EXIF/XMP/ICC metadata unless asked to, so the PNGs carry
// no author, software or location information. Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const pub = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const mark = await readFile(pub('favicon.svg'));

for (const [name, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-512.png', 512],
]) {
  await sharp(mark, { density: 600 }).resize(size, size).png({ compressionLevel: 9 }).toFile(pub(name));
}

const inner = mark
  .toString()
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace('<rect width="120" height="120" fill="#080808"/>', '');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.5" cy="0.45" r="0.5">
      <stop offset="0" stop-color="#8E151B" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#080808"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="#AEB2B7" stroke-opacity="0.18"/>
  <g transform="translate(470 110) scale(2.15)">${inner}</g>
  <rect x="540" y="420" width="120" height="1" fill="#C5A45A"/>
  <text x="600" y="478" text-anchor="middle" fill="#E8E6E1" font-family="Consolas, 'DejaVu Sans Mono', monospace" font-size="22" letter-spacing="8">SYSTEMS &amp; NETWORK SECURITY</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(pub('og-image.png'));
console.log('icons and og-image generated');
