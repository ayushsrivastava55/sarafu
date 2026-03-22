import "dotenv/config";
import * as readline from "readline";
import { SarafuAgent } from "./agent/loop.js";
import { saveConversationLog } from "./utils/logger.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log(`
  ================================================
                    SARAFU CLI
      AI Remittance Agent on Celo + Venice AI
  ================================================
  Try:
    "Send 50 USD to Kenya"
    "How much is 200 USD in NGN?"
    "Check my balance"
    "Compare fees for sending 100"

  Type "save" to export a redacted conversation log.
  Type "quit" to exit.
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
      console.log("\n[Sarafu] Goodbye.");
      rl.close();
      process.exit(0);
    }

    if (trimmed.toLowerCase() === "save") {
      await saveConversationLog(await agent.getConversationLog());
      continue;
    }

    try {
      const response = await agent.chat(trimmed);

      for (const trace of response.toolTrace) {
        console.log(`  [tool] ${trace.name}(${JSON.stringify(trace.args)})`);
        console.log(`  [result] ${JSON.stringify(trace.result).slice(0, 240)}`);
      }

      console.log(`\nsarafu > ${response.assistantText}`);
    } catch (err: any) {
      console.error(`\n[error] ${err.message}`);
    }
  }
}

main().catch(console.error);
