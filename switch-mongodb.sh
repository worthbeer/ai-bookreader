#!/bin/bash

# MongoDB Environment Switcher
# Quickly switch between MongoDB Atlas and Local MongoDB

echo "🔄 MongoDB Environment Switcher"
echo "==============================="
echo ""
echo "Select your MongoDB configuration:"
echo ""
echo "1) MongoDB Atlas (Cloud)"
echo "2) Local MongoDB"
echo "3) Show current configuration"
echo "4) Test connection"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo ""
    echo "Switching to MongoDB Atlas..."

    # Update .env.local
    sed -i.bak 's|^MONGODB_URI=mongodb://.*|MONGODB_URI=<REDACTED_ATLAS_URI>|' .env.local

    echo "✅ Updated .env.local to use MongoDB Atlas"
    echo ""
    echo "⚠️ Important: Make sure to whitelist your IP!"
    echo "Your IP: $(curl -s https://api.ipify.org)"
    echo ""
    echo "Steps:"
    echo "1. Go to https://cloud.mongodb.com/v2"
    echo "2. Network Access → Add IP Address → Allow Access From Anywhere"
    echo "3. Click Confirm and wait 1-2 minutes"
    echo "4. Test with: npx ts-node test-mongodb.ts"
    ;;

  2)
    echo ""
    echo "Switching to Local MongoDB..."

    # Update .env.local
    sed -i.bak 's|^MONGODB_URI=.*|MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader|' .env.local

    echo "✅ Updated .env.local to use Local MongoDB"
    echo ""
    echo "Starting MongoDB service..."
    brew services start mongodb-community 2>/dev/null || echo "MongoDB may already be running"

    sleep 1
    echo ""
    echo "Test with: npx ts-node test-mongodb.ts"
    ;;

  3)
    echo ""
    echo "Current Configuration:"
    echo "---------------------"
    grep "MONGODB_URI" .env.local
    ;;

  4)
    echo ""
    echo "Testing MongoDB connection..."
    npx ts-node test-mongodb.ts
    ;;

  *)
    echo "Invalid choice"
    ;;
esac

echo ""

