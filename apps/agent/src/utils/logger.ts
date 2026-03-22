import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function saveConversationLog(
  log: Array<{ role: string; content: string; timestamp: string }>,
  filename?: string
) {
  const logsDir = join(process.cwd(), "logs");
  await mkdir(logsDir, { recursive: true });

  const fname = filename || `conversation-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  const filepath = join(logsDir, fname);

  await writeFile(filepath, JSON.stringify(log, null, 2));
  console.log(`\n[Sarafu] Conversation log saved to ${filepath}`);
}
