# 🧪 How to Test Your API Locally

## Quick Test (2 Terminals Needed)

### Terminal 1: Start the Server

```bash
# Option A: Using the batch file
start_server.bat

# Option B: Manual command
uvicorn app.main:app --reload
```

Wait until you see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Terminal 2: Send a Test Request

```bash
# Option A: Using the batch file
test_create_app.bat

# Option B: Manual curl command (see below)
```

## Manual Test Commands

### PowerShell:
```powershell
Invoke-WebRequest -Uri "http://localhost:8000/api-endpoint" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"23f3003784@ds.study.iitm.ac.in","secret":"subhashree_secret_123","task":"hello-test-001","round":1,"nonce":"test-001","brief":"Create a Hello World page","checks":[],"evaluation_url":"https://httpbin.org/post","attachments":[]}'
```

### CMD (curl):
```cmd
curl http://localhost:8000/api-endpoint ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"23f3003784@ds.study.iitm.ac.in\",\"secret\":\"subhashree_secret_123\",\"task\":\"hello-test-001\",\"round\":1,\"nonce\":\"test-001\",\"brief\":\"Create a Hello World page\",\"checks\":[],\"evaluation_url\":\"https://httpbin.org/post\",\"attachments\":[]}"
```

## Expected Response

You should see:
```json
{"status":"accepted","note":"processing round 1 started"}
```

## Check Results

Wait 2-3 minutes, then check:

1. **GitHub Repositories**: https://github.com/subhuchan?tab=repositories
   - Should see new repo: `hello-test-001`

2. **GitHub Pages** (after 2-3 minutes): https://subhuchan.github.io/hello-test-001/
   - Should show the generated app

3. **Server Logs** (Terminal 1):
   - Watch for processing messages
   - Check for any errors

## What Happens During Test

1. ✅ Server receives request
2. ✅ Validates secret
3. ✅ Returns HTTP 200
4. 🔄 Background processing starts:
   - Sends brief to Gemini AI
   - Gets generated HTML code
   - Creates GitHub repo
   - Commits files
   - Enables Pages
   - Notifies evaluation URL

## Troubleshooting

### "Connection refused"
→ Server not running. Start it first in Terminal 1

### "Invalid secret"
→ Check your `.env` file has correct `USER_SECRET`

### "Module not found"
→ Install dependencies: `pip install -r requirements.txt`

### No repo created
→ Check server logs for errors
→ Verify `GITHUB_TOKEN` in `.env` is valid
→ Check GitHub token has `repo` permissions

### Pages not loading
→ Wait 2-3 minutes for Pages to deploy
→ Check repo Settings → Pages is enabled

## Skip Local Testing?

If you want to skip local testing and deploy directly:
1. Go straight to Render deployment
2. Let instructors be the first to test it
3. (Not recommended - better to test locally first!)

---

**Next Step After Testing**: Deploy to Render and submit the form!
