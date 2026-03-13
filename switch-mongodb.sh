#!/bin/bash

# MongoDB Environment Switcher
# Quickly switch between MongoDB Atlas and Local MongoDB
#
# Usage for option 1 (Atlas):
#   Export your Atlas connection string before running – never hard-code
#   credentials in this file. Obtain the URI from MongoDB Atlas → Connect → Drivers.
#
#   export NEW_MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<App>"
#   bash switch-mongodb.sh
#
# Alternatively, load it from a secrets manager (e.g., AWS Secrets Manager,
# 1Password CLI, HashiCorp Vault) and inject it at runtime.

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

    # The Atlas connection string must be supplied via the NEW_MONGODB_URI
    # environment variable – never hard-code credentials in this file.
    #
    # Set it before running this script, e.g.:
    #   export NEW_MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<App>"
    # Or store it in a secrets manager and inject it at runtime.
    if [ -z "${NEW_MONGODB_URI}" ]; then
      echo "❌ Error: NEW_MONGODB_URI environment variable is not set."
      echo ""
      echo "Please export your Atlas connection string first:"
      echo "  export NEW_MONGODB_URI=\"mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=<App>\""
      echo ""
      echo "Get this value from: MongoDB Atlas → Connect → Drivers"
      exit 1
    fi

    # Update .env.local using the value from the environment (no credentials in source)
    sed -i.bak "s|^MONGODB_URI=.*|MONGODB_URI=${NEW_MONGODB_URI}|" .env.local

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

