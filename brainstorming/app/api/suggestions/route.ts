import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  baseURL: process.env.GLM_BASE_URL,
  apiKey: process.env.GLM_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: Request) {
  try {
    const { conversation } = await request.json();

    const messages: Message[] = conversation || [];

    // If no conversation, return default starter suggestions
    if (messages.length === 0) {
      return Response.json({
        suggestions: [
          'I need help writing a proposal for a web development project',
          'Help me create a proposal for a mobile app',
          'I want to pitch a data analysis project',
          'Assist me with a design/UX proposal',
        ],
      });
    }

    const response: any = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      system: `You are a helpful assistant that suggests what the user might want to say next in a conversation about creating proposals.

Based on the conversation history, generate exactly 3-4 short, natural response options that the user might want to send next.

Rules:
- Each suggestion should be 5-15 words
- Suggestions should be contextually relevant to the last assistant message
- If the assistant asked a question, suggest possible answers
- If the assistant presented options, suggest ways to choose or ask for clarification
- Keep suggestions conversational and natural
- Return ONLY a JSON array of strings, nothing else

Example output format:
["Option A sounds good to me", "Can you explain option B more?", "What about combining both approaches?", "I prefer a simpler solution"]`,
      messages: [
        {
          role: 'user',
          content: `Here is the conversation so far:

${messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')}

Generate 3-4 suggested responses the user might want to send next. Return ONLY a JSON array of strings.`,
        },
      ],
    });

    let suggestions: string[] = [];

    // Parse the response
    const textContent = response.content.find(
      (c: any) => c.type === 'text',
    )?.text;

    if (textContent) {
      try {
        // Try to parse as JSON
        const parsed = JSON.parse(textContent.trim());
        if (Array.isArray(parsed)) {
          suggestions = parsed.slice(0, 4);
        }
      } catch {
        // If JSON parsing fails, try to extract from text
        const matches = textContent.match(/"([^"]+)"/g);
        if (matches) {
          suggestions = matches.map((m: string) => m.replace(/"/g, '')).slice(0, 4);
        }
      }
    }

    // Fallback suggestions if parsing failed
    if (suggestions.length === 0) {
      suggestions = [
        'Tell me more about that',
        'That sounds good, let\'s continue',
        'Can you clarify that point?',
        'What are the next steps?',
      ];
    }

    return Response.json({ suggestions });
  } catch (error) {
    console.error('Suggestions API error:', error);
    // Return fallback suggestions on error
    return Response.json({
      suggestions: [
        'Tell me more',
        'That sounds good',
        'Can you explain further?',
        'What do you recommend?',
      ],
    });
  }
}
