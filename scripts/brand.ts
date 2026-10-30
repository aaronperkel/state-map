/**
 * Renders the brand assets from the palette and the real map geometry:
 *   src/app/icon.svg               the mark (two circles, lavender where they meet)
 *   src/app/favicon.ico            16 / 32 / 48 PNG-in-ICO
 *   src/app/apple-icon.png         180×180, cream full-bleed
 *   public/icon-192.png, -512.png  manifest icons, cream full-bleed (maskable-safe)
 *   src/app/opengraph-image.png    1200×630, plus a copy as twitter-image.png
 *
 * Run: npx tsx scripts/brand.ts   (needs the Playwright chromium headless shell
 * in ~/Library/Caches/ms-playwright and network access for Nunito).
 * The map on the social image is decorative: colors are assigned by position,
 * not from anyone's data.
 */
import { chromium } from "playwright-core";
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { STATES, VIEW_H, VIEW_W } from "../src/lib/states";
import { PALETTE } from "../src/lib/palette";

const APP = "src/app";
const PUB = "public";
mkdirSync(PUB, { recursive: true });

const cache = `${homedir()}/Library/Caches/ms-playwright`;
const shell = readdirSync(cache).filter((d) => d.startsWith("chromium_headless_shell-")).sort().at(-1);
const exe = `${cache}/${shell}/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
if (!existsSync(exe)) throw new Error("no Playwright chromium headless shell in " + cache);

/* ───────────── the mark ─────────────
   Two circles, Aaron's and Riley's, with the lens where they overlap in
   "together" lavender. Geometry is on a 64-unit square. */
function markSvg(size: number, opts: { rounded: boolean; bg: string | null }): string {
  const k = size / 64;
  const n = (v: number) => (v * k).toFixed(2);
  const r = 16;
  const cy = 32;
  const lx = 25, rx = 39;
  const h = Math.sqrt(r * r - ((rx - lx) / 2) ** 2); // half-height of the lens
  const top = cy - h, bot = cy + h;
  const bg = opts.bg
    ? `<rect width="${size}" height="${size}"${opts.rounded ? ` rx="${n(16)}"` : ""} fill="${opts.bg}"/>`
    : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    bg +
    `<circle cx="${n(lx)}" cy="${n(cy)}" r="${n(r)}" fill="${PALETTE.aaron}"/>` +
    `<circle cx="${n(rx)}" cy="${n(cy)}" r="${n(r)}" fill="${PALETTE.riley}"/>` +
    `<path d="M${n(32)} ${n(top)}A${n(r)} ${n(r)} 0 0 1 ${n(32)} ${n(bot)}A${n(r)} ${n(r)} 0 0 1 ${n(32)} ${n(top)}Z" fill="${PALETTE.together}"/>` +
    `</svg>`
  );
}

/* ───────────── decorative map ─────────────
   A quilt of the four marks plus a few blanks, assigned by position. */
const DECO = ["aaron", "riley", "together", "both", "aaron", "empty", "riley", "together", "both", "riley"] as const;
function decoFill(i: number): string {
  const kind = DECO[(i * 3) % DECO.length];
  if (kind === "both") return "url(#hatch)";
  return PALETTE[kind];
}
function mapSvg(width: number): string {
  const height = Math.round((width * VIEW_H) / VIEW_W);
  const paths = STATES.map(
    (s, i) =>
      `<path d="${s.d}" fill="${decoFill(i)}" stroke="${PALETTE.bg}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`,
  ).join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${VIEW_W} ${VIEW_H}">` +
    `<defs><pattern id="hatch" patternUnits="userSpaceOnUse" width="18" height="18" patternTransform="rotate(45)">` +
    `<rect width="9" height="18" fill="${PALETTE.aaron}"/><rect x="9" width="9" height="18" fill="${PALETTE.riley}"/></pattern></defs>` +
    paths +
    `</svg>`
  );
}

/* ───────────── social image (1200×630) ───────────── */
const stripes = `repeating-linear-gradient(135deg, ${PALETTE.aaron} 0 4px, ${PALETTE.riley} 4px 8px)`;
const pill = (name: string, swatch: string, bg: string) =>
  `<span class="pill" style="background:${bg}"><i style="background:${swatch}"></i>${name}</span>`;
const ogHtml = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=block" rel="stylesheet">
<style>
  html,body{margin:0;background:${PALETTE.bg}}
  body{font-family:Nunito,"Helvetica Neue",Arial,sans-serif;color:${PALETTE.ink};-webkit-font-smoothing:antialiased}
  .og{width:1200px;height:630px;display:flex;align-items:center;gap:40px;padding:0 64px 0 72px;box-sizing:border-box}
  .text{width:410px;flex:0 0 auto;display:grid;gap:18px}
  h1{margin:0;font-size:68px;font-weight:900;line-height:1;letter-spacing:-0.02em}
  p{margin:0;font-size:30px;font-weight:700;color:${PALETTE.muted}}
  .pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
  .pill{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px 0 12px;border-radius:999px;font-size:19px;font-weight:800}
  .pill i{display:block;width:16px;height:16px;border-radius:5px}
  .map{flex:1 1 auto;display:flex;justify-content:flex-end}
</style></head><body><div class="og">
  <div class="text">
    ${markSvg(72, { rounded: true, bg: PALETTE.surface })}
    <h1>Aaron &amp;<br>Riley</h1>
    <p>states we’ve been to</p>
    <div class="pills">
      ${pill("Aaron", PALETTE.aaron, PALETTE.aaronTint)}
      ${pill("Riley", PALETTE.riley, PALETTE.rileyTint)}
      ${pill("Both", stripes, PALETTE.surface2)}
      ${pill("Together", PALETTE.together, PALETTE.togetherTint)}
    </div>
  </div>
  <div class="map">${mapSvg(610)}</div>
</div></body></html>`;

/* ───────────── ICO container (PNG entries) ───────────── */
function ico(entries: Array<{ size: number; png: Buffer }>): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach((e, i) => {
    const o = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1);
    dir.writeUInt8(0, o + 2); // palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // planes
    dir.writeUInt16LE(32, o + 6); // bpp
    dir.writeUInt32LE(e.png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.png.length;
  });
  return Buffer.concat([header, dir, ...entries.map((e) => e.png)]);
}

async function main() {
const browser = await chromium.launch({ executablePath: exe, headless: true });
try {
  // Icons: screenshot the SVG at each size on a transparent page.
  async function shotSvg(svg: string, size: number): Promise<Buffer> {
    const ctx = await browser.newContext({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg}</body></html>`);
    const png = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
    await ctx.close();
    return png;
  }

  writeFileSync(`${APP}/icon.svg`, markSvg(64, { rounded: true, bg: PALETTE.bg }) + "\n");

  const favs = [];
  for (const size of [16, 32, 48]) {
    favs.push({ size, png: await shotSvg(markSvg(size, { rounded: true, bg: PALETTE.bg }), size) });
  }
  writeFileSync(`${APP}/favicon.ico`, ico(favs));

  writeFileSync(`${APP}/apple-icon.png`, await shotSvg(markSvg(180, { rounded: false, bg: PALETTE.bg }), 180));
  for (const size of [192, 512]) {
    writeFileSync(`${PUB}/icon-${size}.png`, await shotSvg(markSvg(size, { rounded: false, bg: PALETTE.bg }), size));
  }

  // Social image
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.setContent(ogHtml, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await Promise.all(["700", "800", "900"].map((w) => document.fonts.load(`${w} 40px Nunito`)));
      await document.fonts.ready;
    });
    const loaded = await page.evaluate(() => document.fonts.check("900 40px Nunito"));
    if (!loaded) throw new Error("Nunito did not load; the social image would use a fallback font");
    const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
    writeFileSync(`${APP}/opengraph-image.png`, png);
    copyFileSync(`${APP}/opengraph-image.png`, `${APP}/twitter-image.png`);
    const alt = "Aaron & Riley: a pastel map of the United States with the states we've been to colored in.";
    writeFileSync(`${APP}/opengraph-image.alt.txt`, alt);
    writeFileSync(`${APP}/twitter-image.alt.txt`, alt);
    await ctx.close();
  }
} finally {
  await browser.close();
}
console.log("brand assets written");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
