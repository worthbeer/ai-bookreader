#!/bin/bash

# MongoDB Local Setup Script
# This script sets up and tests local MongoDB for development

set -e

echo "🚀 MongoDB Local Development Setup"
echo "==================================="
echo ""

# Check if MongoDB is already installed and running
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is already running!"
    echo ""
    SKIP_INSTALL=true
else
    echo "📥 MongoDB Installation Check..."
    echo ""

    # Check if mongod binary exists
    if ! command -v mongod &> /dev/null; then
        echo "❌ MongoDB not installed. Installing now..."
        echo ""

        # Install MongoDB Community Edition
        if command -v brew &> /dev/null; then
            echo "📦 Installing via Homebrew..."
            brew tap mongodb/brew
            brew install mongodb-community
        else
            echo "❌ Homebrew not found. Please install MongoDB manually:"
            echo "   https://www.mongodb.com/try/download/community"
            exit 1
        fi
    else
        echo "✅ MongoDB is installed"
    fi

    echo ""
    echo "🔄 Starting MongoDB service..."

    if command -v brew &> /dev/null; then
        brew services start mongodb-community || echo "Note: MongoDB may already be running"
    else
        mongod --fork --logpath /tmp/mongod.log --dbpath ~/data/db 2>/dev/null || mongod --dbpath ~/data/db &
    fi

    sleep 2
fi

# Test local connection
echo ""
echo "🧪 Testing local MongoDB connection..."

# Create test script
cat > /tmp/test-local-mongo.js << 'EOF'
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ai-bookreader', {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('✅ Local MongoDB connection successful!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection failed:', err.message);
  process.exit(1);
});
EOF

# Run test from project directory
cd /Users/wmbierwerth/WebstormProjects/ai-bookreader
if npm exec node /tmp/test-local-mongo.js 2>&1 | grep -q "connection successful"; then
    echo "✅ Local MongoDB is working!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Update .env.local:"
    echo "      MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader"
    echo "   2. Start your app:"
    echo "      npm run dev"
else
    echo "❌ Local MongoDB connection test failed"
    echo "   Try running MongoDB manually:"
    echo "   mongod --dbpath ~/data/db"
fi

echo ""
echo "✨ Setup complete!"

