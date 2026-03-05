# Dependency Installation Guide

## ✅ Dependencies Already Added to package.json

All required dependencies have been added to `package.json`:

### New Dependencies Added:
```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",      // Form validation resolver
    "@radix-ui/react-slot": "^1.1.1",    // For Button component
    "@vercel/blob": "^0.27.0",           // File upload to Vercel Blob
    "react-hook-form": "^7.71.2",        // Form state management
    "sonner": "^1.7.1",                  // Toast notifications
    "zod": "^3.25.1"                     // Schema validation
  }
}
```

## 🚀 Installation Instructions

### Step 1: Install Dependencies

Open your terminal and run:

```bash
cd /Users/wmbierwerth/WebstormProjects/bookify/bookify
npm install
```

This will install all dependencies listed in package.json.

**Expected Installation Time**: 1-3 minutes depending on internet speed

### Step 2: Verify Installation

After installation completes, verify the dependencies are installed:

```bash
# Check if key packages are installed
ls node_modules/@vercel/blob
ls node_modules/sonner
ls node_modules/zod
ls node_modules/@radix-ui/react-slot
```

All commands should show the package directories.

### Step 3: Build the Project

Once dependencies are installed, build to verify everything works:

```bash
npm run build
```

**Expected Output**:
```
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /books/new
```

### Step 4: Start Development Server

```bash
npm run dev
```

Then navigate to: `http://localhost:3000/books/new`

## 🔧 Alternative: Install Packages Individually

If `npm install` hangs or fails, install packages one by one:

```bash
# Core form packages
npm install react-hook-form@7.71.2
npm install @hookform/resolvers@5.2.2
npm install zod@3.25.1

# UI packages
npm install @radix-ui/react-slot@1.1.1
npm install sonner@1.7.1

# File upload
npm install @vercel/blob@0.27.0
```

## 📦 What Each Package Does

| Package | Purpose | Used In |
|---------|---------|---------|
| `react-hook-form` | Form state management | UploadForm.tsx |
| `@hookform/resolvers` | Connects Zod to react-hook-form | UploadForm.tsx |
| `zod` | Schema validation | lib/zod.ts, UploadForm.tsx |
| `@radix-ui/react-slot` | Polymorphic component utility | ui/button.tsx |
| `sonner` | Toast notifications | UploadForm.tsx, layout.tsx |
| `@vercel/blob` | File uploads to Vercel storage | UploadForm.tsx |

## 🐛 Troubleshooting

### Issue: npm install hangs
**Solution**: 
1. Cancel with Ctrl+C
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Module not found" errors after install
**Solution**: Restart your IDE/editor to refresh the TypeScript language service

- **VS Code**: Cmd+Shift+P → "TypeScript: Restart TS Server"
- **WebStorm**: File → Invalidate Caches → Restart
- **Terminal**: Just restart the editor

### Issue: Build fails with TypeScript errors
**Solution**: Clear Next.js cache and rebuild

```bash
rm -rf .next
npm run build
```

### Issue: @vercel/blob not working
**Solution**: 
1. The mock upload function is currently active (line 24-33 in UploadForm.tsx)
2. To use real uploads, set environment variable:
   ```bash
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```
3. Uncomment the real import (line 21):
   ```typescript
   import {upload} from "@vercel/blob/client";
   ```
4. Remove the mock function (lines 24-33)

## ✅ Verification Checklist

After running `npm install`, verify:

- [ ] `node_modules` folder exists and is populated
- [ ] `package-lock.json` was created/updated
- [ ] No error messages in terminal
- [ ] `npm run build` completes successfully
- [ ] `npm run dev` starts without errors
- [ ] Form loads at `/books/new` route

## 📝 Environment Variables (Optional)

For full functionality, create a `.env.local` file:

```env
# Clerk (should already exist)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Vercel Blob (for real file uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Optional: Voice AI
NEXT_PUBLIC_ASSISTANT_ID=your_vapi_assistant_id
```

## 🎉 Success Indicators

You'll know installation is successful when:

1. ✅ `npm install` completes without errors
2. ✅ `npm run build` produces no TypeScript errors
3. ✅ Form renders at `/books/new`
4. ✅ All form fields are interactive
5. ✅ Validation works when submitting

## 🚀 Next Steps After Installation

1. Test the form at `http://localhost:3000/books/new`
2. Try uploading a PDF file
3. Fill in title, author, and select a voice
4. Click "Begin Synthesis"
5. See the loading overlay
6. Check console for mock upload messages

## 📚 Additional Resources

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Sonner (Toast) Docs](https://sonner.emilkowal.ski/)

---

## Quick Command Reference

```bash
# Install all dependencies
npm install

# Build project
npm run build

# Start dev server
npm run dev

# Clean install (if problems)
rm -rf node_modules package-lock.json && npm install

# Check specific package
npm list <package-name>

# Update dependencies
npm update
```

---

**Status**: Ready to install! Run `npm install` in your terminal.

