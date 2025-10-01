import OpenAI from "openai";

export function createDeepSeekService(apiKey: string | undefined) {
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not defined");

  const client = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey,
  });

  async function generateAnswer(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_completion_tokens: 10000,
    });

    return response.choices[0]?.message?.content ?? "";
  }

  async function embed(text: string): Promise<number[]> {
    throw new Error("Not implemented");
  }

  return { generateAnswer, embed };
}
