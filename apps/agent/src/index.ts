import "dotenv/config";
import * as readline from "readline";
import { SarafuAgent } from "./agent/loop.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                    SARAFU                             ║
  ║     AI Remittance Agent on Celo                       ║
  ║                                                       ║
  ║  Send money across borders in <2s for <$0.001         ║
  ║  15+ currencies via Mento stablecoins                 ║
  ║  Privacy: Venice AI (zero data retention)             ║
  ║                                                       ║
  ║  Try: "Send $50 to Kenya"                             ║
  ║       "How much is 200 USD in Nigerian Naira?"        ║
  ║       "Check my balance"                              ║
  ║       "Compare fees for sending $100"                 ║
  ║                                                       ║
  ║  Type 'quit' to exit, 'save' to export conversation   ║
  ╚═══════════════════════════════════════════════════════╝
  `);

  if (!process.env.VENICE_API_KEY) {
    console.error("[error] VENICE_API_KEY not set. Add it to .env");
    process.exit(1);
  }

  const agent = new SarafuAgent();

  while (true) {
    const input = await prompt("\nyou > ");
    const trimmed = input.trim();

    if (!trimmed) continue;

    if (trimmed.toLowerCase() === "quit" || trimmed.toLowerCase() === "exit") {
      await agent.saveLog();
      console.log("\n[Sarafu] Goodbye. Your money should move like a message — instant and free.");
      rl.close();
      process.exit(0);
    }

    if (trimmed.toLowerCase() === "save") {
      await agent.saveLog();
      continue;
    }

    try {
      const response = await agent.chat(trimmed);
      console.log(`\nsarafu > ${response}`);
    } catch (err: any) {
      console.error(`\n[error] ${err.message}`);
    }
  }
}

main().catch(console.error);
