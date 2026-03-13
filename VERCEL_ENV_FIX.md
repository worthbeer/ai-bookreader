# Vercel Environment Variable Fix

## Problem
Your Vercel build is failing with:
```
Error: @clerk/clerk-react: The publishableKey passed to Clerk is invalid.
(key=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<REDACTED_CLERK_PUBLISHABLE_KEY>
```

**Root Cause:** The environment variable name (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`) is being included as part of the value in Vercel.

This happens when you copy-paste the entire line from `.env` file into Vercel's environment variable value field.

## Solution

Go to your Vercel project → Settings → Environment Variables and **re-enter each variable with ONLY the value part**:

### ✅ Correct Format in Vercel Dashboard

| Variable Name | Value (paste ONLY this part) |
|--------------|------------------------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `<REDACTED_CLERK_PUBLISHABLE_KEY>` |
| `CLERK_SECRET_KEY` | `<REDACTED_CLERK_SECRET_KEY>` |
| `MONGODB_URI` | `<REDACTED_ATLAS_URI>` |
| `BLOB_READ_WRITE_TOKEN` | `<REDACTED_BLOB_TOKEN>` |

### ❌ Wrong (what you probably have now)
If the value field contains something like:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<REDACTED_CLERK_PUBLISHABLE_KEY>
```

You pasted the entire `.env` line. **Delete it and paste only the value after the `=` sign.**

## Step-by-Step Fix

1. **Open Vercel Dashboard:**
   - Go to https://vercel.com/
   - Select your `ai-bookreader` project
   - Click **Settings** → **Environment Variables**

2. **For each variable listed above:**
   - Find the existing variable (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
   - Click the **⋯** (three dots) → **Edit**
   - **Delete the current value completely**
   - Paste **ONLY** the value from the table above (no variable name, no `=` sign)
   - Click **Save**

3. **Apply to all environments:**
   - Make sure to check: ☑ Production, ☑ Preview, ☑ Development

4. **Redeploy:**
   ```bash
   # From your terminal (or just push to GitHub)
   git add .
   git commit -m "Fix: Update Vercel env vars format"
   git push
   ```

   Or click **Deployments** → **⋯** → **Redeploy** in Vercel dashboard.

## Verification

After redeploying, your build should pass. You can verify locally that the app works:

```bash
cd /Users/wmbierwerth/WebstormProjects/ai-bookreader
npm run build
npm start
```

Open http://localhost:3000 and verify:
- ✅ Clerk sign-in button appears
- ✅ Books list loads (requires MongoDB connection)
- ✅ No console errors about missing publishableKey

## Security Note

**⚠️ IMPORTANT:** The keys in your `.env` file have been exposed in this chat. After fixing Vercel:

1. **Rotate Clerk Keys:**
   - Go to https://dashboard.clerk.com/last-active?path=api-keys
   - Click **Regenerate** for both Publishable Key and Secret Key
   - Update both your local `.env` and Vercel environment variables

2. **Rotate MongoDB Credentials:**
   - Go to MongoDB Atlas → Database Access
   - Create a new user or update the password
   - Update `MONGODB_URI` in `.env` and Vercel

3. **Rotate Vercel Blob Token:**
   - Go to Vercel → Storage → Blob
   - Regenerate the token
   - Update in `.env` and Vercel

## Code Changes Already Applied

The following fixes were applied to make your app build successfully even when environment variables are temporarily missing during build time:

1. **`app/layout.tsx`:** Clerk is now optional at build time
2. **`components/Navbar.tsx`:** Auth UI only renders when Clerk is enabled
3. **`app/(root)/page.tsx`:** Added `export const dynamic = 'force-dynamic'` to prevent build-time database access

These changes allow `npm run build` to succeed even without env vars, but **you still need the correct Vercel environment variables** for the app to work properly in production.

## Summary

- ✅ Local build works (`npm run build` passes)
- ✅ Code is resilient to missing env vars during build
- ⚠️ **Vercel needs correct env var format** (value only, no `VAR_NAME=` prefix)
- 🔒 **Rotate all secrets** after fixing Vercel

