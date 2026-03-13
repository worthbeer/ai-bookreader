import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not set.');
  console.error('   Set it before running this script:');
  console.error('   export MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<App>"');
  process.exit(1);
}

console.log('🧪 Testing MongoDB Connection...');
console.log('URI:', MONGODB_URI.replace(/:[^:@]*@/, ':****@'));

const testConnection = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      family: 4,
      retryWrites: true,
    });

    console.log('✅ Successfully connected to MongoDB!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', (error as Error).message);

    const message = (error as Error).message;
    if (message.includes('ECONNREFUSED') || message.includes('querySrv')) {
      console.error('\n💡 Solution: Add your current IP to MongoDB Atlas');
      console.error('   Run: curl https://api.ipify.org  to find your IP');
      console.error('   1. Go to https://cloud.mongodb.com/v2');
      console.error('   2. Network Access → Add IP Address');
      console.error('   3. Select "ALLOW ACCESS FROM ANYWHERE" for development');
    }

    process.exit(1);
  }
};

testConnection();

