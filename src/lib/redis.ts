import "server-only";
import { Redis } from "@upstash/redis";
import { STATE_ABBRS } from "./states";
import { emptyEntry, isMark, NOTE_MAX, type Mark, type MapData, type StateEntry } from "./marks";

const HASH_KEY = "statemap:states";
const VERSION_KEY = "statemap:version";

let _redis: Redis | null = null;

/** Lazy so `next build` never touches env. Accepts either env naming scheme. */
export function getRedis(): Redis {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Redis env vars are not set");
  _redis = new Redis({ url, token });
  return _redis;
}

function parseEntry(raw: unknown): StateEntry {
  const base = emptyEntry();
  if (raw == null) return base;
  const obj = typeof raw === "string" ? safeJson(raw) : raw;
  if (!obj || typeof obj !== "object") return base;
  const o = obj as Record<string, unknown>;
  return {
    mark: isMark(o.mark) ? o.mark : 0,
    note: typeof o.note === "string" ? o.note.slice(0, NOTE_MAX) : "",
    updatedAt: typeof o.updatedAt === "number" ? o.updatedAt : 0,
  };
}

function safeJson(s: string): unknown {
  try { return JSON.parse(s); } catch { return null; }
}

export async function getVersion(): Promise<number> {
  const v = await getRedis().get<number | string>(VERSION_KEY);
  return Number(v ?? 0);
}

export async function getAll(): Promise<{ version: number; states: MapData }> {
  const r = getRedis();
  const [version, hash] = await Promise.all([
    r.get<number | string>(VERSION_KEY),
    r.hgetall<Record<string, unknown>>(HASH_KEY),
  ]);
  const states: MapData = {};
  for (const abbr of STATE_ABBRS) states[abbr] = parseEntry(hash?.[abbr]);
  return { version: Number(version ?? 0), states };
}

export async function getOne(abbr: string): Promise<StateEntry> {
  const raw = await getRedis().hget<unknown>(HASH_KEY, abbr);
  return parseEntry(raw);
}

export async function update(
  abbr: string,
  patch: { mark?: Mark; note?: string },
): Promise<{ version: number; entry: StateEntry }> {
  const r = getRedis();
  const current = await getOne(abbr);
  const entry: StateEntry = {
    mark: patch.mark ?? current.mark,
    note: patch.note !== undefined ? patch.note.slice(0, NOTE_MAX) : current.note,
    updatedAt: Date.now(),
  };
  const p = r.pipeline();
  p.hset(HASH_KEY, { [abbr]: JSON.stringify(entry) });
  p.incr(VERSION_KEY);
  const [, version] = await p.exec<[number, number]>();
  return { version: Number(version), entry };
}
