import { SarafuAgentRuntime } from "@sarafu/core";

export class SarafuAgent {
  private readonly runtime = new SarafuAgentRuntime();
  private readonly sessionId = "cli";

  async chat(userMessage: string) {
    return this.runtime.chat({
      sessionId: this.sessionId,
      message: userMessage,
    });
  }

  async getConversationLog(): Promise<Array<{ role: string; content: string; timestamp: string }>> {
    return this.runtime.exportSessionLog(this.sessionId);
  }
}
