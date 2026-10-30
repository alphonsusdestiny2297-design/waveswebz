/**
 * Re-encodes site photography to WebP.
 *
 * The source JPEGs were 650 KB – 1 MB each at only 1376×768 (near quality-100),
 * so the header backgrounds alone pulled ~9.4 MB onto the wire — on the mobile
 * connections this site targets. This script writes an equivalent-quality WebP
 * next to each JPEG; run it after adding or replacing a photo in
 * public/assets/images.
 *
 *   node scripts/optimize-images.mjs
 *
 * It is intentionally not part of `npm run build`: the WebP files are committed
 * once, so builds stay fast and deterministic (no sharp needed on CI/Vercel).
 */
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(projectRoot, 'public', 'assets', 'images');

// Quality 80 matches the visual quality of the originals for these dark,
// heavily-overlaid backgrounds while cutting file size by roughly 90%.
const WEBP_QUALITY = 80;

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const entries = (await readdir(imagesDir)).filter((name) => name.endsWith('.jpg')).sort();
if (entries.length === 0) {
  console.log('optimize-images: no .jpg files found in public/assets/images');
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const name of entries) {
  const sourcePath = path.join(imagesDir, name);
  const targetPath = sourcePath.replace(/\.jpg$/, '.webp');

  const before = (await stat(sourcePath)).size;
  await sharp(sourcePath)
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(targetPath);

  const after = (await stat(targetPath)).size;
  totalBefore += before;
  totalAfter += after;

  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `${name}\n  ${formatBytes(before).padStart(9)} -> ${formatBytes(after).padStart(9)}  (-${pct}%)`
  );
}

console.log(
  `\nTotal: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} ` +
    `(-${Math.round((1 - totalAfter / totalBefore) * 100)}%) in ${entries.length} images`
);
console.log('Originals are left in place; delete them once you have verified the .webp output.');
