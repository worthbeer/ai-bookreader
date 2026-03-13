# MongoDB Connection Troubleshooting Guide

## Error: `querySrv ECONNREFUSED _mongodb._tcp.<your-cluster>.mongodb.net`

This error indicates that your application cannot reach the MongoDB Atlas servers. Here are the solutions:

---

## ✅ Solution 1: Check Internet Connectivity

First, verify your internet connection is working:

```bash
# Test DNS resolution
nslookup <your-cluster>.mongodb.net

# Or use ping
ping <your-cluster>.mongodb.net

# Test general internet connectivity
curl https://www.google.com
```

If these fail, your internet connection or firewall is blocking the connection.

---

## ✅ Solution 2: Verify MongoDB Atlas Cluster Status

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Sign in to your account
3. Check if your cluster is **ACTIVE** (green status)
4. If it's PAUSED, click **Resume** to restart it
5. Check [MongoDB Status Page](https://status.mongodb.com/) for any outages

---

## ✅ Solution 3: Whitelist Your IP Address in MongoDB Atlas

This is the most common cause of connection failures.

### Steps:
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click on **Network Access** in the left sidebar
3. Click **ADD IP ADDRESS**
4. Choose one of these options:
   - **ALLOW ACCESS FROM ANYWHERE**: Click the green checkmark (⚠️ Only for development!)
   - **ADD CURRENT IP ADDRESS**: Add your current IP address
   - **ADD A NETWORK**: Add your office/home network range

### For Development/Local Testing:
- If you're developing locally, click "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
- This allows any IP to connect to your cluster

### For Production:
- Add only specific IP addresses
- Never use "Allow from anywhere" in production

---

## ✅ Solution 4: Verify Credentials

Check that your connection string has the correct username and password:

```
mongodb+srv://USERNAME:PASSWORD@<your-cluster>.mongodb.net/?appName=Cluster0
```

### To Reset Password:
1. Go to MongoDB Atlas Dashboard
2. Click **Database Access** in the left sidebar
3. Find your database user (e.g., `<db_username>`)
4. Click the **Edit** button (pencil icon)
5. Click **Edit Password** to reset it
6. Update the password in your `.env.local` file

---

## ✅ Solution 5: Verify Connection String Format

Your connection string should be:

```
mongodb+srv://<db_username>:PASSWORD@<your-cluster>.mongodb.net/?appName=Cluster0
```

**Important Notes:**
- Special characters in password must be URL-encoded
- For example: `@` becomes `%40`, `:` becomes `%3A`
- Check [URL Encoding Reference](https://www.w3schools.com/tags/ref_urlencode.asp)

### If your password contains special characters:

1. Click **Database Access** in MongoDB Atlas
2. Edit the user and reset the password to one without special characters
3. Or URL-encode the password using a tool like [urlencoder.org](https://www.urlencoder.org/)

---

## ✅ Solution 6: Use Local MongoDB Instead (For Development)

If MongoDB Atlas is having issues, you can use a local MongoDB instance during development:

### Install MongoDB Locally:

**macOS with Homebrew:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
- Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Run the installer

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

### Update `.env.local`:

```
# Switch from Atlas to local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader
```

### Verify Connection:

```bash
# Connect to local MongoDB
mongosh
```

---

## ✅ Solution 7: Disable VPN/Proxy

If you're using a VPN, proxy, or corporate network:

1. Try disabling the VPN/proxy temporarily
2. Test the connection
3. If it works, contact your IT/network admin about whitelisting MongoDB Atlas

---

## ✅ Solution 8: Check Firewall/ISP Blocking

MongoDB Atlas uses port **27017** (or **27015-27017**).

### Check if port 27017 is open:

```bash
# macOS/Linux
telnet <your-cluster>.mongodb.net 27017

# Or use nc (netcat)
nc -zv <your-cluster>.mongodb.net 27017
```

If this fails, your ISP or firewall is blocking the connection. Try:
- Using a different network (mobile hotspot, different WiFi)
- Contacting your ISP to whitelist MongoDB Atlas ports
- Using a VPN that allows MongoDB Atlas connections

---

## Testing the Connection

After applying one of the above solutions, test the connection:

```bash
# Navigate to your project
cd /Users/wmbierwerth/WebstormProjects/ai-bookreader

# Run development server
npm run dev

# Check the console for connection status
```

You should see: `✓ Connected to MongoDB successfully`

---

## Quick Troubleshooting Checklist

- [ ] Internet connection is working (can browse websites)
- [ ] MongoDB Atlas cluster is **ACTIVE** (not paused)
- [ ] Your IP address is whitelisted in MongoDB Atlas **Network Access**
- [ ] Credentials (username/password) are correct
- [ ] Connection string is properly formatted and in `.env.local`
- [ ] No VPN/proxy is interfering with the connection
- [ ] Firewall/ISP is not blocking port 27017

---

## Still Not Working?

1. Check MongoDB Atlas logs:
   - Dashboard → Cluster → Activity
   
2. Try connecting with MongoDB Compass:
   - Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
   - Use your connection string
   - If Compass connects, the issue is with your Node.js app
   
3. Check the detailed error message in your console and search [Stack Overflow](https://stackoverflow.com) or [MongoDB Community](https://www.mongodb.com/community/)

---

## Recommended for Development

For smooth development experience, use local MongoDB:

```bash
# .env.local
MONGODB_URI=mongodb://127.0.0.1:27017/ai-bookreader
```

Then switch to MongoDB Atlas when deploying to Vercel/production:

```bash
# Production (set in Vercel dashboard)
MONGODB_URI=mongodb+srv://<db_username>:PASSWORD@<your-cluster>.mongodb.net/?appName=Cluster0
```

