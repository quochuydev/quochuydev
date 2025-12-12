import Anthropic from '@anthropic-ai/sdk';
import { cookies } from 'next/headers';
import { db, messages, settings, SETTING_KEYS, type Message as DbMessage } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { getAgent, AgentId } from '@/lib/agents';

const SESSION_COOKIE_NAME = 'session_id';

const anthropic = new Anthropic({
  baseURL: process.env.GLM_BASE_URL,
  apiKey: process.env.GLM_API_KEY,
});

interface AttachedFile {
  name: string;
  type: string;
  size: number;
  url?: string; // Blob URL
  content?: string; // base64 or text content
  isImage: boolean;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type ImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

type ContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; source: { type: 'base64'; media_type: ImageMediaType; data: string } };

// Fetch image from URL and convert to base64
async function fetchImageAsBase64(url: string): Promise<{ data: string; mediaType: ImageMediaType } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const supportedTypes: ImageMediaType[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!supportedTypes.includes(contentType as ImageMediaType)) return null;

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return {
      data: base64,
      mediaType: contentType as ImageMediaType,
    };
  } catch (error) {
    console.error('Failed to fetch image:', error);
    return null;
  }
}

async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function GET() {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const sessionMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.sessionId, sessionId))
      .orderBy(messages.createdAt);

    return Response.json({
      messages: sessionMessages.map((m: DbMessage) => ({
        role: m.role,
        content: m.content,
        metadata: m.metadata ? JSON.parse(m.metadata) : null,
        files: m.files ? JSON.parse(m.files) : null,
      })),
    });
  } catch (error) {
    console.error('Messages GET error:', error);
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    await db.delete(messages).where(eq(messages.sessionId, sessionId));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Messages DELETE error:', error);
    return Response.json({ error: 'Failed to clear messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const { message, conversation, files } = await request.json() as {
      message: string;
      conversation: Message[];
      files?: AttachedFile[];
    };

    // Get selected agent from settings
    const agentSetting = await db
      .select()
      .from(settings)
      .where(and(eq(settings.sessionId, sessionId), eq(settings.key, SETTING_KEYS.SELECTED_AGENT)));

    const agentId = (agentSetting[0]?.value || 'assistant') as AgentId;
    const agent = getAgent(agentId);

    const conversationMessages: Message[] = [
      ...conversation,
      {
        role: 'user',
        content: message,
      },
    ];

    // Prepare files for storage (only keep url, name, type, size, isImage - not content)
    const filesToStore = files?.map((f) => ({
      name: f.name,
      type: f.type,
      size: f.size,
      url: f.url,
      isImage: f.isImage,
    }));

    // Save user message to database
    await db.insert(messages).values({
      sessionId,
      role: 'user',
      content: message,
      files: filesToStore && filesToStore.length > 0 ? JSON.stringify(filesToStore) : null,
    });

    // Build content blocks for the current message (with images if present)
    const buildContentBlocks = async (text: string, attachedFiles?: AttachedFile[]): Promise<ContentBlock[] | string> => {
      if (!attachedFiles || attachedFiles.length === 0) {
        return text;
      }

      const blocks: ContentBlock[] = [];

      // Add images first
      const supportedMediaTypes: ImageMediaType[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      for (const file of attachedFiles) {
        if (file.isImage) {
          // Prefer URL-based images (from blob storage) - fetch and convert to base64
          if (file.url) {
            const imageData = await fetchImageAsBase64(file.url);
            if (imageData) {
              blocks.push({
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: imageData.mediaType,
                  data: imageData.data,
                },
              });
            }
          } else if (file.content && file.content.startsWith('data:')) {
            // Fallback to base64 from client if no URL
            const matches = file.content.match(/^data:([^;]+);base64,(.+)$/);
            if (matches) {
              const mediaType = matches[1] as string;
              // Only add if it's a supported media type
              if (supportedMediaTypes.includes(mediaType as ImageMediaType)) {
                blocks.push({
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: mediaType as ImageMediaType,
                    data: matches[2],
                  },
                });
              }
            }
          }
        }
      }

      // Add text content
      if (text) {
        blocks.push({ type: 'text', text });
      }

      return blocks.length > 0 ? blocks : text;
    };

    // Build messages for the API - only the last message gets image attachments
    const apiMessages = await Promise.all(
      conversationMessages.map(async (msg, index) => {
        const isLastUserMessage = index === conversationMessages.length - 1 && msg.role === 'user';
        return {
          role: (msg.role || 'user') as 'user' | 'assistant',
          content: isLastUserMessage ? await buildContentBlocks(msg.content, files) : msg.content,
        };
      })
    );

    const response: any = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4096,
      system: agent.systemPrompt,
      messages: apiMessages,
    });

    let assistantResponse = '';

    // Handle response content
    for (const content of response.content) {
      if (content.type === 'text') {
        assistantResponse = content.text;
      }
    }

    // Build metadata for assistant message
    const metadata = {
      agentId: agent.id,
      agentName: agent.name,
      model: 'claude-3-sonnet-20240229',
    };

    // Save assistant message to database
    await db.insert(messages).values({
      sessionId,
      role: 'assistant',
      content: assistantResponse,
      metadata: JSON.stringify(metadata),
    });

    return Response.json({
      reply: assistantResponse,
      metadata,
      conversation: [
        ...conversationMessages,
        {
          role: 'assistant' as const,
          content: assistantResponse,
          metadata,
        },
      ],
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
