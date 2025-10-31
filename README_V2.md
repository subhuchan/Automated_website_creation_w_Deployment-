# TDS App Builder v2.0 - Modern Full-Stack Application

An AI-powered application builder with a sleek React frontend and enhanced FastAPI backend. Generate complete web applications using Google Gemini AI, deploy to GitHub Pages, and manage everything through a beautiful dashboard.

## 🎨 What's New in v2.0

### Modern React Frontend
- **Beautiful Dashboard** - Visual overview with real-time statistics
- **Interactive Builder** - User-friendly form to create new projects
- **Project Management** - Browse, filter, and search all your projects
- **Real-time Updates** - WebSocket integration for live progress tracking
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Ready** - Tailwind CSS with dark mode support

### Enhanced Backend
- **Database Persistence** - SQLite/PostgreSQL support for project history
- **RESTful API** - Clean API endpoints with proper versioning
- **WebSocket Support** - Real-time project status updates
- **Better Error Handling** - Comprehensive error tracking and reporting
- **Backward Compatible** - Legacy `/api-endpoint` still works

### Developer Experience
- **TypeScript** - Full type safety in frontend
- **Docker Support** - Easy deployment with Docker Compose
- **Modern Stack** - React 18, FastAPI, Tailwind CSS, Shadcn/ui
- **Hot Reload** - Fast development with Vite

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- GitHub Personal Access Token
- Google Gemini API Key

### Option 1: Docker (Recommended)

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd tds-project-1
   ```

2. **Create `.env` file**:
   ```env
   GITHUB_TOKEN=your_github_token
   GITHUB_USERNAME=your_username
   GEMINI_API_KEY=your_gemini_key
   USER_SECRET=your_secret_key
   ```

3. **Start with Docker**:
   ```bash
   docker-compose up
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt

# Create .env file with your credentials
uvicorn app.main:app --reload
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
tds-project-1/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── api/v1/            # API routes
│   │   ├── core/              # Config, database
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── websockets/        # WebSocket manager
│   │   └── main.py            # FastAPI app
│   └── requirements.txt
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Reusable UI components
│   │   │   └── layout/       # Layout components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities, API client
│   │   ├── types/            # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── docker/                     # Docker configurations
├── docker-compose.yml
└── README_V2.md
```

## 🎯 Features

### Dashboard
- Real-time project statistics
- Quick actions for common tasks
- Recent projects overview
- Success rate analytics

### Builder
- Intuitive form interface
- Email and secret validation
- Custom task ID (becomes repo name)
- Detailed project brief input
- Round selection (new/revision)
- Optional evaluation checks
- Real-time validation

### Projects
- Grid view of all projects
- Filter by status (completed, processing, failed, pending)
- Search by task ID or brief
- Quick access to GitHub repo and live site
- Status badges with color coding

### Project Detail
- Complete project information
- Real-time status updates via WebSocket
- Direct links to repository and live site
- Error messages for failed projects
- Commit SHA tracking
- Timeline of events

## 🔌 API Endpoints

### Projects
- `GET /api/v1/projects` - List all projects
- `GET /api/v1/projects/{task_id}` - Get project details
- `GET /api/v1/projects/stats` - Get statistics
- `DELETE /api/v1/projects/{task_id}` - Delete project

### Builder
- `POST /api/v1/builder/create` - Create new project

### Health
- `GET /api/v1/health` - Health check

### WebSocket
- `WS /ws` - Real-time updates

### Legacy (Backward Compatible)
- `POST /api-endpoint` - Original endpoint

## 🎨 Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **React Query** - Data fetching
- **React Router** - Navigation
- **Zustand** - State management
- **Lucide React** - Icons

### Backend
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **WebSockets** - Real-time communication
- **Google Gemini** - AI generation
- **PyGithub** - GitHub API
- **HTTPX** - HTTP client

## 🔧 Configuration

### Environment Variables

```env
# GitHub
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
GITHUB_USERNAME=your_username

# AI
GEMINI_API_KEY=xxxxxxxxxxxxx

# Security
USER_SECRET=your_secret_key
SECRET_KEY=your_jwt_secret

# Database (optional)
DATABASE_URL=sqlite:///./tds_projects.db
# DATABASE_URL=postgresql://user:pass@localhost/dbname

# CORS (optional)
BACKEND_CORS_ORIGINS=["http://localhost:5173"]
```

### GitHub Token Permissions
Your GitHub token needs:
- `repo` - Full control of repositories
- `workflow` - Update GitHub Actions workflows (for Pages)

### Gemini API Key
Get your key from: https://makersuite.google.com/app/apikey

## 📊 Database

The application uses SQLite by default for simplicity. For production, switch to PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tds_projects
```

Database schema includes:
- Projects table with full history
- Status tracking (pending, processing, completed, failed)
- Timestamps for created, updated, completed
- Error message storage
- GitHub URLs and commit SHAs

## 🚢 Deployment

### Docker Deployment

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Manual Deployment

#### Backend (Render/Railway/Fly.io)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

#### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

## 🧪 Testing

### Test the API
```bash
curl http://localhost:8000/api/v1/health
```

### Create a test project
```bash
curl -X POST http://localhost:8000/api/v1/builder/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "secret": "your_secret",
    "task": "test-app-001",
    "round": 1,
    "nonce": "test-123",
    "brief": "Create a simple hello world page",
    "checks": [],
    "evaluation_url": "https://httpbin.org/post",
    "attachments": []
  }'
```

## 🎓 Usage Examples

### Creating a Landing Page
1. Go to Builder
2. Fill in your email and secret
3. Task ID: `coffee-shop-landing`
4. Brief: "Create a modern landing page for a coffee shop with hero section, menu, about us, and contact form. Use warm colors and coffee-themed images."
5. Click "Generate Application"
6. Watch real-time progress in the project detail page
7. Access your live site when complete!

### Revising an Existing Project
1. Use the same task ID
2. Select "Round 2 - Revision"
3. Brief: "Add a testimonials section and improve mobile responsiveness"
4. The AI will update the existing repository

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend database errors
```bash
cd backend
rm tds_projects.db  # Reset database
python -c "from app.core.database import init_db; init_db()"
```

### WebSocket not connecting
- Check that backend is running on port 8000
- Verify CORS settings in backend/app/core/config.py
- Check browser console for errors

### GitHub Pages not deploying
- Wait 2-3 minutes after repo creation
- Check repo Settings → Pages is enabled
- Verify GitHub token has correct permissions

## 📝 License

MIT License - see LICENSE file

## 🤝 Contributing

This is a course project, but suggestions are welcome!

## 📧 Support

For issues or questions, check:
1. This README
2. API documentation at `/docs`
3. Project issues on GitHub

---

**Built with ❤️ using React, FastAPI, and Google Gemini AI**
