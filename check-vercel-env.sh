#!/bin/bash

# Vercel Environment Variables Setup Script
# Run this after you've manually added the env vars in Vercel dashboard to verify them

echo "🔍 Checking local environment variables..."
echo ""

# Function to check if variable is set
check_var() {
    local var_name=$1
    local var_value=$(eval echo \$$var_name)

    if [ -z "$var_value" ]; then
        echo "❌ $var_name: NOT SET"
        return 1
    else
        local length=${#var_value}
        echo "✅ $var_name: SET ($length characters)"
        return 0
    fi
}

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

echo "Required Environment Variables:"
echo "================================"

check_var "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
check_var "CLERK_SECRET_KEY"
check_var "MONGODB_URI"
check_var "BLOB_READ_WRITE_TOKEN"
check_var "bookinator_READ_WRITE_TOKEN"

echo ""
echo "📋 Vercel Deployment Checklist:"
echo "================================"
echo "[ ] Go to https://vercel.com/dashboard"
echo "[ ] Select your project"
echo "[ ] Go to Settings → Environment Variables"
echo "[ ] Add all 5 variables listed above"
echo "[ ] Select: Production, Preview, Development for each"
echo "[ ] Click 'Save'"
echo "[ ] Redeploy or push new commit"
echo ""
echo "⚠️  IMPORTANT: Your Clerk key appears to be only 59 characters."
echo "    A valid key should be 150-300+ characters long."
echo "    Get the FULL key from: https://dashboard.clerk.com/last-active?path=api-keys"
echo ""
echo "📖 Full instructions: See VERCEL_DEPLOYMENT_FIX.md"

