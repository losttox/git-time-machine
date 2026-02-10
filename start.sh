#!/bin/bash

echo "===================================="
echo "Git Time Machine - Starting..."
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo ""
    echo "Please download and install Node.js from:"
    echo "https://nodejs.org/"
    echo ""
    exit 1
fi

echo "[OK] Node.js found: $(node --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing dependencies..."
    echo "This may take a few minutes on first run..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "[ERROR] Failed to install dependencies!"
        exit 1
    fi
    echo ""
    echo "[OK] Dependencies installed successfully!"
    echo ""
else
    echo "[OK] Dependencies already installed"
    echo ""
fi

echo "[INFO] Starting Git Time Machine..."
echo ""
npm run gui
