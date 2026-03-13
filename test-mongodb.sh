#!/bin/bash
# MongoDB Setup and Test Script
# This script helps diagnose and fix MongoDB connection issues

echo "🔍 MongoDB Connection Diagnostic Tool"
echo "======================================"
echo ""

# Check if mongod is running
echo "📊 Checking for local MongoDB..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running locally"
else
    echo "❌ MongoDB is not running"
    echo ""
    echo "To start MongoDB:"
    echo "  brew services start mongodb-community"
    echo ""
fi

# Test MongoDB Atlas connectivity
echo ""
echo "🌐 Testing MongoDB Atlas connectivity..."
CLUSTER="cluster0.hljmdgt.mongodb.net"

# DNS test
if nslookup $CLUSTER &>/dev/null; then
    echo "✅ DNS resolution successful: $CLUSTER"
else
    echo "❌ DNS resolution failed for: $CLUSTER"
    echo "   This means your system cannot reach MongoDB Atlas"
    echo "   Possible fixes:"
    echo "   1. Check your internet connection"
    echo "   2. Disable VPN if active"
    echo "   3. Check firewall settings"
fi

echo ""
echo "🔗 Connection String:"
echo "   mongodb+srv://aibookstore_db_user:PASSWORD@cluster0.hljmdgt.mongodb.net/?appName=Cluster0"

echo ""
echo "📝 To fix the issue:"
echo ""
echo "Option 1: Switch to local MongoDB"
echo "  Update .env.local:"
echo "  MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader"
echo ""
echo "Option 2: Fix MongoDB Atlas IP Whitelist"
echo "  1. Go to https://cloud.mongodb.com"
echo "  2. Click Network Access"
echo "  3. Add your current IP or allow 0.0.0.0/0 (for development)"
echo ""

# Get current IP
echo "Your current IP:"
curl -s https://api.ipify.org || echo "   (Could not determine)"

