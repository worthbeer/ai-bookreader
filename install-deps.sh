#!/bin/bash
# Quick dependency installation script

echo "Installing missing dependencies..."
cd /Users/wmbierwerth/WebstormProjects/bookify/bookify

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "node_modules not found, running npm install..."
    npm install
else
    echo "node_modules exists, checking for missing packages..."

    # Check for @vercel/blob
    if [ ! -d "node_modules/@vercel/blob" ]; then
        echo "Installing @vercel/blob..."
        npm install @vercel/blob@0.27.0
    fi

    # Check for sonner
    if [ ! -d "node_modules/sonner" ]; then
        echo "Installing sonner..."
        npm install sonner@1.7.1
    fi

    # Check for zod
    if [ ! -d "node_modules/zod" ]; then
        echo "Installing zod..."
        npm install zod@3.25.1
    fi
fi

echo "Done!"

