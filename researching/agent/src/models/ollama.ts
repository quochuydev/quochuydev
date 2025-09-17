// ollamaService.ts
export function createOllamaService(baseUrl = "http://localhost:11434") {
  async function generateAnswer(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma:3b", // or "gemma:7b" if installed
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) throw new Error(`error: ${response.statusText}`);
    const data = await response.json();

    return data.message?.content ?? "";
  }

  async function embed(text: string): Promise<number[]> {
    const response = await fetch(`${baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text:latest",
        input: text,
      }),
    });

    if (!response.ok) throw new Error(`Embed error: ${response.statusText}`);

    const data = await response.json();

    return data.embedding ?? [];
  }

  return { generateAnswer, embed };
}
