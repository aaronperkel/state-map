import { NextResponse } from "next/server";
import { checkPassword, issueToken, cookieOptions, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  let password = "";
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } else {
    const form = await request.formData().catch(() => null);
    const v = form?.get("password");
    password = typeof v === "string" ? v : "";
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "That's not it." }, { status: 401 });
  }

  const { value, maxAge } = issueToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, value, cookieOptions(maxAge));
  return res;
}
