import "server-only";

import { HTTPFacilitatorClient } from "@x402/core/server";
import { withX402, x402ResourceServer, type RouteConfig } from "@x402/next";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { privateKeyToAccount } from "viem/accounts";
import type { NextRequest, NextResponse } from "next/server";

const DEFAULT_FACILITATOR_URL = "https://x402.org/facilitator";
const DEFAULT_NETWORK: `${string}:${string}` = "eip155:84532";
const FALLBACK_PAY_TO = "0x000000000000000000000000000000000000dEaD";

declare global {
  // eslint-disable-next-line no-var
  var __sarafuX402Server: x402ResourceServer | undefined;
}

function normalizePrivateKey(value?: string): `0x${string}` | undefined {
  if (!value) {
    return undefined;
  }

  return (value.startsWith("0x") ? value : `0x${value}`) as `0x${string}`;
}

function resolvePayToAddress(): { address: `0x${string}`; configured: boolean } {
  if (process.env.EVM_ADDRESS?.startsWith("0x")) {
    return {
      address: process.env.EVM_ADDRESS as `0x${string}`,
      configured: true,
    };
  }

  const privateKey = normalizePrivateKey(process.env.PRIVATE_KEY);
  if (privateKey) {
    return {
      address: privateKeyToAccount(privateKey).address,
      configured: true,
    };
  }

  return {
    address: FALLBACK_PAY_TO,
    configured: false,
  };
}

function getX402Network(): `${string}:${string}` {
  const configured = process.env.X402_NETWORK;
  if (configured && configured.includes(":")) {
    return configured as `${string}:${string}`;
  }

  return DEFAULT_NETWORK;
}

function getRouteConfig(description: string): RouteConfig {
  const { address } = resolvePayToAddress();

  return {
    accepts: [
      {
        scheme: "exact" as const,
        price: process.env.X402_PRICE_USD || "$0.01",
        network: getX402Network(),
        payTo: address,
      },
    ],
    description,
  };
}

export function getX402Server() {
  if (!globalThis.__sarafuX402Server) {
    const facilitator = new HTTPFacilitatorClient({
      url: process.env.X402_FACILITATOR_URL || DEFAULT_FACILITATOR_URL,
    });

    const server = new x402ResourceServer(facilitator);
    registerExactEvmScheme(server, {
      networks: [getX402Network()],
    });

    globalThis.__sarafuX402Server = server;
  }

  return globalThis.__sarafuX402Server;
}

export function withSarafuX402<T = unknown>(
  handler: (request: NextRequest) => Promise<NextResponse>,
  description: string,
) {
  if (process.env.DISABLE_X402 === "true") {
    return handler;
  }

  return withX402(handler, getRouteConfig(description), getX402Server());
}

export function getX402Health() {
  const payTo = resolvePayToAddress();

  return {
    enabled: process.env.DISABLE_X402 !== "true",
    configured: payTo.configured,
    payTo: payTo.address,
    network: getX402Network(),
    facilitatorUrl: process.env.X402_FACILITATOR_URL || DEFAULT_FACILITATOR_URL,
  };
}
