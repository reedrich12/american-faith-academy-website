#!/bin/bash

echo "🔍 AFA Website Diagnostic Report"
echo "================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --silent

echo ""
echo "🔧 Running TypeScript compiler check..."
echo "-------------------------------------"
npx tsc --noEmit 2>&1 | head -50
echo ""
echo "Note: Showing first 50 TypeScript errors (if any)"

echo ""
echo "🎨 Running ESLint check..."
echo "-------------------------"
npx eslint . --ext .js,.jsx,.ts,.tsx --max-warnings 0 2>&1 | head -50
echo ""
echo "Note: Showing first 50 ESLint errors (if any)"

echo ""
echo "📊 Summary"
echo "---------"
echo "✅ Configuration files have been cleaned up"
echo "✅ Error suppressions have been removed"
echo "✅ Security headers have been added"
echo "✅ Image optimization has been enabled"
echo "✅ TypeScript strict mode is fully enabled"
echo ""
echo "⚠️  Next steps:"
echo "1. Fix TypeScript errors shown above"
echo "2. Fix ESLint/accessibility errors shown above"
echo "3. Test the build with: npm run build"
