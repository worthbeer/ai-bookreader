import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { searchBookSegments, getBookById } from '@/lib/actions/book.actions';

// Helper function to process book search logic
async function processBookSearch(bookId: unknown, query: unknown) {
  // Validate inputs before conversion to prevent null/undefined becoming "null"/"undefined" strings
  if (bookId == null || query == null || query === '') {
    return { result: 'Missing bookId or query' };
  }

  // Convert bookId to string
  const bookIdStr = String(bookId);
  const queryStr = String(query).trim();

  // Additional validation after conversion
  if (!bookIdStr || bookIdStr === 'null' || bookIdStr === 'undefined' || !queryStr) {
    return { result: 'Missing bookId or query' };
  }

  // Execute search
  const searchResult = await searchBookSegments(bookIdStr, queryStr, 3);

  // Return results
  if (!searchResult.success || !searchResult.data?.length) {
    return { result: 'No information found about this topic in the book.' };
  }

  const combinedText = searchResult.data
      .map((segment) => (segment as { content: string }).content)
      .join('\n\n');

  return { result: combinedText };
}

/**
 * Verify that the currently authenticated Clerk user owns the requested book.
 * Returns { authorized: true } on success, or { authorized: false, response } with
 * a ready-to-return NextResponse on failure (401 / 403 / 404).
 */
async function authorizeBookAccess(bookId: unknown): Promise<
  { authorized: true } | { authorized: false; response: NextResponse }
> {
  const { userId } = await auth();

  if (!userId) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  if (bookId == null || bookId === '') {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Missing bookId' }, { status: 400 }),
    };
  }

  const bookIdStr = String(bookId);
  if (bookIdStr === 'null' || bookIdStr === 'undefined') {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Invalid bookId' }, { status: 400 }),
    };
  }

  const bookResult = await getBookById(bookIdStr);

  if (!bookResult.success || !bookResult.data) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Book not found' }, { status: 404 }),
    };
  }

  if (bookResult.data.clerkId !== userId) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }

  return { authorized: true };
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

// Parse tool arguments that may arrive as a JSON string or an object
function parseArgs(args: unknown): Record<string, unknown> {
  if (!args) return {};
  if (typeof args === 'string') {
    try { return JSON.parse(args); } catch { return {}; }
  }
  return args as Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('Vapi search-book request:', JSON.stringify(body, null, 2));

    // Support multiple Vapi formats
    const functionCall = body?.message?.functionCall;
    const toolCallList = body?.message?.toolCallList || body?.message?.toolCalls;

    // Handle single functionCall format
    if (functionCall) {
      const { name, parameters } = functionCall;
      const parsed = parseArgs(parameters);

      if (name === 'searchBook') {
        const authCheck = await authorizeBookAccess(parsed.bookId);
        if (!authCheck.authorized) {
          return authCheck.response;
        }

        const result = await processBookSearch(parsed.bookId, parsed.query);
        return NextResponse.json(result);
      }

      return NextResponse.json({ result: `Unknown function: ${name}` });
    }

    // Handle toolCallList format (array of calls)
    if (!toolCallList || toolCallList.length === 0) {
      return NextResponse.json({
        results: [{ result: 'No tool calls found' }],
      });
    }

    const results = [];

    for (const toolCall of toolCallList) {
      const { id, function: func } = toolCall;
      const name = func?.name;
      const args = parseArgs(func?.arguments);

      if (name === 'searchBook') {
        const authCheck = await authorizeBookAccess(args.bookId);
        if (!authCheck.authorized) {
          // Return the error response directly so the caller sees it immediately
          return authCheck.response;
        }

        const searchResult = await processBookSearch(args.bookId, args.query);
        results.push({ toolCallId: id, ...searchResult });
      } else {
        results.push({ toolCallId: id, result: `Unknown function: ${name}` });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Vapi search-book error:', error);
    return NextResponse.json({
      results: [{ result: 'Error processing request' }],
    });
  }
}