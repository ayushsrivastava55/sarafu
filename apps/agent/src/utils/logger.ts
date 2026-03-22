import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

function redact(value: string): string {
  return value
    .replace(/\b0x[a-fA-F0-9]{40}\b/g, "[wallet]")
    .replace(/\$?\b\d+(?:[.,]\d+)?\b(?:\s?(?:usd|eur|gbp|kes|ngn|php|brl|zar|cop|xof|ghs|jpy|chf|aud|cad))?/gi, "[amount]");
}

export async function saveConversationLog(
  log: Array<{ role: string; content: string; timestamp: string }>,
  filename?: string,
) {
  const logsDir = join(process.cwd(), "logs");
  await mkdir(logsDir, { recursive: true });

  const fname = filename || `conversation-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  const filepath = join(logsDir, fname);
  const safeLog = log.map((entry) => ({
    ...entry,
    content: redact(entry.content),
  }));

  await writeFile(filepath, JSON.stringify(safeLog, null, 2));
  console.log(`\n[Sarafu] Redacted conversation log saved to ${filepath}`);
}
