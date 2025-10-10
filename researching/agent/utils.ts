export function chunkText(text: string, maxLength = 8000): string[] {
  const chunks: string[] = [];

  for (let i = 0; i < text.length; i += maxLength) {
    const chunk = text.slice(i, i + maxLength);
    chunks.push(chunk);
  }

  return chunks;
}
