import { NextResponse } from "next/server";
import { getPublishedProductsByIds } from "@/lib/catalog/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") ?? "").split(",").filter(Boolean).slice(0, 4);
  const products = await getPublishedProductsByIds(ids);
  return NextResponse.json(products, {
    headers: { "Cache-Control": "private, no-store" }
  });
}