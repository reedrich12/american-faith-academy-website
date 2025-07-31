#!/bin/bash

# Script to track component fix progress
echo "=== American Faith Academy Component Fix Progress ==="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if component has TypeScript/accessibility fixes
check_component() {
    local file=$1
    local status="❌"
    local color=$RED
    
    # Check for TypeScript interface definitions
    if grep -q "interface.*Props" "$file" && grep -q "React.FC" "$file"; then
        # Check for accessibility features
        if grep -q "aria-" "$file" || grep -q "role=" "$file"; then
            # Check for motion preferences
            if grep -q "usePrefersReducedMotion" "$file" || grep -q "prefersReducedMotion" "$file"; then
                status="✅"
                color=$GREEN
            else
                status="⚠️"
                color=$YELLOW
            fi
        else
            status="⚠️"
            color=$YELLOW
        fi
    fi
    
    echo -e "${color}${status}${NC} $(basename $file)"
}

echo "=== Core Components ==="
check_component "src/components/Navigation.tsx"
check_component "src/components/Footer.tsx"
check_component "src/components/ui/form-modal.tsx"
check_component "src/components/ui/calendar-modal.tsx"

echo ""
echo "=== Homepage Sections ==="
check_component "src/components/sections/HeroSection.tsx"
check_component "src/components/sections/SoarFrameworkSection.tsx"
check_component "src/components/sections/PioneeringEducationSection.tsx"
check_component "src/components/sections/LearningModelsSection.tsx"
check_component "src/components/sections/AITechnologySection.tsx"
check_component "src/components/sections/PartnershipSection.tsx"
check_component "src/components/sections/StudentTypesSection.tsx"
check_component "src/components/sections/VirtualOpenHouseSection.tsx"
check_component "src/components/sections/FinalCTASection.tsx"

echo ""
echo "=== About Page Sections ==="
for file in src/components/sections/about/*.tsx; do
    check_component "$file"
done

echo ""
echo "=== Academics Page Sections ==="
for file in src/components/sections/academics/*.tsx; do
    check_component "$file"
done

echo ""
echo "=== Admissions Page Sections ==="
for file in src/components/sections/admissions/*.tsx; do
    check_component "$file"
done

echo ""
echo "=== Contact Page Sections ==="
for file in src/components/sections/contact/*.tsx; do
    check_component "$file"
done

echo ""
echo "=== Soaring Centers Page Sections ==="
for file in src/components/sections/soaring-centers/*.tsx; do
    check_component "$file"
done

echo ""
echo "=== Summary ==="
total_components=$(find src/components -name "*.tsx" -type f | wc -l | tr -d ' ')
echo "Total components: $total_components"

# Count fixed components (rough estimate based on our checks)
fixed_components=$(find src/components -name "*.tsx" -type f -exec grep -l "interface.*Props" {} \; | wc -l | tr -d ' ')
echo "Components with TypeScript interfaces: $fixed_components"

accessibility_components=$(find src/components -name "*.tsx" -type f -exec grep -l "aria-\|role=" {} \; | wc -l | tr -d ' ')
echo "Components with accessibility attributes: $accessibility_components"

motion_aware_components=$(find src/components -name "*.tsx" -type f -exec grep -l "usePrefersReducedMotion\|prefersReducedMotion" {} \; | wc -l | tr -d ' ')
echo "Components respecting motion preferences: $motion_aware_components"