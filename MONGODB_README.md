# MongoDB Connection Troubleshooting - Complete Reference

## Your Situation
- ✅ DNS resolution: Working
- ✅ Internet connectivity: Working  
- ✅ MongoDB Atlas cluster: Active
- ❌ IP Whitelist: Your IP (172.56.164.242) is NOT whitelisted

---

## Fastest Solution (< 5 minutes)

### Option A: Whitelist Your IP in MongoDB Atlas

1. Go to https://cloud.mongodb.com/v2/login
2. Sign in to your account
3. Click **"Network Access"** in left sidebar
4. Click **"+ ADD IP ADDRESS"** button
5. Select **"ALLOW ACCESS FROM ANYWHERE"** (for development)
6. Click **"Confirm"**
7. Wait 1-2 minutes
8. Test: `npx ts-node test-mongodb.ts`

### Option B: Switch to Local MongoDB

1. Install: `brew tap mongodb/brew && brew install mongodb-community`
2. Start: `brew services start mongodb-community`
3. Edit `.env.local` - change MONGODB_URI to:
   ```
   mongodb://127.0.0.1:27017/ai-bookreader
   ```
4. Test: `npx ts-node test-mongodb.ts`

---

## Files Created for You

| File | Purpose |
|------|---------|
| `test-mongodb.ts` | Test your MongoDB connection |
| `test-mongodb.sh` | Diagnostic script |
| `setup-local-mongodb.sh` | Auto-setup local MongoDB |
| `MONGODB_WHITELIST_FIX.md` | Detailed whitelist guide |
| `MONGODB_CONNECTION_FIX.md` | 8 detailed solutions |

---

## Testing Your Connection

```bash
cd /Users/wmbierwerth/WebstormProjects/ai-bookreader

# Current status
npx ts-node test-mongodb.ts

# If local MongoDB installed, check status
brew services list | grep mongodb
```

---

## After Fixing the Connection

Your app will work:
```bash
npm run dev
```

You should see in terminal:
```
✓ Connected to MongoDB successfully
```

---

## Production Deployment (Vercel)

When deploying to Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add your MongoDB Atlas URI
5. Redeploy

---

## Key Points

✅ DNS works (cluster0.hljmdgt.mongodb.net resolves)
✅ MongoDB Atlas is running (status shows all systems operational)
✅ Your credentials are correct
❌ Your IP (172.56.164.242) is not whitelisted = connection blocked

**This is a security feature. IP whitelisting prevents unauthorized database access.**

---

## Still Having Issues?

1. Verify the whitelist change propagated (wait 2-5 minutes)
2. Try from a different network (mobile hotspot)
3. Check firewall isn't blocking port 27017
4. Contact MongoDB support: https://www.mongodb.com/support

---

**Choose Solution A or B above and let me know if you need help!**

