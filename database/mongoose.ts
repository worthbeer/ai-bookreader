import mongoose from 'mongoose';

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

const MONGOOSE_OPTIONS = {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000, // Increase timeout from default 30s
    socketTimeoutMS: 45000,
    family: 4, // Force IPv4 to avoid DNS issues
    retryWrites: true,
    w: 'majority' as const,
};

export const connectToDatabase = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    if (cached.conn) {
        console.info('Using cached MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS);
    }

    try {
        cached.conn = await cached.promise;
        console.info('✓ Connected to MongoDB successfully');
    } catch (e) {
        cached.promise = null;

        const errorMessage = e instanceof Error ? e.message : String(e);

        if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('querySrv')) {
            console.error('❌ MongoDB Connection Error: Cannot reach MongoDB Atlas');
            console.error('Possible causes:');
            console.error('  1. Internet connection is down');
            console.error('  2. Firewall/VPN is blocking the connection');
            console.error('  3. MongoDB Atlas cluster is down');
            console.error('  4. Your IP address is not whitelisted in MongoDB Atlas');
            console.error('  5. Wrong connection string or credentials');
            console.error('\nTo fix:');
            console.error('  1. Check your internet connection');
            console.error('  2. Go to https://cloud.mongodb.com and verify your cluster is running');
            console.error('  3. Add your IP to MongoDB Atlas Network Access whitelist');
            console.error('  4. Verify MONGODB_URI in .env.local is correct');
        } else if (errorMessage.includes('authentication failed')) {
            console.error('❌ MongoDB Authentication Error: Invalid credentials');
            console.error('Check your username/password in the connection string');
        }

        console.error('\nFull error:', errorMessage);
        throw e;
    }

    return cached.conn;
}

export class connecttoDatabase {
}