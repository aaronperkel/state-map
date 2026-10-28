import { NextResponse, connection } from "next/server";
import { getVersion } from "@/lib/redis";

export async function GET() {
  await connection();
  const version = await getVersion();
  return NextResponse.json({ version }, { headers: { "cache-control": "no-store" } });
}
