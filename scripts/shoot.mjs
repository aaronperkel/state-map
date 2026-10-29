import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3111";
const OUT = process.env.OUT ?? ".impeccable/review";
const PW = process.env.GROUP_PASSWORD;
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
const cache = `${homedir()}/Library/Caches/ms-playwright`;
const shell = readdirSync(cache).filter((d) => d.startsWith("chromium_headless_shell-")).sort().at(-1);
const exe = `${cache}/${shell}/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
if (!existsSync(exe)) throw new Error("no Playwright chromium headless shell in " + cache);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: exe, headless: true });
const errors = [];

async function ctx(viewport, authed) {
  const c = await browser.newContext({ viewport, deviceScaleFactor: 2, reducedMotion: "reduce" });
  if (authed) {
    const r = await c.request.post(`${BASE}/api/login`, { data: { password: PW } });
    if (!r.ok()) throw new Error("login failed " + r.status());
  }
  const p = await c.newPage();
  p.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  p.on("pageerror", (e) => errors.push(String(e)));
  return { c, p };
}

const api = async (c, abbr, body) => (await c.request.patch(`${BASE}/api/map/${abbr}`, { data: body })).ok();

// 1. login, mobile
{
  const { c, p } = await ctx({ width: 390, height: 844 }, false);
  await p.goto(`${BASE}/login`);
  await p.waitForLoadState("networkidle");
  await p.screenshot({ path: `${OUT}/login-mobile.png`, fullPage: true });
  await p.fill("#pw", "nope");
  await p.click("button[type=submit]");
  await p.waitForSelector("#pw-error:not([hidden])");
  await p.screenshot({ path: `${OUT}/login-mobile-error.png`, fullPage: true });
  await c.close();
}

// 2. map, mobile, empty then marked
{
  const { c, p } = await ctx({ width: 390, height: 844 }, true);
  await p.goto(`${BASE}/`);
  await p.waitForSelector(".map[aria-busy=false]");
  await p.screenshot({ path: `${OUT}/mobile-empty.png`, fullPage: true });

  // seed demo marks (synthetic, reset at end)
  for (const [a, m, n] of [["TX", 1, ""], ["CA", 2, ""], ["VT", 7, "Burlington, forever"], ["NY", 3, ""], ["FL", 1, ""], ["CO", 2, "Ski trip 2025"], ["WA", 1, ""], ["MA", 3, ""], ["GA", 2, ""], ["AZ", 7, ""], ["OH", 2, ""], ["PA", 1, ""], ["IL", 3, "Chicago, deep dish"], ["RI", 2, ""], ["DC", 7, ""]]) {
    await api(c, a, { mark: m, note: n });
  }
  await p.reload();
  await p.waitForSelector(".map[aria-busy=false]");
  // tap Nevada on the map via its centroid
  await p.click('[data-abbr="NV"] .state__fill');
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/mobile.png`, fullPage: true });
  // open sheet via strip button
  await p.click(".strip__action");
  await p.waitForSelector("dialog[open]");
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/mobile-sheet.png`, fullPage: false });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);
  await c.close();
}

// 3. desktop
{
  const { c, p } = await ctx({ width: 1440, height: 900 }, true);
  await p.goto(`${BASE}/`);
  await p.waitForSelector(".map[aria-busy=false]");
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/desktop.png`, fullPage: true });
  await p.click('[data-abbr="MT"] .state__fill');
  await p.waitForTimeout(500);
  await p.click(".strip__action");
  await p.waitForSelector("dialog[open]");
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/desktop-sheet.png`, fullPage: false });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(300);

  // sync check: a second "device" changes Oregon; this page should pick it up by polling
  const other = await browser.newContext();
  await other.request.post(`${BASE}/api/login`, { data: { password: PW } });
  await other.request.patch(`${BASE}/api/map/OR`, { data: { mark: 2, note: "from the other phone" } });
  await other.close();
  await p.waitForFunction(() => document.querySelector('[data-abbr="OR"]')?.getAttribute("data-mark") === "2", null, { timeout: 15000 });
  const stripText = await p.textContent(".strip");
  console.log("strip after remote change:", stripText);
  await p.screenshot({ path: `${OUT}/desktop-remote.png`, fullPage: false });
  await c.close();
}

// 4. reset all demo marks
{
  const c = await browser.newContext();
  await c.request.post(`${BASE}/api/login`, { data: { password: PW } });
  const all = await (await c.request.get(`${BASE}/api/map`)).json();
  for (const [a, e] of Object.entries(all.states)) if (e.mark || e.note) await api(c, a, { mark: 0, note: "" });
  await c.close();
}

await browser.close();
console.log("errors:", errors.length ? errors : "none");
