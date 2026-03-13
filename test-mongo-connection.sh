#!/bin/bash
# Test MongoDB Atlas connection with Node.js

cat > /tmp/test-mongo.js << 'EOF'
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aibookstore_db_user:NojuSibwnmcTNMLF@cluster0.hljmdgt.mongodb.net/?appName=Cluster0';

console.log('🧪 Testing MongoDB Connection...');
console.log('Using URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@'));
console.log('');

const testConnection = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4
    });

    console.log('✅ Successfully connected to MongoDB!');
    console.log('Server version:', conn.version);

    // List databases
    const admin = conn.connection.getClient().db('admin');
    const { databases } = await admin.admin().listDatabases();
    console.log('Databases:', databases.map(d => d.name).join(', '));

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Fix: Add your IP to MongoDB Atlas Network Access whitelist');
      console.error('   IP Address: 172.56.164.242');
      console.error('   1. Go to https://cloud.mongodb.com');
      console.error('   2. Network Access → Add IP Address → Allow Access From Anywhere');
    } else if (error.message.includes('authentication failed')) {
      console.error('\n💡 Fix: Check your MongoDB credentials');
    }

    process.exit(1);
  }
};

testConnection();
EOF

node /tmp/test-mongo.js

