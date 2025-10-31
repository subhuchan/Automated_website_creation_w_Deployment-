from fastapi import FastAPI, Request, BackgroundTasks, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager
import os

from .core.config import settings
from .core.database import init_db, get_db
from .api.v1 import api as api_v1
from .websockets.manager import manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Initializing database...")
    init_db()
    print("✅ Database initialized")
    yield
    # Shutdown
    print("👋 Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_v1.router, prefix=settings.API_V1_STR)

# WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle subscription requests
            import json
            try:
                msg = json.loads(data)
                if msg.get("type") == "subscribe" and msg.get("task_id"):
                    await manager.subscribe_to_project(websocket, msg["task_id"])
                    await websocket.send_text(json.dumps({
                        "type": "subscribed",
                        "task_id": msg["task_id"]
                    }))
            except:
                pass
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Legacy endpoint for backward compatibility
from .api.v1.endpoints.builder import process_request_legacy
from .schemas.project import ProjectCreate

@app.post("/api-endpoint")
async def legacy_endpoint(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Legacy endpoint for backward compatibility"""
    data = await request.json()
    
    # Validate secret
    if data.get("secret") != settings.USER_SECRET:
        return {"error": "Invalid secret"}
    
    # Convert to new schema
    project_data = ProjectCreate(**data)
    
    # Process using new system
    from .api.v1.endpoints.builder import create_project_endpoint
    return await create_project_endpoint(project_data, background_tasks, db)

# Root endpoint
@app.get("/", response_class=HTMLResponse)
async def root():
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>{settings.PROJECT_NAME}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body {{ 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 40px 0;
            }}
            .card {{ box-shadow: 0 10px 40px rgba(0,0,0,0.2); }}
            .badge {{ font-size: 0.9em; }}
            pre {{ background: #f8f9fa; padding: 15px; border-radius: 5px; }}
            .feature-box {{
                background: white;
                padding: 20px;
                border-radius: 10px;
                margin: 10px 0;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-body p-5">
                    <h1 class="text-center mb-4">🚀 {settings.PROJECT_NAME}</h1>
                    <h4 class="text-center text-muted mb-5">AI-Powered Application Builder v{settings.VERSION}</h4>
                    
                    <div class="alert alert-success">
                        <h5>✅ Server Status: Running</h5>
                        <p class="mb-0">AI Model: <strong>Google Gemini 2.5 Flash</strong></p>
                        <p class="mb-0">GitHub User: <strong>{settings.GITHUB_USERNAME}</strong></p>
                        <p class="mb-0">API Version: <strong>{settings.API_V1_STR}</strong></p>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-6">
                            <div class="feature-box">
                                <h5>🎨 Modern Web Interface</h5>
                                <p>Access the React dashboard at:</p>
                                <a href="http://localhost:5173" target="_blank" class="btn btn-primary">Open Dashboard</a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="feature-box">
                                <h5>📚 API Documentation</h5>
                                <p>Interactive API docs:</p>
                                <a href="/docs" target="_blank" class="btn btn-info">Swagger UI</a>
                                <a href="/redoc" target="_blank" class="btn btn-secondary ms-2">ReDoc</a>
                            </div>
                        </div>
                    </div>

                    <h5 class="mt-4">🔌 API Endpoints</h5>
                    <ul>
                        <li><strong>POST</strong> <code>{settings.API_V1_STR}/builder/create</code> - Create new project</li>
                        <li><strong>GET</strong> <code>{settings.API_V1_STR}/projects</code> - List all projects</li>
                        <li><strong>GET</strong> <code>{settings.API_V1_STR}/projects/{{task_id}}</code> - Get project details</li>
                        <li><strong>GET</strong> <code>{settings.API_V1_STR}/projects/stats</code> - Get statistics</li>
                        <li><strong>WebSocket</strong> <code>/ws</code> - Real-time updates</li>
                    </ul>

                    <h5 class="mt-4">✨ New Features</h5>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="feature-box">
                                <h6>📊 Dashboard</h6>
                                <p>Visual overview of all projects</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feature-box">
                                <h6>🔄 Real-time Updates</h6>
                                <p>WebSocket-based live progress</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feature-box">
                                <h6>💾 Database</h6>
                                <p>Persistent project history</p>
                            </div>
                        </div>
                    </div>

                    <div class="text-center mt-5">
                        <p class="text-muted">Powered by Google Gemini • FastAPI • React • GitHub API</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return html_content

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "github_configured": bool(settings.GITHUB_TOKEN),
        "gemini_configured": bool(settings.GEMINI_API_KEY)
    }

# Vercel serverless handler
handler = app
