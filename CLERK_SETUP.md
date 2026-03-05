# Clerk Environment Variables Setup

Your `.env.local` file should contain the following environment variables:

```bash
# Get these values from: https://dashboard.clerk.com/last-active?path=api-keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY
```

## How to get your keys:

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **API Keys** in the sidebar
3. Copy your **Publishable Key** and paste it as the value for `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
4. Copy your **Secret Key** and paste it as the value for `CLERK_SECRET_KEY`

## Important Notes:

- ✅ The `.env.local` file is already in your `.gitignore` (verified)
- ✅ Never commit real API keys to version control
- ✅ The `NEXT_PUBLIC_` prefix makes the key available in the browser (required for Clerk)
- ✅ The `CLERK_SECRET_KEY` is server-side only and will not be exposed to the browser

## Verification:

After setting up your keys, restart your development server:

```bash
npm run dev
```

You should be able to:
- Click "Sign Up" to create a new account
- Click "Sign In" to log in
- See the `<UserButton>` when signed in (profile picture in header)

