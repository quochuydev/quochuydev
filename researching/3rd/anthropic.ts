import Anthropic from "@anthropic-ai/sdk";

export function createAnthropicService(apiKey: string | undefined) {
  if (!apiKey) throw new Error("apiKey is not defined");

  const client = new Anthropic({ apiKey });

  async function generateAnswer(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 1024,
    });

    return response.content.find((c) => c.type === "text")?.text ?? "";
  }

  async function embed(text: string): Promise<number[]> {
    throw new Error("Not implemented");
  }

  return { generateAnswer, embed };
}
