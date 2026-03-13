'use server'

import { CreateBook, TextSegment } from '@/types'
import { Types } from 'mongoose'
import { connectToDatabase } from '@/database/mongoose'
import Book from '@/database/models/book.model'
import BookSegment from '@/database/models/booksegment.model'
import { generateSlug, serializeData } from '@/lib/utils'

function serializeError(error: unknown) {
    if (error instanceof Error) {
        return {
            message: error.message,
            name: error.name,
            stack: error.stack,
        }
    }

    return {
        message: String(error),
    }
}

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

export const getAllBooks = async () => {
    try {
        await connectToDatabase();
        const books = await Book.find().sort({createdAt:-1}).lean();
        return {
            success: true,
            data: serializeData(books),
        }
    } catch (e) {
        console.error('Error fetching all books:', e);
        return {
            success: false,
            error: serializeError(e),
        }
    }
}

export const getBookBySlug = async (slug: string) => {
    try {
        await connectToDatabase();
        const book = await Book.findOne({ slug }).lean();

        if (!book) {
            return {
                success: false,
                error: { message: 'Book not found.' },
            };
        }

        return {
            success: true,
            data: serializeData(book),
        };
    } catch (e) {
        console.error('Error fetching book by slug:', e);
        return {
            success: false,
            error: serializeError(e),
        };
    }
}

export async function validateBookOwnership(_bookId: string | Types.ObjectId, _authenticatedUserId: string): Promise<void> {
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


export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();
        const slug = generateSlug(title)
        const existingBook = await Book.findOne({ slug }).lean()
        if (existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook),
            }
        }
        return{
            exists: false,
        }
    } catch(e) {
        console.error('Error checking if book exists:', e);
        return {
            success: false,
            error: serializeError(e),
        }
    }
}

export const createBook = async (data: CreateBook) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(data.title);

        const existingBook = await Book.findOne({slug}).lean();

        if(existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true,
            }
        }

        // Todo: Check subscription limits before creating a book
        const { getUserPlan } = await import("@/lib/subscription.server");
        const { PLAN_LIMITS } = await import("@/lib/subscription-constants");

        const { auth } = await import("@clerk/nextjs/server");
        const { userId } = await auth();

        if (!userId || userId !== data.clerkId) {
            return { success: false, error: "Unauthorized" };
        }

        const plan = await getUserPlan();
        const limits = PLAN_LIMITS[plan];

        const bookCount = await Book.countDocuments({ clerkId: userId });

        if (bookCount >= limits.maxBooks) {
            return {
                success: false,
                error: `You have reached the maximum number of books allowed for your ${plan} plan (${limits.maxBooks}). Please upgrade to add more books.`,
                isBillingError: true,
            };
        }

        const book = await Book.create({...data, clerkId: userId, slug, totalSegments: 0});
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/");

        return {
            success: true,
            data: serializeData(book),
        }
    } catch (e) {
        console.error('Error creating a book', e);

        return {
            success: false,
            error: serializeError(e),
        }
    }
}

export const saveBookSegments= async ( bookId:string, clerkId:string, segments:TextSegment[]) => {
    try{
        await connectToDatabase();
        console.log(`Saving ${segments.length} segments for book ${bookId} and user ${clerkId}...`)

        if (!Types.ObjectId.isValid(bookId)) {
            return {
                success: false,
                error: { message: 'Invalid book ID.' },
            }
        }

        const book = await Book.findById(bookId).select('clerkId').lean()

        if (!book) {
            return {
                success: false,
                error: { message: 'Book not found.' },
            }
        }

        if (book.clerkId !== clerkId) {
            return {
                success: false,
                error: { message: 'Unauthorized: you do not own this book.' },
            }
        }

        const segmentsToInsert = segments.map(({text, segmentIndex, pageNumber, wordCount}) => ({
            clerkId, bookId, content: text, segmentIndex, wordCount, pageNumber
        }))
        await BookSegment.insertMany(segmentsToInsert)
        await Book.findByIdAndUpdate(bookId, {totalSegments:segments.length} )
        console.log(`Successfully saved ${segments.length} segments for book ${bookId}.`)

        return {
            success: true,
            data: { segmentsCreated: segments.length}
        }
    } catch (e) {
        console.error('Error saving book segments', e);

        return {
            success: false,
            error: serializeError(e),
        }
    }
}

export const searchBookSegments = async (
  bookId: string,
  query: string,
  numberOfSegments = 3,
) => {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(bookId)) {
      return {
        success: false,
        error: { message: 'Invalid book ID.' },
      };
    }

    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return {
        success: true,
        data: [],
      };
    }

    const limit = Math.max(1, Math.min(numberOfSegments, 10));

    const segments = await BookSegment.find(
      {
        bookId,
        $text: { $search: cleanQuery },
      },
      {
        content: 1,
        segmentIndex: 1,
        pageNumber: 1,
        score: { $meta: 'textScore' },
      },
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit)
      .lean();

    return {
      success: true,
      data: serializeData(segments),
    };
  } catch (e) {
    console.error('Error searching book segments:', e);
    return {
      success: false,
      error: serializeError(e),
    };
  }
};
