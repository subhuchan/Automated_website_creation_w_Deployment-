# 🚀 Quick Start Guide - TDS App Builder v2.0

Get up and running in 5 minutes!

## Step 1: Install Dependencies

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
GEMINI_API_KEY=your_gemini_api_key
USER_SECRET=my_secret_123
```

### Getting Your API Keys

**GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `workflow`
4. Copy the token

**Gemini API Key:**
1. Go to https://makersuite.google.com/app/apikey
2. Create API key
3. Copy the key

## Step 3: Start the Backend

```bash
cd backend
uvicorn app.main:app --reload
```

Backend will run on: http://localhost:8000

## Step 4: Start the Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:5173

## Step 5: Create Your First Project

1. Open http://localhost:5173 in your browser
2. Click "Builder" in the sidebar
3. Fill in the form:
   - **Email**: your@email.com
   - **Secret**: my_secret_123 (same as USER_SECRET in .env)
   - **Task ID**: my-first-app
   - **Brief**: "Create a beautiful landing page for a tech startup with hero section, features, and contact form"
   - **Round**: 1 (New Project)
4. Click "Generate Application"
5. Watch the real-time progress!
6. When complete, click "View Live" to see your app

## Step 6: View Your Projects

- **Dashboard**: See statistics and recent projects
- **Projects**: Browse all your generated apps
- **Project Detail**: Click any project to see details and links

## 🎉 That's It!

You now have a fully functional AI-powered app builder!

## Common Commands

### Start Everything (Docker)
```bash
docker-compose up
```

### Reset Database
```bash
cd backend
rm tds_projects.db
python -c "from app.core.database import init_db; init_db()"
```

### View API Documentation
Open: http://localhost:8000/docs

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Troubleshooting

**Port already in use?**
```bash
# Change backend port
uvicorn app.main:app --reload --port 8001

# Change frontend port
npm run dev -- --port 5174
```

**Module not found?**
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules
npm install
```

**Can't connect to backend?**
- Make sure backend is running on port 8000
- Check `.env` file exists and has correct values
- Look for errors in backend terminal

## Next Steps

- Explore the Dashboard to see statistics
- Try creating different types of apps
- Use Round 2 to revise existing projects
- Check out the API docs at `/docs`

Happy building! 🎨
