import { NextRequest, NextResponse } from "next/server";
import type { ChatRequestBody } from "@sarafu/core";
import { getSarafuServer } from "@/lib/server/sarafu";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const { runtime } = getSarafuServer();
    const response = await runtime.chat(body);
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat request." },
      { status: 500 },
    );
  }
}
