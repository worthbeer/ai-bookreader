'use server';
import {EndSessionResult,StartSessionResult} from "@/types";
import { connectToDatabase } from "@/database/mongoose";
import VoiceSession from "@/database/models/voicesession.model";
import { getCurrentBillingPeriodStart } from "@/lib/subscription-constants";
import { auth } from '@clerk/nextjs/server';


export const startVoiceSession = async (bookId: string): Promise<StartSessionResult> => {
    try {
        // Derive identity from the authenticated session — never trust caller-supplied IDs
        const { userId: authenticatedClerkId } = await auth();
        if (!authenticatedClerkId) {
            return { success: false, error: 'Unauthorized: you must be signed in to start a session.' };
        }

        await connectToDatabase();
        // Limits/Plan to see if user can start session
        const session = await VoiceSession.create({
            clerkId: authenticatedClerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart: getCurrentBillingPeriodStart(),
            durationSeconds: 0, // Will be updated when session ends
        });
        return {
            success: true,
            sessionId: session._id.toString(),
        };
    } catch(e) {
        console.error('Error starting voice session', e);
        return {
            success: false,
            error: 'An error occurred while starting the voice session',
        };
    }
};

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        // Derive identity from the authenticated session so we can scope the update
        const { userId: authenticatedClerkId } = await auth();
        if (!authenticatedClerkId) {
            return { success: false, error: 'Unauthorized: you must be signed in to end a session.' };
        }

        await connectToDatabase();

        // Include clerkId in the query to prevent one user from ending another user's session
        const result = await VoiceSession.findOneAndUpdate(
            { _id: sessionId, clerkId: authenticatedClerkId },
            { endedAt: new Date(), durationSeconds },
        );

        if (!result) return { success: false, error: 'Voice session not found.' };

        return { success: true };
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' };
    }
};
