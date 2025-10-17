# 📝 Quick Reference Card - TDS Project 1

## 🔗 Links

**GitHub Repository**
```
https://github.com/subhuchan/TDS_FINAL_PROJECT_23f3003784
```

**Your Email**
```
23f3003784@ds.study.iitm.ac.in
```

**GitHub Username**
```
subhuchan
```

---

## 🚀 Deploy to Render (Step-by-Step)

### 1. Go to Render
https://render.com → Sign in with GitHub

### 2. Create New Web Service
- Click "New +" → "Web Service"
- Connect repo: `TDS_FINAL_PROJECT_23f3003784`

### 3. Configuration
```
Name: tds-project-api
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Plan: Free
```

### 4. Environment Variables
Go to "Environment" tab and add (copy from your `.env` file):
```
GITHUB_TOKEN=<from .env>
GITHUB_USERNAME=subhuchan
GEMINI_API_KEY=<from .env>
USER_SECRET=<from .env>
```

### 5. Deploy
Click "Create Web Service" → Wait 2-3 minutes

Your API will be at: `https://tds-project-api.onrender.com`

---

## 📋 Google Form Submission

### Question 1: What is the URL of your API?
```
https://your-render-url.onrender.com/api-endpoint
```
*(Add `/api-endpoint` at the end!)*

### Question 2: What "secret" value should we send your API?
```
<YOUR_USER_SECRET_FROM_.ENV_FILE>
```

### Question 3: What is the GitHub home page URL of your repo?
```
https://github.com/subhuchan/TDS_FINAL_PROJECT_23f3003784
```

---

## ✅ Checklist Before Submission

- [ ] Code pushed to GitHub
- [ ] Repository is **PUBLIC**
- [ ] Deployed to Render
- [ ] Tested API endpoint (returns HTTP 200)
- [ ] Environment variables added on Render
- [ ] Google Form filled with correct values

---

## 🧪 Test Your API

### Test Landing Page
```bash
curl https://your-api-url.onrender.com/
```
Should return HTML page

### Test API Endpoint
```bash
curl https://your-api-url.onrender.com/api-endpoint \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","secret":"<your_secret>","task":"test-1","round":1,"nonce":"123","brief":"Hello World","checks":[],"evaluation_url":"https://httpbin.org/post","attachments":[]}'
```
Should return: `{"status":"accepted","note":"processing round 1 started"}`

---

## 🆘 Troubleshooting

**API returns 403/404**
→ Check Render deployment logs
→ Verify environment variables are set

**"Invalid secret" error**
→ Make sure secret in test matches USER_SECRET in .env

**GitHub Pages not working**
→ Wait 2 minutes after repo creation
→ Check repo Settings → Pages

**Module not found**
→ Check requirements.txt is complete
→ Rebuild on Render

---

## 📁 Where to Find Your Values

All secrets are in: `.env` file in your project folder

```bash
# View your .env file
type .env
```

---

## 🎯 Important Notes

1. **API URL must end with `/api-endpoint`** for the form
2. **Repository must be PUBLIC** before deadline
3. **Keep Render service running** (free tier sleeps after 15 min)
4. **Don't change code** after instructors start testing
5. **Secret must match exactly** between form and .env

---

**Good luck! 🚀**

*For detailed instructions, see SUBMISSION_GUIDE.md*
