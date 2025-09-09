import OpenAI from "openai";

export function createOpenAIService(apiKey: string | undefined) {
  if (!apiKey) throw new Error("OPENAI_API_KEY is not defined");

  const client = new OpenAI({ apiKey });

  async function generateAnswer(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
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
    });

    return response.choices[0]?.message?.content ?? "";
  }

  async function embed(text: string): Promise<number[]> {
    const embedding = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return embedding.data[0].embedding;
  }

  return { generateAnswer, embed };
}
