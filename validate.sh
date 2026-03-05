#!/bin/bash
# Validation script for UploadForm implementation

echo "=== UploadForm Implementation Validation ==="
echo ""

echo "✓ Checking components..."
[ -f "components/UploadForm.tsx" ] && echo "  ✓ UploadForm.tsx" || echo "  ✗ UploadForm.tsx MISSING"
[ -f "components/FileUploader.tsx" ] && echo "  ✓ FileUploader.tsx" || echo "  ✗ FileUploader.tsx MISSING"
[ -f "components/VoiceSelector.tsx" ] && echo "  ✓ VoiceSelector.tsx" || echo "  ✗ VoiceSelector.tsx MISSING"
[ -f "components/LoadingOverlay.tsx" ] && echo "  ✓ LoadingOverlay.tsx" || echo "  ✗ LoadingOverlay.tsx MISSING"

echo ""
echo "✓ Checking UI components..."
[ -f "components/ui/form.tsx" ] && echo "  ✓ form.tsx" || echo "  ✗ form.tsx MISSING"
[ -f "components/ui/input.tsx" ] && echo "  ✓ input.tsx" || echo "  ✗ input.tsx MISSING"
[ -f "components/ui/button.tsx" ] && echo "  ✓ button.tsx" || echo "  ✗ button.tsx MISSING"

echo ""
echo "✓ Checking lib files..."
[ -f "lib/zod.ts" ] && echo "  ✓ zod.ts" || echo "  ✗ zod.ts MISSING"
[ -f "lib/utils.ts" ] && echo "  ✓ utils.ts" || echo "  ✗ utils.ts MISSING"
[ -f "lib/constants.ts" ] && echo "  ✓ constants.ts" || echo "  ✗ constants.ts MISSING"
[ -f "lib/actions/book.actions.ts" ] && echo "  ✓ book.actions.ts" || echo "  ✗ book.actions.ts MISSING"

echo ""
echo "✓ Checking API routes..."
[ -f "app/api/upload/route.ts" ] && echo "  ✓ upload/route.ts" || echo "  ✗ upload/route.ts MISSING"

echo ""
echo "=== Validation Complete ==="

