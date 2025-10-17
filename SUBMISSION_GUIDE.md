# 🚀 TDS Project 1 - Final Submission Guide

## ✅ What's Been Completed

### 1. Code Repository
- **GitHub Repository**: https://github.com/subhuchan/TDS_FINAL_PROJECT_23f3003784
- **Status**: ✅ Public, Pushed, and Ready
- **Files Included**:
  - `app/main.py` - FastAPI server with `/api-endpoint`
  - `app/llm_generator.py` - Google Gemini AI integration
  - `app/github_utils.py` - GitHub API for repo creation & Pages deployment
  - `app/notify.py` - Evaluation server notification with retry logic
  - `requirements.txt` - All dependencies
  - `README.md` - Comprehensive documentation
  - `DEPLOYMENT.md` - Deployment guide for Render/Railway/Vercel

### 2. Features Implemented
- ✅ API endpoint accepts POST requests with task briefs
- ✅ Secret validation for security
- ✅ Google Gemini AI generates web applications
- ✅ Creates GitHub repos automatically
- ✅ Enables GitHub Pages for live hosting
- ✅ Adds MIT LICENSE to all repos
- ✅ Generates professional README for each app
- ✅ Round 1 & Round 2 support (build + revision)
- ✅ Background processing (non-blocking)
- ✅ Retry logic with exponential backoff
- ✅ Attachment handling (base64 decode)

---

## 📋 Next Steps: Deploy & Submit

### Step 1: Deploy to Render (5 minutes)

1. **Go to**: https://render.com
2. **Sign in** with GitHub
3. Click **"New +" → "Web Service"**
4. **Connect** your repository: `TDS_FINAL_PROJECT_23f3003784`
5. **Configure**:
   - Name: `tds-project-api`
   - Environment: **Python 3**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Plan: **Free**

6. **Add Environment Variables** (in "Environment" tab):
   ```
   GITHUB_TOKEN=<your_github_token_from_.env>
   GITHUB_USERNAME=subhuchan
   GEMINI_API_KEY=<your_gemini_key_from_.env>
   USER_SECRET=<your_secret_from_.env>
   ```
   *Copy the actual values from your local `.env` file*

7. Click **"Create Web Service"**
8. Wait 2-3 minutes for deployment
9. Your API URL will be: `https://tds-project-api.onrender.com` (or similar)

### Step 2: Test Your Deployed API

Once deployed, test it:

```bash
curl https://your-api-url.onrender.com/
```

You should see a nice Bootstrap landing page.

Test the actual endpoint:

```bash
curl https://your-api-url.onrender.com/api-endpoint \
  -H "Content-Type: application/json" \
  -d '{"email":"23f3003784@ds.study.iitm.ac.in","secret":"<your_secret>","task":"test-001","round":1,"nonce":"test-123","brief":"Create a Hello World page with Bootstrap","checks":[],"evaluation_url":"https://httpbin.org/post","attachments":[]}'
```

Expected response:
```json
{"status": "accepted", "note": "processing round 1 started"}
```

### Step 3: Fill Google Form

Fill the Google Form with these values:

1. **What is the URL of your API?**
   ```
   https://your-api-url.onrender.com/api-endpoint
   ```
   (Replace with your actual Render URL)

2. **What "secret" value should we send your API?**
   ```
   <your USER_SECRET from .env file>
   ```

3. **What is the GitHub home page URL of your repo?**
   ```
   https://github.com/subhuchan/TDS_FINAL_PROJECT_23f3003784
   ```

---

## 🔍 How the System Works

### When Instructors Send a Request:

1. **POST to your API** with task brief, checks, attachments
2. **Your API validates** the secret
3. **Returns HTTP 200** immediately (non-blocking)
4. **In background**:
   - Decodes attachments
   - Sends brief to Gemini AI
   - Gets generated HTML/JS/CSS code
   - Creates GitHub repo (e.g., `sum-of-sales-abc12`)
   - Commits code, README, LICENSE
   - Enables GitHub Pages
   - Notifies evaluation server with repo details

5. **Instructors evaluate** your deployed app at:
   ```
   https://subhuchan.github.io/[task-name]/
   ```

6. **For Round 2**: They send another request to modify the app
   - Your system updates the existing repo
   - Re-deploys Pages with changes

---

## 📊 Your Configuration

### Email
```
23f3003784@ds.study.iitm.ac.in
```

### Secret
```
<see your local .env file>
```

### GitHub Username
```
subhuchan
```

### GitHub Token
```
<see your local .env file>
```
*Note: Token has `repo` and `pages` permissions*

### Gemini API Key
```
<see your local .env file>
```

### GitHub Repository
```
https://github.com/subhuchan/TDS_FINAL_PROJECT_23f3003784
```

---

## 🎯 Evaluation Criteria

Your project will be evaluated on:

### Repository Checks
- ✅ Has MIT LICENSE
- ✅ Professional README.md
- ✅ Clean code structure
- ✅ No secrets in git history

### API Checks
- ✅ Accepts POST requests correctly
- ✅ Validates secret
- ✅ Returns HTTP 200 within 10 minutes
- ✅ Creates GitHub repo
- ✅ Enables GitHub Pages
- ✅ Notifies evaluation URL

### Generated App Checks
- ✅ Meets task brief requirements
- ✅ Passes all checks specified
- ✅ Loads correctly on GitHub Pages
- ✅ Uses attachments properly

### Round 2 Checks
- ✅ Accepts revision requests
- ✅ Updates existing repo
- ✅ Preserves previous functionality
- ✅ Implements new requirements

---

## ⚠️ Important Reminders

1. **Make repo public** before deadline
2. **Don't modify** after instructors start evaluation
3. **Keep API running** (Render free tier sleeps after 15 min - use UptimeRobot)
4. **GitHub token** must have `repo` and `pages` scopes
5. **Secret** must match exactly in form and .env

---

## 🆘 Troubleshooting

### "API not responding"
- Check Render logs
- Verify environment variables are set
- Restart service if needed

### "GitHub Pages not working"
- Takes 1-2 minutes to deploy
- Check repo → Settings → Pages
- Ensure Pages is enabled on `main` branch

### "Invalid secret"
- Verify secret matches in form submission
- Check .env file on Render

### "Module not found"
- Check all dependencies in requirements.txt
- Rebuild on Render

---

## 📞 Support

If you encounter issues:
1. Check Render deployment logs
2. Test locally with `uvicorn app.main:app --reload`
3. Verify all environment variables
4. Check GitHub token permissions

---

## 🎉 You're Ready!

Your code is clean, working, and pushed to GitHub. Now:

1. ✅ Deploy to Render (5 minutes)
2. ✅ Test your API
3. ✅ Submit the Google Form

**Good luck with your submission! 🚀**

---

*Last updated: October 17, 2025*
*Student: 23f3003784@ds.study.iitm.ac.in*
