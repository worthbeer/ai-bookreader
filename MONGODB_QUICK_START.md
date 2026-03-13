# MongoDB Connection - Quick Fix

## Error
```
querySrv ECONNREFUSED _mongodb._tcp.cluster0.hljmdgt.mongodb.net
```

## Solution 1: Whitelist Your IP (Fast)

1. Go to https://cloud.mongodb.com
2. Click "Network Access" 
3. Click "ADD IP ADDRESS"
4. Click "ALLOW ACCESS FROM ANYWHERE"
5. Confirm and restart: `npm run dev`

## Solution 2: Use Local MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Update .env.local:**
```
MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader
```

**Restart:**
```bash
npm run dev
```

---

✅ Success looks like: `✓ Connected to MongoDB successfully`

See `MONGODB_CONNECTION_FIX.md` for full troubleshooting guide.

