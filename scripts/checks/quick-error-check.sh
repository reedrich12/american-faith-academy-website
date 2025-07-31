#!/bin/bash

echo "🔍 Quick Error Check"
echo "==================="
echo ""

# Count TypeScript errors in specific directories
echo "📊 TypeScript Errors by Directory:"
echo "---------------------------------"
find src -name "*.tsx" -o -name "*.ts" | while read file; do
    npx tsc --noEmit "$file" 2>&1 | grep -c "error TS" | read count
    if [ "$count" -gt 0 ]; then
        echo "$file: $count errors"
    fi
done 2>/dev/null | sort -t: -k2 -nr | head -20

echo ""
echo "🎯 Most Common TypeScript Errors:"
echo "--------------------------------"
npx tsc --noEmit 2>&1 | grep "error TS" | sed 's/.*error TS/TS/' | sort | uniq -c | sort -nr | head -10

echo ""
echo "♿ Accessibility Issues:"
echo "----------------------"
npx eslint src --ext .tsx,.ts 2>&1 | grep -E "(jsx-a11y|alt-text|aria)" | sort | uniq -c | sort -nr | head -10

echo ""
echo "📝 Summary:"
echo "----------"
echo "Total TS errors: $(npx tsc --noEmit 2>&1 | grep -c "error TS")"
echo "Total ESLint errors: $(npx eslint src --ext .tsx,.ts 2>&1 | grep -c "error")"
echo "Files to fix: $(find src -name "*.tsx" -o -name "*.ts" | wc -l)"
