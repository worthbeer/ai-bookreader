# ⚡ MongoDB Quick Fix Card

## Your Problem
```
Error: Could not connect to any servers in your MongoDB Atlas cluster
Your IP: <REDACTED_IP> is NOT whitelisted
```

---

## ⚡ 5-Minute Fix (Option A)

```
1. https://cloud.mongodb.com/v2
2. Network Access → + ADD IP ADDRESS
3. ALLOW ACCESS FROM ANYWHERE → Confirm
4. Wait 1-2 minutes
5. npx ts-node test-mongodb.ts
6. npm run dev
```

---

## ⚡ 10-Minute Fix (Option B)

```
brew tap mongodb/brew && brew install mongodb-community
brew services start mongodb-community
# Edit .env.local: MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader
npx ts-node test-mongodb.ts
npm run dev
```

---

## ✅ Success Looks Like

```
✅ Successfully connected to MongoDB!
```

Then when you run your app:
```
✓ Connected to MongoDB successfully
```

---

## 🔧 Handy Commands

| What | Command |
|------|---------|
| Test connection | `npx ts-node test-mongodb.ts` |
| Your IP | `curl https://api.ipify.org` |
| Start MongoDB | `brew services start mongodb-community` |
| Stop MongoDB | `brew services stop mongodb-community` |
| Switch config | `bash switch-mongodb.sh` |

---

## 📚 Full Docs

- `MONGODB_ACTION_PLAN.md` - Detailed steps
- `MONGODB_README.md` - Reference guide
- `MONGODB_FINAL_STATUS.md` - Status report

---

**Pick Option A or B. Takes 5-10 minutes. You've got this! 🚀**

