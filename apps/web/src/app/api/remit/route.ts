import { NextRequest, NextResponse } from "next/server";
import type { RemitApiRequest } from "@sarafu/core";
import { getSarafuServer } from "@/lib/server/sarafu";
import { withSarafuX402 } from "@/lib/server/x402";

const handler = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as RemitApiRequest;
    const { remittance } = getSarafuServer();
    const tx = await remittance.sendRemittance(body);
    return NextResponse.json(tx);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to execute remittance." },
      { status: 500 },
    );
  }
};

export const POST = withSarafuX402(handler, "Sarafu programmatic remittance execution");
