#!/bin/bash

echo "🔍 AFA Website Configuration Test"
echo "================================="
echo ""

# Test 1: Check if old files are removed
echo "1️⃣ Checking removed files..."
if [ -f "postcss.config.js" ]; then
    echo "❌ postcss.config.js still exists"
else
    echo "✅ postcss.config.js removed"
fi

if [ -f "biome.json" ]; then
    echo "❌ biome.json still exists"
else
    echo "✅ biome.json removed"
fi

if [ -f "package-lock.json" ]; then
    echo "❌ package-lock.json still exists"
else
    echo "✅ package-lock.json removed"
fi

# Test 2: Check if new files exist
echo ""
echo "2️⃣ Checking new files..."
if [ -f ".prettierrc.json" ]; then
    echo "✅ .prettierrc.json created"
else
    echo "❌ .prettierrc.json missing"
fi

if [ -f ".prettierignore" ]; then
    echo "✅ .prettierignore created"
else
    echo "❌ .prettierignore missing"
fi

# Test 3: Check package.json for changes
echo ""
echo "3️⃣ Checking package.json..."
if grep -q "bunx" package.json; then
    echo "✅ Scripts updated to use bunx"
else
    echo "❌ Scripts still using npx"
fi

if grep -q "@biomejs/biome" package.json; then
    echo "❌ Biome still in dependencies"
else
    echo "✅ Biome removed from dependencies"
fi

if grep -q "prettier" package.json; then
    echo "✅ Prettier added to dependencies"
else
    echo "❌ Prettier not in dependencies"
fi

# Test 4: Check next.config.js
echo ""
echo "4️⃣ Checking next.config.js..."
if grep -q "ignoreBuildErrors: true" next.config.js; then
    echo "❌ TypeScript errors still suppressed"
else
    echo "✅ TypeScript error suppression removed"
fi

if grep -q "ignoreDuringBuilds: true" next.config.js; then
    echo "❌ ESLint errors still suppressed"
else
    echo "✅ ESLint error suppression removed"
fi

if grep -q "unoptimized: false" next.config.js; then
    echo "✅ Image optimization enabled"
else
    echo "❌ Image optimization still disabled"
fi

if grep -q "Content-Security-Policy" next.config.js; then
    echo "✅ Security headers added"
else
    echo "❌ Security headers missing"
fi

# Test 5: Check ESLint config
echo ""
echo "5️⃣ Checking ESLint configuration..."
if grep -q "jsx-a11y/alt-text.*error" eslint.config.mjs; then
    echo "✅ Accessibility rules enabled"
else
    echo "❌ Accessibility rules still disabled"
fi

# Test 6: Check TypeScript config
echo ""
echo "6️⃣ Checking TypeScript configuration..."
if grep -q "noUnusedLocals.*true" tsconfig.json; then
    echo "✅ Additional strict checks enabled"
else
    echo "❌ Additional strict checks missing"
fi

echo ""
echo "================================="
echo "✅ Configuration verification complete!"
echo ""
echo "Next: Run 'npm install' then 'npm run lint' to see all errors"
