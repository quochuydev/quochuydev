import { createAnthropicService } from "./anthropic";
import { createDeepSeekService } from "./deepseek";
import { createOllamaService } from "./ollama";
import { createOpenAIService } from "./openai";

export const createLLMService = (
  llm:
    | "anthropic"
    | "openai"
    | "deepseek-chat"
    | "codellama:7b"
    | "gemma3:4b"
    | "llama3.1:8b"
) => {
  if (llm === "anthropic") {
    return createAnthropicService(process.env.ANTHROPIC_API_KEY);
  }

  if (llm === "openai") {
    return createOpenAIService(process.env.OPENAI_API_KEY);
  }

  if (llm === "deepseek-chat") {
    return createDeepSeekService(process.env.DEEPSEEK_API_KEY);
  }

  return createOllamaService(llm);
};
