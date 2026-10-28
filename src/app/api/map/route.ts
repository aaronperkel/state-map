import { NextResponse, connection } from "next/server";
import { getAll } from "@/lib/redis";

export async function GET() {
  await connection();
  const data = await getAll();
  return NextResponse.json(data, { headers: { "cache-control": "no-store" } });
}
