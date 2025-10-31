# 🚀 Single Deployment to Vercel - Complete Guide

Deploy your entire TDS App Builder (frontend + backend) to Vercel in one go!

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Your credentials ready:
  - GITHUB_TOKEN
  - GITHUB_USERNAME
  - GEMINI_API_KEY
  - USER_SECRET

---

## 🎯 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Ready for Vercel deployment"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/tds-app-builder.git
git branch -M main
git push -u origin main
```

### Step 2: Go to Vercel

1. Open [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your `tds-app-builder` repository
3. Click **"Import"**

### Step 4: Configure Project

**Framework Preset**: Vite

**Root Directory**: Leave as `.` (root)

**Build Settings**:
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install --prefix frontend`

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add these:

```
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=subhuchan
GEMINI_API_KEY=your_gemini_api_key_here
USER_SECRET=subhashree_secret_123
DATABASE_URL=sqlite:///tmp/tds_projects.db
PYTHON_VERSION=3.11
```

**Important**: Make sure to add these for **Production**, **Preview**, and **Development** environments.

### Step 6: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://tds-app-builder.vercel.app`

### Step 7: Test Your Deployment

1. Open your Vercel URL
2. You should see the dashboard
3. Try creating a project
4. Check if everything works!

---

## ⚠️ Important Notes

### Database Limitation on Vercel

Vercel serverless functions are stateless, so SQLite won't persist between requests. You have two options:

**Option A: Use Vercel KV (Redis) - Recommended**
- Free tier: 256MB storage
- Persistent across deployments
- Fast and reliable

**Option B: Use External PostgreSQL**
- Supabase (free tier)
- Neon (free tier)
- Railway (free tier)

### For Production Use:

I recommend using **Supabase** for the database:

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string
4. Update `DATABASE_URL` in Vercel:
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/db
   ```

---

## 🔧 Alternative: Deploy to Railway (Easier for Full-Stack)

Railway is better suited for full-stack apps with databases. Here's how:

### Step 1: Go to Railway

1. Open [railway.app](https ://railway.app)
2. Sign up with GitHub
3. Click **"New Project"**

### Step 2: Deploy from GitHub

1. Click **"Deploy from GitHub repo"**
2. Select your repository
3. Railway will auto-detect it's a Python + Node.js project

### Step 3: Add Environment Variables

In Railway dashboard, add:
```
GITHUB_TOKEN=your_token
GITHUB_USERNAME=subhuchan
GEMINI_API_KEY=your_key
USER_SECRET=subhashree_secret_123
DATABASE_URL=sqlite:///./tds_projects.db
PORT=8000
```

### Step 4: Configure Build

Railway should auto-detect, but if needed:

**Backend**:
- Build Command: `cd backend && pip install -r requirements.txt`
- Start Command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Frontend**:
- Build Command: `cd frontend && npm install && npm run build`
- Start Command: `cd frontend && npm run preview -- --host 0.0.0.0 --port $PORT`

### Step 5: Deploy

Railway will automatically deploy both services!

You'll get URLs like:
- Backend: `https://your-app-backend.railway.app`
- Frontend: `https://your-app-frontend.railway.app`

---

## 🎯 Recommended: Render (Best for This Project)

Actually, for your specific project, **Render** is the best choice because:
- ✅ Supports both frontend and backend
- ✅ Free tier with persistent disk (for SQLite)
- ✅ Easy to configure
- ✅ Good for Python + Node.js

### Quick Render Deployment:

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Blueprint"**
4. Connect your repository
5. Render will read `render.yaml` and deploy everything!

Your `render.yaml` is already configured in the project root.

---

## 🚀 Fastest Option: Use Render Blueprint

Since I already created `render.yaml` for you, this is the FASTEST way:

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy to Render"
git push origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repo
4. Render will detect `render.yaml`
5. Add your environment variables:
   - GITHUB_TOKEN
   - GITHUB_USERNAME
   - GEMINI_API_KEY
   - USER_SECRET
6. Click **"Apply"**

**Done!** Render will deploy everything automatically.

You'll get:
- Backend: `https://tds-app-builder-backend.onrender.com`
- Frontend: Deploy separately to Vercel/Netlify (takes 2 minutes)

---

## 📝 My Recommendation

For your project, I recommend:

**Option 1: Render (Backend) + Vercel (Frontend)** ⭐ BEST
- Backend on Render (free, persistent disk for SQLite)
- Frontend on Vercel (free, fast CDN)
- Total time: 10 minutes
- Cost: $0/month

**Option 2: Railway (Everything)** ⭐ EASIEST
- Everything in one place
- Auto-detects configuration
- Total time: 5 minutes
- Cost: $5/month (free trial available)

**Option 3: Vercel (Everything)** ⚠️ NOT RECOMMENDED
- Serverless functions don't work well with SQLite
- Need external database
- More complex setup

---

## 🎯 Let's Do Option 1 (Recommended)

### Part A: Deploy Backend to Render (5 minutes)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push origin main
   ```

2. **Go to Render**:
   - Visit [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Select your repo

3. **Configure**:
   - Name: `tds-backend`
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables**:
   ```
   GITHUB_TOKEN=your_token
   GITHUB_USERNAME=subhuchan
   GEMINI_API_KEY=your_key
   USER_SECRET=subhashree_secret_123
   ```

5. **Deploy** - Wait 5 minutes

6. **Copy your backend URL**: `https://tds-backend.onrender.com`

### Part B: Deploy Frontend to Vercel (3 minutes)

1. **Update frontend/.env.production**:
   ```
   VITE_API_URL=https://tds-backend.onrender.com/api/v1
   ```

2. **Push changes**:
   ```bash
   git add .
   git commit -m "Update API URL"
   git push origin main
   ```

3. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repo

4. **Configure**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variable**:
   ```
   VITE_API_URL=https://tds-backend.onrender.com/api/v1
   ```

6. **Deploy** - Wait 2 minutes

7. **Your app is live!** 🎉

### Part C: Update Backend CORS

1. Go to Render dashboard
2. Open your backend service
3. Add environment variable:
   ```
   BACKEND_CORS_ORIGINS=["https://your-app.vercel.app"]
   ```
4. Redeploy

**DONE!** Your app is fully deployed! 🚀

---

## ✅ Post-Deployment Checklist

- [ ] Frontend loads at Vercel URL
- [ ] Backend health check works
- [ ] Can create a test project
- [ ] GitHub repo gets created
- [ ] GitHub Pages deploys
- [ ] No CORS errors in console

---

## 🐛 Troubleshooting

**CORS Error?**
- Update BACKEND_CORS_ORIGINS with your Vercel URL
- Redeploy backend

**Can't connect to backend?**
- Check VITE_API_URL is correct
- Test backend URL directly: `https://your-backend.onrender.com/api/v1/health`

**Database not persisting?**
- Render free tier has persistent disk
- Data should persist between deployments

---

**Which option do you want to use?**

1. **Render + Vercel** (Recommended, Free, 10 min)
2. **Railway** (Easiest, $5/month, 5 min)
3. **Just Render** (Backend only, then I'll help with frontend)

Let me know and I'll guide you through it! 🚀
