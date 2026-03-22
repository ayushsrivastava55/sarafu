import { NextResponse } from "next/server";
import { getHealthSnapshot } from "@/lib/server/sarafu";

export async function GET() {
  return NextResponse.json(getHealthSnapshot());
}
