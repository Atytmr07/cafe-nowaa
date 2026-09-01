/**
 * Pre-builds the responsive WebP variants the site serves directly, so that
 * none of the venue photography goes through Vercel's image optimizer.
 *
 * Why not just use next/image: on Vercel, every (source, width, Accept)
 * combination that a real visitor requests is billed as one image
 * transformation. With 12 local photos, six configured device widths and two
 * Accept families (AVIF / WebP), the reachable space is ~168 transformations
 * — and it fills up gradually as visitors arrive on new screen sizes and
 * browsers, which is exactly the slow climb we saw in the usage dashboard.
 * These photos never change, so paying a per-visitor-shape transformation
 * cost for them is pure waste: generate the variants once, commit them, and
 * let the CDN serve static files.
 *
 * Sources live in assets/photos (not served). Output goes to
 * public/photos/opt plus a manifest the components read to build srcsets.
 *
 * Run with: npm run photos
 */
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'assets/photos';
const OUT_DIR = 'public/photos/opt';
const MANIFEST = 'lib/photo-manifest.json';

/**
 * Display widths, chosen from what the layouts actually ask for:
 * gallery tiles at 33vw (~475px on a 1440 screen, ~950 at 2x), About at
 * 45vw, the teaser at 40vw, and the hero at 100vw. `withoutEnlargement`
 * means a source narrower than a step simply doesn't get that step, so a
 * 1080px-wide original is never upscaled into a blurry 1440.
 */
const WIDTHS = [480, 960, 1440];
const QUALITY = 72;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f)
  );
  if (!files.length) throw new Error(`No source images in ${SOURCE_DIR}`);

  const manifest = {};
  let sourceBytes = 0;
  let outputBytes = 0;

  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const name = file.replace(/\.[^.]+$/, '');
    const image = sharp(sourcePath);
    const { width: nativeWidth } = await image.metadata();
    sourceBytes += (await stat(sourcePath)).size;

    const widths = [];
    for (const width of WIDTHS) {
      // Skip a step the source can't fill rather than upscaling into it,
      // but always keep the smallest so every photo has at least one variant.
      if (width > nativeWidth && widths.length) continue;
      const outPath = path.join(OUT_DIR, `${name}-${width}.webp`);
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      outputBytes += (await stat(outPath)).size;
      widths.push(width);
    }

    // Keyed by the original public path the components used to reference,
    // so call sites read the same way they always did.
    manifest[`/photos/${file}`] = { base: `/photos/opt/${name}`, widths };
    console.log(`${file}  ${nativeWidth}px -> ${widths.join(', ')}`);
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `\n${files.length} photos - sources ${kb(sourceBytes)} -> variants ${kb(outputBytes)}`
  );
  console.log(`manifest written to ${MANIFEST}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
