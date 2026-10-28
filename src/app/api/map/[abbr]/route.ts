import { NextResponse } from "next/server";
import { STATE_BY_ABBR } from "@/lib/states";
import { isMark, NOTE_MAX, type Mark } from "@/lib/marks";
import { update } from "@/lib/redis";

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ abbr: string }> },
) {
  const { abbr: rawAbbr } = await ctx.params;
  const abbr = rawAbbr.toUpperCase();
  if (!STATE_BY_ABBR[abbr]) {
    return NextResponse.json({ error: "unknown state" }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as
    | { mark?: unknown; note?: unknown }
    | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  const patch: { mark?: Mark; note?: string } = {};
  if (body.mark !== undefined) {
    if (!isMark(body.mark)) return NextResponse.json({ error: "mark must be 0-3" }, { status: 400 });
    patch.mark = body.mark;
  }
  if (body.note !== undefined) {
    if (typeof body.note !== "string") return NextResponse.json({ error: "note must be a string" }, { status: 400 });
    const note = body.note.trim();
    if (note.length > NOTE_MAX) {
      return NextResponse.json({ error: `note must be ${NOTE_MAX} characters or fewer` }, { status: 400 });
    }
    patch.note = note;
  }
  if (patch.mark === undefined && patch.note === undefined) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const result = await update(abbr, patch);
  return NextResponse.json({ abbr, ...result }, { headers: { "cache-control": "no-store" } });
}
