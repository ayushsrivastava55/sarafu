import OpenAI from "openai";
import { TOOLS } from "./tools.js";
import { executeTool } from "./executor.js";
import { SYSTEM_PROMPT } from "./system-prompt.js";
import { saveConversationLog } from "../utils/logger.js";

const venice = new OpenAI({
  apiKey: process.env.VENICE_API_KEY,
  baseURL: "https://api.venice.ai/api/v1",
});

// GLM 4.7 — Venice's best function calling model (128K context, reasoning + tools)
const MODEL = "zai-org-glm-4.7";

type Message = OpenAI.ChatCompletionMessageParam;

export class SarafuAgent {
  private messages: Message[] = [];
  private conversationLog: Array<{ role: string; content: string; timestamp: string }> = [];

  constructor() {
    this.messages = [{ role: "system", content: SYSTEM_PROMPT }];
  }

  private log(role: string, content: string) {
    this.conversationLog.push({
      role,
      content,
      timestamp: new Date().toISOString(),
    });
  }

  async chat(userMessage: string): Promise<string> {
    this.messages.push({ role: "user", content: userMessage });
    this.log("user", userMessage);

    // Agent loop — keeps running until LLM produces a text response (no more tool calls)
    while (true) {
      const response = await venice.chat.completions.create({
        model: MODEL,
        messages: this.messages,
        tools: TOOLS,
        tool_choice: "auto",
        parallel_tool_calls: true,
        // Venice-specific: take full control, no default system prompt injection
        // @ts-ignore — Venice-specific parameter
        venice_parameters: {
          include_venice_system_prompt: false,
        },
      });

      const choice = response.choices[0].message;

      // Strip <think> blocks from reasoning models if present
      if (choice.content) {
        choice.content = choice.content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
      }

      // Add assistant message to history
      this.messages.push(choice as Message);

      // If the LLM called tools, execute them and loop back
      if (choice.tool_calls && choice.tool_calls.length > 0) {
        for (const toolCall of choice.tool_calls) {
          const fnName = (toolCall as any).function.name;
          const fnArgs = JSON.parse((toolCall as any).function.arguments);

          console.log(`  [tool] ${fnName}(${JSON.stringify(fnArgs)})`);
          this.log("tool_call", `${fnName}(${JSON.stringify(fnArgs)})`);

          let result: string;
          try {
            result = await executeTool(fnName, fnArgs);
          } catch (err: any) {
            result = JSON.stringify({ error: err.message });
          }

          console.log(`  [result] ${result.slice(0, 200)}${result.length > 200 ? "..." : ""}`);
          this.log("tool_result", result);

          this.messages.push({
            role: "tool",
            tool_call_id: (toolCall as any).id,
            content: result,
          } as Message);
        }
        // Loop back — LLM sees tool results and decides next step
        continue;
      }

      // LLM produced a text response — return it
      const text = choice.content || "";
      this.log("assistant", text);
      return text;
    }
  }

  async saveLog(filename?: string) {
    await saveConversationLog(this.conversationLog, filename);
  }

  getConversationLog() {
    return this.conversationLog;
  }
}
