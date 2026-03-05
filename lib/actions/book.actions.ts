'use server'

import { CreateBook, TextSegment } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { Types } from 'mongoose'

// Storage backend configuration detection
function getStorageClient() {
  // Check for common database/storage client configurations
  const hasMongoose = !!process.env.MONGODB_URI
  const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasPrisma = !!process.env.DATABASE_URL
  const hasCustomClient = !!process.env.STORAGE_CLIENT_CONFIGURED

  const isConfigured = hasMongoose || hasSupabase || hasPrisma || hasCustomClient

  return {
    isConfigured,
    type: hasMongoose ? 'mongodb' : hasSupabase ? 'supabase' : hasPrisma ? 'prisma' : 'custom'
  }
}

/**
 * Helper function to validate that the authenticated user owns a book.
 * Throws an error if the user is not authenticated or does not own the book.
 *
 * @param _bookId - The ID of the book to validate ownership for (string or ObjectId)
 * @param _authenticatedUserId - The userId from auth() - used for ownership check only
 * @throws Error if user is not authenticated or does not own the book
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function validateBookOwnership(_bookId: string | Types.ObjectId, _authenticatedUserId: string): Promise<void> {
  const storage = getStorageClient()

  if (!storage.isConfigured) {
    throw new Error(
      'No storage backend configured. ' +
      'Cannot validate book ownership without a database connection.'
    )
  }

  // Placeholder: TODO - Implement real database query to check ownership
  // This should verify that the book exists and belongs to the authenticated user
  // Example: const book = await db.book.findById(bookId);
  //          if (!book || book.clerkId !== authenticatedUserId) throw new Error('Unauthorized');
  throw new Error(
    `Storage backend (${storage.type}) detected but ownership validation is not yet implemented. ` +
    'Please implement the real database query to verify book ownership.'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function checkBookExists(_title: string) {
  const storage = getStorageClient()

  if (!storage.isConfigured) {
    throw new Error(
      'No storage backend configured. ' +
      'Please set up a database connection (MONGODB_URI, NEXT_PUBLIC_SUPABASE_URL, or DATABASE_URL) ' +
      'and implement the real checkBookExists function.'
    )
  }

  // Placeholder: TODO - Implement real database query
  // This should query your database for an existing book with the given title
  throw new Error(
    `Storage backend (${storage.type}) detected but checkBookExists is not yet implemented. ` +
    'Please implement the real database query logic.'
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createBook(_bookData: CreateBook) {
  const storage = getStorageClient()

  if (!storage.isConfigured) {
    throw new Error(
      'No storage backend configured. ' +
      'Please set up a database connection (MONGODB_URI, NEXT_PUBLIC_SUPABASE_URL, or DATABASE_URL) ' +
      'and implement the real createBook function.'
    )
  }

  // Placeholder: TODO - Implement real database write
  // This should create a new book document in your database
  throw new Error(
    `Storage backend (${storage.type}) detected but createBook is not yet implemented. ` +
    'Please implement the real database write logic.'
  )
}

export async function saveBookSegments(
  _bookId: string | Types.ObjectId,
  _segments: TextSegment[]
) {
  // Get authenticated user from server-side auth
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized: User must be authenticated to save book segments.')
  }

  // Validate that the user owns this book before saving segments
  await validateBookOwnership(_bookId, userId)

  const storage = getStorageClient()

  if (!storage.isConfigured) {
    throw new Error(
      'No storage backend configured. ' +
      'Please set up a database connection (MONGODB_URI, NEXT_PUBLIC_SUPABASE_URL, or DATABASE_URL) ' +
      'and implement the real saveBookSegments function.'
    )
  }

  // Placeholder: TODO - Implement real database write
  // This should save text segments to your database
  // Note: Do NOT log raw bookId, userId, or segment content in production
  throw new Error(
    `Storage backend (${storage.type}) detected but saveBookSegments is not yet implemented. ` +
    'Please implement the real database write logic for segments.'
  )
}

