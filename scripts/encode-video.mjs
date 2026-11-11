#!/usr/bin/env node
/**
 * Encodes the venue clips in assets/videos/ for the web, into public/videos/.
 *
 * For each source it writes:
 *   public/videos/<name>.mp4         H.264 + AAC, long edge ≤ 1280px, max
 *                                    20s, faststart so playback begins
 *                                    before the whole file arrives
 *   public/videos/<name>-poster.jpg  still from 0.5s, shown before play
 *
 * Phone footage is 4K/HEVC at 20+ Mbps; a gallery tile needs a fraction of
 * that, and HEVC won't play in Chrome on Windows or most Android phones.
 * Requires ffmpeg/ffprobe on PATH. Existing outputs are skipped unless
 * --force is passed.
 *
 *   npm run videos            # encode new clips
 *   npm run videos -- --force # re-encode everything
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const SRC = 'assets/videos';
const OUT = 'public/videos';
const MAX_SECONDS = 20;
const MAX_EDGE = 1280;
const force = process.argv.includes('--force');

if (!existsSync(SRC)) {
  console.error(`No ${SRC}/ folder — drop the clips there first.`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const slug = (name) =>
  name
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşü]/g, (c) => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' })[c])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function probe(file) {
  const json = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height:stream_side_data=rotation:format=duration',
    '-of', 'json',
    file,
  ]).toString();
  const data = JSON.parse(json);
  const stream = data.streams[0];
  const rotation = Math.abs(Number(stream.side_data_list?.[0]?.rotation ?? 0));
  const sideways = rotation === 90 || rotation === 270;
  return {
    width: sideways ? stream.height : stream.width,
    height: sideways ? stream.width : stream.height,
    duration: Number(data.format.duration),
  };
}

const sources = readdirSync(SRC).filter((f) =>
  ['.mp4', '.mov', '.m4v', '.webm'].includes(extname(f).toLowerCase())
);
if (!sources.length) console.log(`Nothing to encode in ${SRC}/.`);

for (const file of sources) {
  const input = join(SRC, file);
  const name = slug(basename(file, extname(file)));
  const video = join(OUT, `${name}.mp4`);
  const poster = join(OUT, `${name}-poster.jpg`);

  if (!force && existsSync(video) && existsSync(poster)) {
    console.log(`skip  ${file} (already encoded)`);
    continue;
  }

  const { width, height, duration } = probe(input);
  if (duration > MAX_SECONDS + 0.5) {
    console.warn(`warn  ${file} is ${duration.toFixed(1)}s — trimming to the first ${MAX_SECONDS}s`);
  }

  // Scale the long edge down to MAX_EDGE, never up; keep both sides even
  const scale =
    width >= height
      ? `scale='min(${MAX_EDGE},iw)':-2`
      : `scale=-2:'min(${MAX_EDGE},ih)'`;

  execFileSync('ffmpeg', [
    '-y', '-v', 'error',
    '-i', input,
    '-t', String(MAX_SECONDS),
    '-vf', scale,
    // Small sources (WhatsApp forwards) are already heavily compressed;
    // a second lossy pass at the usual quality visibly smears them.
    '-c:v', 'libx264', '-preset', 'slow', '-crf', Math.max(width, height) <= 960 ? '22' : '26',
    '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
    '-movflags', '+faststart',
    video,
  ], { stdio: 'inherit' });

  execFileSync('ffmpeg', [
    '-y', '-v', 'error',
    '-ss', String(Math.min(0.5, duration / 2)),
    '-i', video,
    '-frames:v', '1',
    '-q:v', '4',
    poster,
  ], { stdio: 'inherit' });

  const ratio = width / height;
  const aspect = ratio < 0.9 ? 'aspect-[3/4]' : ratio > 1.1 ? 'aspect-[4/3]' : 'aspect-square';
  const mb = (statSync(video).size / 1024 / 1024).toFixed(1);
  console.log(
    `done  ${file} → /videos/${name}.mp4 (${mb} MB, ${width}×${height}, ${aspect})`
  );
}
