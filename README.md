# TDS App Builder v2.0

AI-Powered Application Builder with React Frontend and FastAPI Backend.

## 🚀 Features

- Modern React dashboard with real-time updates
- AI code generation using Google Gemini
- Automatic GitHub repository creation
- GitHub Pages deployment
- WebSocket real-time progress tracking
- Project history with database

## 🏃 Quick Start (Local)

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

## 🚀 Deploy to Railway

1. Go to https://railway.app
2. Click "Deploy from GitHub repo"
3. Select this repository
4. Add environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_USERNAME`
   - `GEMINI_API_KEY`
   - `USER_SECRET`
5. Deploy!

## 📝 Environment Variables

Create `.env` file:
```env
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username
GEMINI_API_KEY=your_gemini_key
USER_SECRET=your_secret
```

## 🛠️ Tech Stack

**Frontend**: React 18, TypeScript, Tailwind CSS, Vite
**Backend**: FastAPI, SQLAlchemy, Google Gemini AI, PyGithub
**Database**: SQLite (default) or PostgreSQL

## 📚 Documentation

- Backend API: http://localhost:8000/docs
- Frontend: http://localhost:5173

## 🎯 Usage

1. Open the dashboard
2. Click "Builder"
3. Fill in project details
4. Watch AI generate your app
5. Get GitHub repo and live site links

## 📄 License

MIT License
