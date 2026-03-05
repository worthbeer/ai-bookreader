#!/bin/bash

# Dependency Installation Script for Bookify UploadForm
# Run this script to install all required dependencies

echo "================================================"
echo "  Bookify - Installing Dependencies"
echo "================================================"
echo ""

# Navigate to project directory
cd "$(dirname "$0")" || {
    echo "❌ Error: Failed to change to project directory!"
    echo "   Script location: $(dirname "$0")"
    echo "   Please check that the script file is accessible."
    exit 1
}

echo "📂 Current directory: $(pwd)"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Make sure you're in the bookify directory."
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "📦 node_modules directory exists"
    echo "   To do a fresh install, delete it first: rm -rf node_modules"
else
    echo "📦 node_modules directory not found - will create"
fi
echo ""

# Display dependencies to be installed
echo "📋 Dependencies to install:"
echo "   - @hookform/resolvers@5.2.2"
echo "   - @radix-ui/react-slot@1.1.1"
echo "   - @vercel/blob@0.27.0"
echo "   - react-hook-form@7.71.2"
echo "   - sonner@1.7.1"
echo "   - zod@3.25.1"
echo ""

# Run npm install
echo "🔄 Running npm install..."
echo "   (This may take 1-3 minutes)"
echo ""

npm install

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "  ✅ Installation Complete!"
    echo "================================================"
    echo ""

    # Verify key packages
    echo "🔍 Verifying installations:"

    if [ -d "node_modules/@vercel/blob" ]; then
        echo "   ✅ @vercel/blob"
    else
        echo "   ❌ @vercel/blob"
    fi

    if [ -d "node_modules/sonner" ]; then
        echo "   ✅ sonner"
    else
        echo "   ❌ sonner"
    fi

    if [ -d "node_modules/zod" ]; then
        echo "   ✅ zod"
    else
        echo "   ❌ zod"
    fi

    if [ -d "node_modules/@radix-ui/react-slot" ]; then
        echo "   ✅ @radix-ui/react-slot"
    else
        echo "   ❌ @radix-ui/react-slot"
    fi

    if [ -d "node_modules/react-hook-form" ]; then
        echo "   ✅ react-hook-form"
    else
        echo "   ❌ react-hook-form"
    fi

    echo ""
    echo "📝 Next steps:"
    echo "   1. Run: npm run build"
    echo "   2. Run: npm run dev"
    echo "   3. Navigate to: http://localhost:3000/books/new"
    echo ""
    echo "📚 See INSTALLATION_GUIDE.md for more details"
    echo ""

else
    echo ""
    echo "================================================"
    echo "  ❌ Installation Failed!"
    echo "================================================"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Check your internet connection"
    echo "  2. Try: rm -rf node_modules package-lock.json && npm install"
    echo "  3. Check npm logs: npm-debug.log"
    echo ""
    exit 1
fi

