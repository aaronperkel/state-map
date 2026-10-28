import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const PUBLIC = new Set(["/login", "/api/login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = verifyToken(request.cookies.get(COOKIE_NAME)?.value);

  if (PUBLIC.has(pathname)) {
    if (authed && pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.*|apple-icon.*|manifest.*|robots.txt).*)"],
};
