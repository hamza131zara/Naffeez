import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ service: "naffeez-web", status: "ok" }, {
    headers: { "Cache-Control": "no-store" }
  });
}