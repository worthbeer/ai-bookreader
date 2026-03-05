#!/bin/bash
# Validation script for UploadForm implementation

echo "=== UploadForm Implementation Validation ==="
echo ""

# Counter for missing files
MISSING_COUNT=0

echo "✓ Checking components..."
[ -f "components/UploadForm.tsx" ] && echo "  ✓ UploadForm.tsx" || { echo "  ✗ UploadForm.tsx MISSING"; ((MISSING_COUNT++)); }
[ -f "components/FileUploader.tsx" ] && echo "  ✓ FileUploader.tsx" || { echo "  ✗ FileUploader.tsx MISSING"; ((MISSING_COUNT++)); }
[ -f "components/VoiceSelector.tsx" ] && echo "  ✓ VoiceSelector.tsx" || { echo "  ✗ VoiceSelector.tsx MISSING"; ((MISSING_COUNT++)); }
[ -f "components/LoadingOverlay.tsx" ] && echo "  ✓ LoadingOverlay.tsx" || { echo "  ✗ LoadingOverlay.tsx MISSING"; ((MISSING_COUNT++)); }

echo ""
echo "✓ Checking UI components..."
[ -f "components/ui/form.tsx" ] && echo "  ✓ form.tsx" || { echo "  ✗ form.tsx MISSING"; ((MISSING_COUNT++)); }
[ -f "components/ui/input.tsx" ] && echo "  ✓ input.tsx" || { echo "  ✗ input.tsx MISSING"; ((MISSING_COUNT++)); }
[ -f "components/ui/button.tsx" ] && echo "  ✓ button.tsx" || { echo "  ✗ button.tsx MISSING"; ((MISSING_COUNT++)); }

echo ""
echo "✓ Checking lib files..."
[ -f "lib/zod.ts" ] && echo "  ✓ zod.ts" || { echo "  ✗ zod.ts MISSING"; ((MISSING_COUNT++)); }
[ -f "lib/utils.ts" ] && echo "  ✓ utils.ts" || { echo "  ✗ utils.ts MISSING"; ((MISSING_COUNT++)); }
[ -f "lib/constants.ts" ] && echo "  ✓ constants.ts" || { echo "  ✗ constants.ts MISSING"; ((MISSING_COUNT++)); }
[ -f "lib/actions/book.actions.ts" ] && echo "  ✓ book.actions.ts" || { echo "  ✗ book.actions.ts MISSING"; ((MISSING_COUNT++)); }

echo ""
echo "✓ Checking API routes..."
[ -f "app/api/upload/route.ts" ] && echo "  ✓ upload/route.ts" || { echo "  ✗ upload/route.ts MISSING"; ((MISSING_COUNT++)); }

echo ""
echo "=== Validation Complete ==="

# Exit with error code if any files are missing
if [ $MISSING_COUNT -gt 0 ]; then
    echo ""
    echo "❌ Validation FAILED: $MISSING_COUNT file(s) missing"
    exit 1
else
    echo "✅ All required files present"
    exit 0
fi

