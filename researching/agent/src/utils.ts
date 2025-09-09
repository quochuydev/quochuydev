import { encodingForModel } from "js-tiktoken";

export function chunkText(text: string, maxTokens = 8000) {
  const enc = encodingForModel("text-embedding-3-small");

  const tokens = enc.encode(text);
  const chunks: string[] = [];

  for (let i = 0; i < tokens.length; i += maxTokens) {
    const chunk = tokens.slice(i, i + maxTokens);
    chunks.push(enc.decode(chunk));
  }

  return chunks;
}
