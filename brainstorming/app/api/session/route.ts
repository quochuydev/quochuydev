import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const SESSION_COOKIE_NAME = 'session_id';
const SESSION_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export async function GET() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/',
    });
  }

  return Response.json({ sessionId });
}
