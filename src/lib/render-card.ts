import { STATES, VIEW_H, VIEW_W, type StateShape } from "@/lib/states";
import { counts, type MapData, type Mark } from "@/lib/marks";
import { PALETTE, markFill } from "@/lib/palette";
import { SMALL_STATES, labelPos, labelTier } from "@/lib/map-labels";

/**
 * The share card: an Instagram story (9:16). Instagram's own UI covers
 * roughly the top and bottom 250px, so everything sits between y 300 and 1620.
 */
export const CARD = {
  w: 1080,
  h: 1920,
  map: { x: 40, y: 470, w: 1000 },
} as const;

export const CARD_FILE_NAME = "aaron-and-riley-states.png";

type Ctx = CanvasRenderingContext2D;
type Box = readonly [number, number, number, number];

const pathCache = new Map<string, Path2D>();
function statePath(s: StateShape): Path2D {
  let p = pathCache.get(s.abbr);
  if (!p) {
    p = new Path2D(s.d);
    pathCache.set(s.abbr, p);
  }
  return p;
}

function roundRect(x: number, y: number, w: number, h: number, r: number): Path2D {
  const p = new Path2D();
  p.roundRect(x, y, w, h, r);
  return p;
}

/**
 * Fill a shape for a mark. "Both" is Aaron's color under Riley stripes drawn
 * on one shared 45° grid, so touching striped shapes read as a single field
 * (the SVG pattern is anchored to the map the same way).
 */
function fillShape(ctx: Ctx, path: Path2D, mark: Mark, box: Box, period: number, empty: string) {
  if (mark !== 3) {
    ctx.fillStyle = markFill(mark, empty);
    ctx.fill(path);
    return;
  }
  ctx.save();
  ctx.clip(path);
  ctx.fillStyle = PALETTE.aaron;
  ctx.fill(path);
  ctx.strokeStyle = PALETTE.riley;
  ctx.lineWidth = period / 2;
  ctx.lineCap = "butt";
  const [x0, y0, x1, y1] = box;
  const pad = period;
  const step = period * Math.SQRT2; // lines x + y = c, `period` apart perpendicular
  const start = Math.floor((x0 + y0 - pad) / step) * step;
  const end = x1 + y1 + pad;
  ctx.beginPath();
  for (let c = start; c <= end; c += step) {
    ctx.moveTo(c - (y0 - pad), y0 - pad);
    ctx.lineTo(c - (y1 + pad), y1 + pad);
  }
  ctx.stroke();
  ctx.restore();
}

async function loadFonts(family: string) {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    // Resolves to [] (no throw) when nothing matches, so drawing proceeds either way.
    await Promise.all([700, 800, 900].map((w) => document.fonts.load(`${w} 40px ${family}`)));
  } catch {
    /* draw with whatever is available */
  }
}

/** Render the current map to a 1080×1920 PNG. `fontFamily` is the Nunito loader's family string. */
export async function renderCard(states: MapData, fontFamily: string): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CARD.w;
  canvas.height = CARD.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");

  await loadFonts(fontFamily);
  const font = (weight: number, size: number) => `${weight} ${size}px ${fontFamily}`;
  const c = counts(states);
  const cx = CARD.w / 2;

  // Background
  ctx.fillStyle = PALETTE.bg;
  ctx.fillRect(0, 0, CARD.w, CARD.h);

  // Title
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = PALETTE.ink;
  ctx.font = font(900, 92);
  ctx.fillText("Aaron & Riley", cx, 300);
  ctx.fillStyle = PALETTE.muted;
  ctx.font = font(700, 40);
  ctx.fillText("states we’ve been to", cx, 372);

  // Map
  const k = CARD.map.w / VIEW_W;
  ctx.save();
  ctx.translate(CARD.map.x, CARD.map.y);
  ctx.scale(k, k);
  for (const s of STATES) {
    fillShape(ctx, statePath(s), states[s.abbr]?.mark ?? 0, s.bbox, 28, PALETTE.empty);
  }
  ctx.strokeStyle = PALETTE.bg;
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  for (const s of STATES) ctx.stroke(statePath(s));
  ctx.textBaseline = "middle";
  for (const s of STATES) {
    const mark = states[s.abbr]?.mark ?? 0;
    const tier = labelTier(s.abbr, s.bbox[2] - s.bbox[0], mark > 0);
    if (!tier || tier === "md") continue;
    const [lx, ly] = labelPos(s);
    ctx.fillStyle = mark > 0 ? PALETTE.ink : PALETTE.emptyLabel;
    ctx.font = font(800, tier === "lg" ? 22 : 19);
    ctx.fillText(s.abbr, lx, ly);
    if (states[s.abbr]?.note) {
      ctx.beginPath();
      ctx.arc(lx, ly + 14, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  void VIEW_H;

  // Chips: the small states and DC
  {
    const w = 92, h = 64, gap = 14, r = 16;
    const total = SMALL_STATES.length * w + (SMALL_STATES.length - 1) * gap;
    let x = (CARD.w - total) / 2;
    const y = 1140;
    ctx.textBaseline = "middle";
    ctx.font = font(800, 34);
    for (const abbr of SMALL_STATES) {
      const entry = states[abbr];
      const mark = entry?.mark ?? 0;
      const p = roundRect(x, y, w, h, r);
      fillShape(ctx, p, mark, [x, y, x + w, y + h], 14, PALETTE.surface2);
      if (mark === 0) {
        ctx.strokeStyle = PALETTE.line;
        ctx.lineWidth = 2;
        ctx.stroke(p);
      }
      ctx.fillStyle = PALETTE.ink;
      ctx.fillText(abbr, x + w / 2, y + h / 2 + 1);
      if (entry?.note) {
        ctx.beginPath();
        ctx.arc(x + w - 14, y + 14, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      x += w + gap;
    }
  }

  // Legend, 2×2
  {
    const cells: Array<{ label: string; mark: Mark; count: number }> = [
      { label: "Aaron", mark: 1, count: c.aaron },
      { label: "Riley", mark: 2, count: c.riley },
      { label: "Both", mark: 3, count: c.both },
      { label: "Together", mark: 7, count: c.together },
    ];
    const cw = 440, ch = 96, sw = 64;
    const xs = [100, 560];
    const ys = [1290, 1410];
    ctx.textBaseline = "middle";
    cells.forEach((cell, i) => {
      const x = xs[i % 2];
      const y = ys[Math.floor(i / 2)];
      const sy = y + (ch - sw) / 2;
      fillShape(ctx, roundRect(x, sy, sw, sw, 16), cell.mark, [x, sy, x + sw, sy + sw], 14, PALETTE.empty);
      ctx.fillStyle = PALETTE.ink;
      ctx.textAlign = "left";
      ctx.font = font(700, 40);
      ctx.fillText(cell.label, x + sw + 24, y + ch / 2 + 1);
      ctx.textAlign = "right";
      ctx.font = font(900, 56);
      ctx.fillText(String(cell.count), x + cw, y + ch / 2 + 2);
    });
  }

  // Footer
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = PALETTE.muted;
  ctx.font = font(700, 32);
  ctx.fillText(`${c.any} of ${STATES.length} states`, cx, 1600);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png");
  });
}
