import { mkdir, writeFile } from 'node:fs/promises';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const families = [
  { slug: 'space-grotesk', query: 'family=Space+Grotesk:wght@300..700', subset: 'latin' },
  { slug: 'plus-jakarta-sans', query: 'family=Plus+Jakarta+Sans:wght@400..700', subset: 'latin' },
  { slug: 'jetbrains-mono', query: 'family=JetBrains+Mono:wght@400..700', subset: 'latin' },
  { slug: 'noto-sans-devanagari', query: 'family=Noto+Sans+Devanagari:wght@400..600', subset: 'devanagari' },
];

await mkdir('public/fonts', { recursive: true });

for (const family of families) {
  const cssUrl = `https://fonts.googleapis.com/css2?${family.query}&display=swap`;
  const css = await fetch(cssUrl, { headers: { 'User-Agent': UA } }).then((r) => {
    if (!r.ok) throw new Error(`${family.slug}: css ${r.status}`);
    return r.text();
  });

  const blocks = css.split('/*').slice(1).map((part) => {
    const name = part.slice(0, part.indexOf('*/')).trim();
    return { name, text: part };
  });

  const block = blocks.find((b) => b.name === family.subset);
  if (!block) {
    console.log(`${family.slug}: subsets ${blocks.map((b) => b.name).join(', ')}`);
    throw new Error(`${family.slug}: no ${family.subset} subset`);
  }

  const url = block.text.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error(`${family.slug}: no woff2 url`);

  const bytes = new Uint8Array(await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.arrayBuffer()));
  if (String.fromCharCode(...bytes.slice(0, 4)) !== 'wOF2') throw new Error(`${family.slug}: not woff2`);

  const out = `public/fonts/${family.slug}-${family.subset}.woff2`;
  await writeFile(out, bytes);
  console.log(`${out}  ${(bytes.length / 1024).toFixed(1)} kB`);
}
