import { NextResponse } from "next/server";
import { generateWithAIRouter } from "@/lib/ai/router";

export async function POST(request: Request) {
  try {
    const response = await generateWithAIRouter(await request.json());
    return NextResponse.json(response);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Generate API failed", error);
    }

    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
