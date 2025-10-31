# 📦 Migration Guide: v1.0 → v2.0

This guide helps you migrate from the original CLI-based version to the new modern full-stack application.

## What's Changed?

### ✅ Backward Compatible
- Your existing `.env` file works as-is
- The `/api-endpoint` still works (legacy support)
- All your environment variables are the same
- GitHub and Gemini integration unchanged

### 🆕 New Features
- Modern React frontend with dashboard
- Database for project history
- Real-time WebSocket updates
- RESTful API with versioning
- Better error handling and logging

## Migration Steps

### Step 1: Backup Your Data

```bash
# Backup your .env file
copy .env .env.backup

# If you have any custom scripts, back them up
```

### Step 2: Install New Dependencies

#### Backend
```bash
cd backend
pip install -r requirements.txt
```

The new requirements include:
- `sqlalchemy` - Database ORM
- `pydantic-settings` - Better config management
- `websockets` - Real-time updates

#### Frontend (New)
```bash
cd frontend
npm install
```

### Step 3: Update Your .env File

Your existing `.env` works, but you can add optional new variables:

```env
# Existing (keep these)
GITHUB_TOKEN=your_token
GITHUB_USERNAME=your_username
GEMINI_API_KEY=your_key
USER_SECRET=your_secret

# New (optional)
DATABASE_URL=sqlite:///./tds_projects.db
SECRET_KEY=your_jwt_secret_for_future_auth
BACKEND_CORS_ORIGINS=["http://localhost:5173"]
```

### Step 4: Initialize Database

```bash
cd backend
python -c "from app.core.database import init_db; init_db()"
```

This creates the SQLite database for project history.

### Step 5: Start the New System

#### Option A: Docker (Easiest)
```bash
docker-compose up
```

#### Option B: Manual
```bash
# Terminal 1: Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Step 6: Test Everything Works

1. **Test legacy endpoint** (should still work):
   ```bash
   curl -X POST http://localhost:8000/api-endpoint \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","secret":"your_secret","task":"test-001","round":1,"nonce":"123","brief":"Test app","checks":[],"evaluation_url":"https://httpbin.org/post","attachments":[]}'
   ```

2. **Test new frontend**:
   - Open http://localhost:5173
   - Create a project through the UI
   - Check the dashboard

3. **Test new API**:
   ```bash
   curl http://localhost:8000/api/v1/health
   curl http://localhost:8000/api/v1/projects/stats
   ```

## File Structure Changes

### Old Structure
```
tds-project-1/
├── app/
│   ├── main.py
│   ├── llm_generator.py
│   ├── github_utils.py
│   └── notify.py
├── requirements.txt
└── .env
```

### New Structure
```
tds-project-1/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # NEW: API routes
│   │   ├── core/            # NEW: Config, database
│   │   ├── models/          # NEW: Database models
│   │   ├── schemas/         # NEW: Pydantic schemas
│   │   ├── services/        # Moved from app/
│   │   ├── websockets/      # NEW: Real-time updates
│   │   └── main.py          # Enhanced
│   └── requirements.txt
├── frontend/                 # NEW: React app
└── docker-compose.yml        # NEW: Easy deployment
```

## Code Changes

### Old Way (Still Works)
```python
# Direct POST to /api-endpoint
import requests

response = requests.post(
    "http://localhost:8000/api-endpoint",
    json={
        "email": "test@example.com",
        "secret": "your_secret",
        "task": "my-app",
        "round": 1,
        "nonce": "123",
        "brief": "Create an app",
        "checks": [],
        "evaluation_url": "https://httpbin.org/post",
        "attachments": []
    }
)
```

### New Way (Recommended)
```python
# Use the new API
import requests

response = requests.post(
    "http://localhost:8000/api/v1/builder/create",
    json={
        "email": "test@example.com",
        "secret": "your_secret",
        "task": "my-app",
        "round": 1,
        "nonce": "123",
        "brief": "Create an app",
        "checks": [],
        "evaluation_url": "https://httpbin.org/post",
        "attachments": []
    }
)

# Get project status
project = requests.get(
    "http://localhost:8000/api/v1/projects/my-app"
).json()

# Get all projects
projects = requests.get(
    "http://localhost:8000/api/v1/projects"
).json()

# Get statistics
stats = requests.get(
    "http://localhost:8000/api/v1/projects/stats"
).json()
```

## What to Keep

### ✅ Keep Using
- Your GitHub token and username
- Your Gemini API key
- Your secret key
- Your existing test scripts (they still work!)

### 🆕 Start Using
- The web dashboard at http://localhost:5173
- The new API endpoints for better integration
- WebSocket for real-time updates
- Database for project history

## Rollback Plan

If you need to go back to v1.0:

```bash
# Stop new services
docker-compose down

# Use your backup
copy .env.backup .env

# Run old version
cd app
uvicorn main:app --reload
```

Your old code is still in the `app/` directory and works unchanged.

## Benefits of Upgrading

### Before (v1.0)
- ❌ No UI, only API
- ❌ No project history
- ❌ No real-time updates
- ❌ Manual testing with curl/scripts
- ❌ No visual feedback

### After (v2.0)
- ✅ Beautiful web dashboard
- ✅ Complete project history in database
- ✅ Real-time progress updates
- ✅ Easy project management
- ✅ Visual statistics and analytics
- ✅ Search and filter projects
- ✅ One-click access to repos and live sites

## Common Issues

### "Module not found" errors
```bash
cd backend
pip install -r requirements.txt
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Database errors
```bash
cd backend
rm tds_projects.db
python -c "from app.core.database import init_db; init_db()"
```

### Port conflicts
```bash
# Change backend port
uvicorn app.main:app --reload --port 8001

# Update frontend proxy in vite.config.ts
```

## Getting Help

1. Check `README_V2.md` for full documentation
2. Check `QUICKSTART.md` for setup guide
3. Visit http://localhost:8000/docs for API documentation
4. Check the browser console for frontend errors
5. Check terminal output for backend errors

## Summary

The migration is straightforward:
1. Install new dependencies
2. Initialize database
3. Start both backend and frontend
4. Enjoy the new UI!

Your existing API integration continues to work, and you gain a powerful web interface for managing your projects.

Happy migrating! 🚀
