import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@clerk/nextjs/server';
import { MAX_FILE_SIZE } from '@/lib/constants';

export async function POST(request: Request): Promise<NextResponse> {
  const blobToken = process.env.bookinator_READ_WRITE_TOKEN;

  if (!blobToken) {
    return NextResponse.json(
      { error: 'Missing upload token environment variable (bookinator_READ_WRITE_TOKEN).' },
      { status: 500 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      token: blobToken,
      body,
      request,
      onBeforeGenerateToken: async () => {
        const { userId } = await auth();
        if (!userId) {
          throw new Error('Unauthorized: User not authenticated');
        }

        return {
          allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_FILE_SIZE,
          tokenPayload: JSON.stringify({ userId }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('File uploaded to Vercel Blob Storage:', blob.url);
        const payload = tokenPayload ? JSON.parse(tokenPayload) : null;
        const userId = payload?.userId;
        void userId;
        // Todo: PostHog
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    const status = message.includes('Unauthorized') ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}