import { NextRequest, NextResponse } from "next/server";
import type { QuoteApiRequest } from "@sarafu/core";
import { getSarafuServer } from "@/lib/server/sarafu";
import { withSarafuX402 } from "@/lib/server/x402";

const handler = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as QuoteApiRequest;
    const { remittance } = getSarafuServer();
    const quote = await remittance.getQuote(body);
    return NextResponse.json(quote);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate quote." },
      { status: 500 },
    );
  }
};

export const POST = withSarafuX402(handler, "Sarafu programmatic quote access");
