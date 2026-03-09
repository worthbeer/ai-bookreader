# 🔑 Quick Start: Add Your Clerk Keys

## Step 1: Get Your Clerk Keys

1. Open in your browser: **https://dashboard.clerk.com**
2. Click on your application (or create a new one if needed)
3. In the left sidebar, click **"API Keys"**
4. You'll see two keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## Step 2: Copy Keys to .env.local

Open the `.env.local` file in your editor and replace the placeholder values:

```bash
# BEFORE:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_
CLERK_SECRET_KEY=sk_test_

# AFTER (with your actual keys):
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aBc123XyZ...
CLERK_SECRET_KEY=sk_test_dEf456UvW...
```

## Step 3: Save and Restart

1. **Save** the `.env.local` file (Cmd+S or Ctrl+S)
2. **Restart** your dev server:
   ```bash
   npm run dev
   ```

## ✅ That's It!

Your Clerk authentication is now configured. You should be able to:
- Sign up / Sign in
- See user profiles
- Access protected routes

## 🆘 Need Help?

If you don't have a Clerk account yet:
1. Go to https://clerk.com
2. Click "Start building for free"
3. Create your account
4. Create a new application
5. Get your API keys from the dashboard

---

**Note:** The other environment variables (Database, Vercel Blob, VAPI) are optional for initial testing. You can add them later when you need those features.

