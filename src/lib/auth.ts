import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "sm_session";
const ONE_YEAR = 60 * 60 * 24 * 365;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Compare against self to keep timing flat, then fail.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.GROUP_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate.normalize("NFKC").trim(), expected);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Token = "<expiresAtSeconds>.<hmac>" */
export function issueToken(now = Date.now()): { value: string; maxAge: number } {
  const exp = Math.floor(now / 1000) + ONE_YEAR;
  const payload = String(exp);
  return { value: `${payload}.${sign(payload)}`, maxAge: ONE_YEAR };
}

export function verifyToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp * 1000 < now) return false;
  return safeEqual(sig, sign(payload));
}

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
