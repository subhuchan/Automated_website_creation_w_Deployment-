# 🚀 Deployment Guide - TDS App Builder v2.0

## Overview

Deploy your full-stack AI app builder to production with backend and frontend on separate platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account
- ✅ GitHub Personal Access Token
- ✅ Google Gemini API Key
- ✅ Your USER_SECRET value
- ✅ All code pushed to GitHub repository

## 🎯 Recommended Deployment Architecture

**Backend**: Render (Free tier available)
**Frontend**: Vercel or Netlify (Free tier available)
**Database**: SQLite (included) or upgrade to PostgreSQL

---

## Option 1: Deploy Backend to Render (Recommended)

### Step 1: Prepare Backend for Deployment

1. **Create `render.yaml`** in project root:

```yaml
services:
  - type: web
    name: tds-app-builder-backend
    env: python
    region: oregon
    plan: free
    buildCommand: cd backend && pip install -r requirements.txt
    startCommand: cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: GITHUB_TOKEN
        sync: false
      - key: GITHUB_USERNAME
        sync: false
      - key: GEMINI_API_KEY
        sync: false
      - key: USER_SECRET
        sync: false
      - key: DATABASE_URL
        value: sqlite:///./tds_projects.db
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `tds-app-builder-backend`
   - **Environment**: Python 3
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

6. **Add Environment Variables**:
   ```
   GITHUB_TOKEN=your_github_token
   GITHUB_USERNAME=subhuchan
   GEMINI_API_KEY=your_gemini_key
   USER_SECRET=subhashree_secret_123
   DATABASE_URL=sqlite:///./tds_projects.db
   ```

7. Click **"Create Web Service"**

8. Wait 5-10 minutes for deployment

9. **Your backend URL**: `https://tds-app-builder-backend.onrender.com`

### Step 3: Test Backend

```bash
curl https://tds-app-builder-backend.onrender.com/api/v1/health
```

Should return:
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "github_configured": true,
  "gemini_configured": true
}
```

---

## Option 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

Edit `frontend/src/lib/api.ts`:

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Step 2: Create `.env.production` in frontend folder

```env
VITE_API_URL=https://tds-app-builder-backend.onrender.com/api/v1
```

### Step 3: Update Backend CORS

Edit `backend/app/core/config.py`:

```python
BACKEND_CORS_ORIGINS: list = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-frontend.vercel.app",  # Add your Vercel URL
    "https://*.vercel.app"  # Allow all Vercel preview deployments
]
```

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Add Environment Variable**:
   ```
   VITE_API_URL=https://tds-app-builder-backend.onrender.com/api/v1
   ```

7. Click **"Deploy"**

8. **Your frontend URL**: `https://your-app.vercel.app`

---

## Option 3: Deploy Frontend to Netlify

### Step 1: Create `netlify.toml` in project root

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://tds-app-builder-backend.onrender.com/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect GitHub and select your repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

6. **Add Environment Variable**:
   ```
   VITE_API_URL=https://tds-app-builder-backend.onrender.com/api/v1
   ```

7. Click **"Deploy site"**

---

## Option 4: Deploy Everything with Docker

### Step 1: Update docker-compose.yml for production

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: docker/backend.Dockerfile
    ports:
      - "8000:8000"
    environment:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - GITHUB_USERNAME=${GITHUB_USERNAME}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - USER_SECRET=${USER_SECRET}
      - DATABASE_URL=postgresql://user:pass@db:5432/tds
    depends_on:
      - db

  frontend:
    build:
      context: .
      dockerfile: docker/frontend.Dockerfile
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:8000/api/v1

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=tds
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Step 2: Deploy to any VPS (DigitalOcean, AWS, etc.)

```bash
# On your server
git clone your-repo
cd your-repo
cp .env.example .env
# Edit .env with your credentials
docker-compose up -d
```

---

## 🔧 Post-Deployment Configuration

### 1. Update Backend CORS

After deploying frontend, update backend CORS in `backend/app/core/config.py`:

```python
BACKEND_CORS_ORIGINS: list = [
    "https://your-frontend.vercel.app",
    "https://your-frontend.netlify.app",
]
```

Redeploy backend on Render.

### 2. Test the Full Stack

1. Open your frontend URL
2. Try creating a project
3. Check if it connects to backend
4. Verify GitHub repo is created
5. Check GitHub Pages deployment

### 3. Monitor Logs

**Render Backend Logs**:
- Go to Render dashboard
- Click your service
- Click "Logs" tab

**Vercel Frontend Logs**:
- Go to Vercel dashboard
- Click your project
- Click "Deployments" → Select deployment → "View Function Logs"

---

## 🗄️ Database Options

### Option 1: SQLite (Default - Free)
- Already configured
- Good for small to medium usage
- Data persists on Render's disk

### Option 2: PostgreSQL (Recommended for Production)

1. **Create PostgreSQL on Render**:
   - Go to Render dashboard
   - Click "New +" → "PostgreSQL"
   - Name: `tds-database`
   - Plan: Free
   - Create database

2. **Get Connection String**:
   - Copy "Internal Database URL"
   - Example: `postgresql://user:pass@host/db`

3. **Update Backend Environment Variable**:
   ```
   DATABASE_URL=postgresql://user:pass@host/db
   ```

4. **Update requirements.txt**:
   ```
   psycopg2-binary==2.9.9
   ```

---

## 🔐 Security Checklist

Before going live:

- [ ] Change USER_SECRET to a strong random value
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (automatic on Render/Vercel)
- [ ] Set proper CORS origins
- [ ] Review GitHub token permissions
- [ ] Set up monitoring/alerts
- [ ] Configure rate limiting (optional)
- [ ] Set up backup for database (if using PostgreSQL)

---

## 📊 Monitoring & Maintenance

### Free Monitoring Tools

1. **UptimeRobot** (uptimerobot.com)
   - Monitor if your site is up
   - Free for 50 monitors
   - Email alerts

2. **Render Metrics**
   - Built-in CPU/Memory monitoring
   - Request logs
   - Error tracking

3. **Vercel Analytics**
   - Page views
   - Performance metrics
   - Free tier available

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Start)
- **Render Backend**: Free (sleeps after 15 min inactivity)
- **Vercel Frontend**: Free (100GB bandwidth/month)
- **Database**: SQLite (Free) or PostgreSQL Free tier
- **Total**: $0/month

### Paid Tier (For Production)
- **Render Backend**: $7/month (always on)
- **Vercel Pro**: $20/month (more bandwidth)
- **Render PostgreSQL**: $7/month (persistent)
- **Total**: ~$34/month

---

## 🐛 Troubleshooting Deployment

### Backend won't start on Render
- Check build logs for errors
- Verify all environment variables are set
- Check Python version compatibility
- Ensure requirements.txt is complete

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check backend CORS settings
- Test backend URL directly
- Check browser console for errors

### Database connection fails
- Verify DATABASE_URL format
- Check database is running
- Ensure psycopg2-binary is installed (for PostgreSQL)

### GitHub API rate limits
- Use authenticated requests (already configured)
- Consider caching responses
- Monitor rate limit headers

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Frontend loads at your URL
- [ ] Backend health endpoint responds
- [ ] Can create a test project
- [ ] GitHub repo is created
- [ ] GitHub Pages deploys
- [ ] WebSocket connection works
- [ ] Database persists data
- [ ] Logs are accessible

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## 🚀 Quick Deploy Commands

### Deploy Backend to Render
```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Then deploy via Render dashboard
```

### Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

---

**Your app is ready for the world! 🌍**

Need help? Check the troubleshooting section or review the logs on your deployment platform.
