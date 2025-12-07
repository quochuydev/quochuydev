import { db, settings, SETTING_KEYS } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'session_id';

// Default settings
const DEFAULT_SETTINGS: Record<string, string> = {
  [SETTING_KEYS.SUGGESTIONS_ENABLED]: 'true',
};

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

    const allSettings = await db
      .select()
      .from(settings)
      .where(eq(settings.sessionId, sessionId));

    // Convert to key-value object with defaults
    const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const setting of allSettings) {
      settingsMap[setting.key] = setting.value;
    }

    return Response.json({ settings: settingsMap });
  } catch (error) {
    console.error('Settings GET error:', error);
    return Response.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return Response.json({ error: 'Key and value are required' }, { status: 400 });
    }

    // Validate key is a known setting key
    const validKeys = Object.values(SETTING_KEYS);
    if (!validKeys.includes(key)) {
      return Response.json({ error: 'Invalid setting key' }, { status: 400 });
    }

    // Validate value length to prevent abuse
    const stringValue = String(value);
    if (stringValue.length > 1000) {
      return Response.json({ error: 'Value too long' }, { status: 400 });
    }

    // Check if setting exists for this session
    const existing = await db
      .select()
      .from(settings)
      .where(and(eq(settings.sessionId, sessionId), eq(settings.key, key)));

    if (existing.length > 0) {
      // Update existing
      await db
        .update(settings)
        .set({ value: String(value), updatedAt: new Date() })
        .where(and(eq(settings.sessionId, sessionId), eq(settings.key, key)));
    } else {
      // Insert new
      await db.insert(settings).values({
        sessionId,
        key,
        value: String(value),
      });
    }

    return Response.json({ success: true, key, value });
  } catch (error) {
    console.error('Settings PUT error:', error);
    return Response.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}
