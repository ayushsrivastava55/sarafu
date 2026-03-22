import "server-only";

import { QuoteStore, RemittanceService, SarafuAgentRuntime, getActiveNetworkKey, getRemittanceContractAddress } from "@sarafu/core";
import { getX402Health } from "@/lib/server/x402";

declare global {
  // eslint-disable-next-line no-var
  var __sarafuServer:
    | {
        quoteStore: QuoteStore;
        remittance: RemittanceService;
        runtime: SarafuAgentRuntime;
      }
    | undefined;
}

export function getSarafuServer() {
  if (!globalThis.__sarafuServer) {
    const quoteStore = new QuoteStore();
    const remittance = new RemittanceService(quoteStore);
    const runtime = new SarafuAgentRuntime({
      quoteStore,
      remittance,
    });

    globalThis.__sarafuServer = {
      quoteStore,
      remittance,
      runtime,
    };
  }

  return globalThis.__sarafuServer;
}

export function getHealthSnapshot() {
  const network = getActiveNetworkKey();

  return {
    network,
    walletConfigured: Boolean(process.env.PRIVATE_KEY),
    contractConfigured: Boolean(getRemittanceContractAddress(network)),
    veniceConfigured: Boolean(process.env.VENICE_API_KEY),
    x402: getX402Health(),
  };
}
