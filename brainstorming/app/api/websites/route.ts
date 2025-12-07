import { db, websites } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';
import Anthropic from '@anthropic-ai/sdk';

const SESSION_COOKIE_NAME = 'session_id';

const anthropic = new Anthropic({
  baseURL: process.env.GLM_BASE_URL,
  apiKey: process.env.GLM_API_KEY,
});

async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname;
  } catch {
    return url;
  }
}

function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) {
    return `https://${url}`;
  }
  return url;
}

async function researchWebsite(url: string): Promise<{
  name: string;
  description: string;
  mainColor: string;
}> {
  try {
    const response: any = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      system: `You are a website analyst. Given a URL, provide information about the website/brand.
Return ONLY valid JSON with these fields:
- name: The brand/company name (string)
- description: Brief description of what the website/company does (string, max 100 chars)
- mainColor: The primary brand color as a hex code (string, e.g., "#FF5733")

If you're unsure, make reasonable guesses based on the domain name.
Return ONLY the JSON object, no other text.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this website and provide brand information: ${url}`,
        },
      ],
    });

    const textContent = response.content.find((c: any) => c.type === 'text')?.text;

    if (textContent) {
      try {
        const parsed = JSON.parse(textContent.trim());
        return {
          name: parsed.name || extractDomain(url),
          description: parsed.description || '',
          mainColor: parsed.mainColor || '#6366f1',
        };
      } catch {
        // Try to extract JSON from response
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            name: parsed.name || extractDomain(url),
            description: parsed.description || '',
            mainColor: parsed.mainColor || '#6366f1',
          };
        }
      }
    }
  } catch (error) {
    console.error('Website research error:', error);
  }

  // Fallback
  return {
    name: extractDomain(url),
    description: '',
    mainColor: '#6366f1',
  };
}

// GET - List all websites for session
export async function GET() {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const allWebsites = await db
      .select()
      .from(websites)
      .where(eq(websites.sessionId, sessionId));

    return Response.json({ websites: allWebsites });
  } catch (error) {
    console.error('Websites GET error:', error);
    return Response.json({ error: 'Failed to fetch websites' }, { status: 500 });
  }
}

// POST - Add and research a new website
export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: 'URL is required' }, { status: 400 });
    }

    const normalizedUrl = normalizeUrl(url);
    const domain = extractDomain(normalizedUrl);

    // Check if website already exists for this session
    const existing = await db
      .select()
      .from(websites)
      .where(and(eq(websites.sessionId, sessionId), eq(websites.domain, domain)));

    if (existing.length > 0) {
      return Response.json({ website: existing[0] });
    }

    // Research the website
    const research = await researchWebsite(normalizedUrl);

    // Insert new website
    const result = await db.insert(websites).values({
      sessionId,
      url: normalizedUrl,
      domain,
      name: research.name,
      description: research.description,
      mainColor: research.mainColor,
    }).returning();

    return Response.json({ website: result[0] });
  } catch (error) {
    console.error('Websites POST error:', error);
    return Response.json({ error: 'Failed to add website' }, { status: 500 });
  }
}

// DELETE - Remove a website
export async function DELETE(request: Request) {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: 'Website ID is required' }, { status: 400 });
    }

    await db
      .delete(websites)
      .where(and(eq(websites.sessionId, sessionId), eq(websites.id, id)));

    return Response.json({ success: true });
  } catch (error) {
    console.error('Websites DELETE error:', error);
    return Response.json({ error: 'Failed to delete website' }, { status: 500 });
  }
}
