# Deployment Guide - TDS Project 1

This guide will help you deploy your FastAPI application to a production server.

## Option 1: Render (Recommended - Free Tier Available)

### Steps:

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `tds-project-1` repo

3. **Configure Service**
   - **Name**: `tds-project-1-api`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

4. **Add Environment Variables**
   Go to "Environment" tab and add:
   ```
   GITHUB_TOKEN=your_github_token_here
   GITHUB_USERNAME=your_github_username
   GEMINI_API_KEY=your_gemini_api_key_here
   USER_SECRET=your_secret_here
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your API URL will be: `https://tds-project-1-api.onrender.com`

6. **Test Deployment**
   ```bash
   curl https://tds-project-1-api.onrender.com/
   ```

---

## Option 2: Railway

### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `tds-project-1`

3. **Configure**
   - Railway auto-detects Python
   - Add environment variables in "Variables" tab
   - Railway automatically assigns a domain

4. **Environment Variables**
   Add the same variables as Render

5. **Deploy**
   - Automatic deployment on push
   - Your URL: `https://tds-project-1-production.up.railway.app`

---

## Option 3: Vercel (For FastAPI - requires adapter)

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Create vercel.json**
   ```json
   {
     "builds": [
       {
         "src": "app/main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "app/main.py"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add GITHUB_TOKEN
   vercel env add GITHUB_USERNAME
   vercel env add GEMINI_API_KEY
   vercel env add USER_SECRET
   ```

---

## Testing Your Deployed API

Once deployed, test with:

```bash
curl https://your-api-url.com/api-endpoint \
  -H "Content-Type: application/json" \
  -d '{"email":"23f3003784@ds.study.iitm.ac.in","secret":"subhashree_secret_123","task":"test-deploy-001","round":1,"nonce":"test-xyz","brief":"Create a simple Hello World Bootstrap page","checks":["Has Bootstrap CSS","Shows Hello World"],"evaluation_url":"https://httpbin.org/post","attachments":[]}'
```

---

## Monitoring

### Render
- Dashboard → Your Service → Logs
- Real-time logs visible
- Auto-restarts on crashes

### Railway
- Project → Deployments → Logs
- Build and runtime logs
- Metrics available

---

## Important Notes

1. **Free Tier Limitations**:
   - Render: Sleeps after 15 min inactivity (30 sec cold start)
   - Railway: 500 hours/month free
   - Vercel: Limited execution time

2. **Keep Alive** (for Render):
   - Use UptimeRobot to ping every 10 minutes
   - Prevents sleep mode

3. **Environment Variables**:
   - NEVER commit `.env` to GitHub
   - Add secrets only in dashboard
   - Rotate tokens regularly

4. **GitHub Token Permissions**:
   - Ensure token has `repo` and `pages` scopes
   - Check expiration date

---

## Troubleshooting

### "Module not found" error
- Check `requirements.txt` is complete
- Verify build command runs `pip install -r requirements.txt`

### "Port already in use"
- Use `$PORT` environment variable (provided by platform)
- Don't hardcode port 8000

### GitHub API rate limit
- Check token validity
- Consider using authenticated requests

### Gemini API errors
- Verify API key is valid
- Check quota limits

---

## What to Submit in Google Form

After successful deployment:

1. **API URL**: `https://your-api-url.onrender.com/api-endpoint`
2. **Secret**: `subhashree_secret_123`
3. **GitHub Repo**: `https://github.com/subhuchan/tds-project-1`

---

## Next Steps

1. Deploy to Render (recommended)
2. Test the API endpoint
3. Push code to GitHub repo
4. Make repo public
5. Fill the Google Form with:
   - Your deployed API URL
   - Your secret value
   - Your GitHub repo URL

---

**Good luck with your deployment! 🚀**
