import { NextResponse } from "next/server";
import { resetGenerationLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await resetGenerationLimit(request);

  return NextResponse.json({ ok: true });
}
