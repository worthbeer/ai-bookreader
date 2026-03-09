# Environment Variables Setup Guide

## Overview

Your `.env` file was not tracked in Git (for security reasons). I've created template files to help you set up your environment variables.

## Files Created

1. **`.env.example`** - Template with all required and optional variables with descriptions
2. **`.env.local`** - Your local development environment file (fill this in with your actual values)

## Quick Setup

### 1. Required Services

To run this application, you need accounts for:

- **Clerk** (Authentication) - [https://clerk.com](https://clerk.com)
- **Vercel Blob** (File Storage) - [https://vercel.com](https://vercel.com)
- **VAPI** (Voice AI) - [https://vapi.ai](https://vapi.ai)
- **Database** (Choose one):
  - MongoDB/Mongoose
  - Supabase
  - Prisma with PostgreSQL

### 2. Get Your API Keys

#### Clerk Authentication
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application or select existing
3. Copy your keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

#### Vercel Blob Storage
1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Navigate to Storage → Blob
3. Create a new blob store
4. Copy your `BLOB_READ_WRITE_TOKEN`

#### VAPI Voice AI
1. Go to [https://vapi.ai](https://vapi.ai)
2. Create an account and get:
   - `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
   - `NEXT_PUBLIC_ASSISTANT_ID`

#### Database
Choose one option:

**MongoDB:**
```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/ai-bookreader

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-bookreader
```

**Supabase:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Prisma (PostgreSQL):**
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/ai-bookreader
```

### 3. Fill in `.env.local`

Open `.env.local` and add your actual values:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Database (choose one)
MONGODB_URI=mongodb+srv://xxxxx

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# VAPI
NEXT_PUBLIC_VAPI_PUBLIC_KEY=xxxxx
NEXT_PUBLIC_ASSISTANT_ID=xxxxx

# Environment
NODE_ENV=development
```

### 4. Restart Development Server

After adding your environment variables:

```bash
npm run dev
```

## Environment Files Priority

Next.js loads environment variables in this order (later ones override earlier):

1. `.env` - Default for all environments
2. `.env.local` - Local overrides (ignored by Git)
3. `.env.development` - Development only
4. `.env.development.local` - Local development overrides
5. `.env.production` - Production only
6. `.env.production.local` - Local production overrides

## Security Notes

⚠️ **NEVER commit these files to Git:**
- `.env.local`
- `.env.development.local`
- `.env.production.local`
- Any file containing real API keys

✅ **Safe to commit:**
- `.env.example` (template only, no real values)

## Troubleshooting

### Variables not loading?

1. Make sure the file is named exactly `.env.local`
2. Restart your dev server after adding variables
3. Check for typos in variable names
4. Ensure `NEXT_PUBLIC_*` prefix for client-side variables

### Still having issues?

Check the `.env.example` file for the complete list of required variables and their descriptions.

## Development vs Production

- **Development**: Use `.env.local` (never committed)
- **Production**: Set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Reference

See [Next.js Environment Variables Documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) for more details.

