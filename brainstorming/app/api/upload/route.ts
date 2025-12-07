import { put } from '@vercel/blob';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'session_id';

// Security limits
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES_PER_REQUEST = 5;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_TEXT_TYPES = [
  'text/plain',
  'text/markdown',
  'text/csv',
  'text/html',
  'text/css',
  'text/javascript',
  'application/json',
  'application/xml',
];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_TEXT_TYPES];

async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function POST(request: Request) {
  try {
    const sessionId = await getSessionId();

    if (!sessionId) {
      return Response.json({ error: 'No session found' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return Response.json({ error: 'No files provided' }, { status: 400 });
    }

    // Limit number of files per request
    if (files.length > MAX_FILES_PER_REQUEST) {
      return Response.json(
        { error: `Maximum ${MAX_FILES_PER_REQUEST} files per request` },
        { status: 400 }
      );
    }

    // Validate all files before uploading
    for (const file of files) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return Response.json(
          { error: `File "${file.name}" exceeds maximum size of 10MB` },
          { status: 400 }
        );
      }

      // Check file type (allow common types, be permissive for text files)
      const isAllowedType = ALLOWED_TYPES.includes(file.type) ||
        file.type.startsWith('text/') ||
        file.name.match(/\.(txt|md|json|js|ts|tsx|jsx|css|html|xml|yaml|yml|csv|log|py|rb|java|c|cpp|h|sh|sql)$/i);

      if (!isAllowedType) {
        return Response.json(
          { error: `File type "${file.type}" is not allowed` },
          { status: 400 }
        );
      }
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const isImage = file.type.startsWith('image/');
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 100);
        const path = `chat/${sessionId}/${timestamp}-${safeName}`;

        const blob = await put(path, file, {
          access: 'public',
          contentType: file.type,
        });

        return {
          name: file.name,
          type: file.type,
          size: file.size,
          url: blob.url,
          isImage,
        };
      })
    );

    return Response.json({ files: uploadedFiles });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Failed to upload files' }, { status: 500 });
  }
}
