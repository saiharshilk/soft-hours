/**
 * Builds tiny self-hosted Chinese font files containing ONLY the characters the
 * site uses. Full CJK fonts are megabytes; these subsets are a few KB.
 *
 * Run after adding or changing any Chinese text (or pinyin):
 *   npm run fonts
 *
 * It scans src/ for CJK characters, asks the Google Fonts API for a subset of
 * each font containing just those glyphs, and writes woff2 files to src/fonts/.
 * They are loaded with next/font/local in src/app/layout.tsx.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const OUT = join(SRC, "fonts");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "fonts" ? [] : walk(p);
    return /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

const text = walk(SRC).map((f) => readFileSync(f, "utf8")).join("");
const cjk = new Set(text.match(/[㐀-鿿豈-﫿　-〿]/gu) ?? []);
// Noto Serif TC also sets the pinyin, so include Latin letters and tone-marked vowels.
const latin =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '’·-" +
  "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙ";
const chars = [...cjk].sort().join("");

const fonts = [
  { family: "Noto Serif TC", weight: 400, file: "noto-serif-tc-subset.woff2", text: chars + latin },
  { family: "LXGW WenKai TC", weight: 400, file: "lxgw-wenkai-tc-subset.woff2", text: chars },
];

// A modern UA so the API serves woff2.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

mkdirSync(OUT, { recursive: true });
for (const f of fonts) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.family)}:wght@${f.weight}&text=${encodeURIComponent(f.text)}&display=swap`;
  const css = await (await fetch(url, { headers: { "User-Agent": UA } })).text();
  const src = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!src) throw new Error(`No font URL for ${f.family}:\n${css}`);
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  writeFileSync(join(OUT, f.file), buf);
  console.log(`${f.file}: ${(buf.length / 1024).toFixed(1)} KB, ${[...new Set(f.text)].length} glyphs`);
}
console.log(`CJK characters: ${chars}`);
