from pydantic_settings import BaseSettings
from typing import Optional
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from parent directory (root of project)
# Try multiple possible locations
env_paths = [
    Path(__file__).parent.parent.parent / ".env",  # From backend/app/core/config.py -> root
    Path.cwd() / ".env",  # Current working directory
    Path.cwd().parent / ".env",  # Parent of current working directory
]

env_loaded = False
for env_path in env_paths:
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        print(f"📁 Loaded .env from: {env_path}")
        env_loaded = True
        break

if not env_loaded:
    print(f"⚠️  Warning: .env file not found in any of these locations:")
    for p in env_paths:
        print(f"   - {p}")

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "TDS App Builder"
    VERSION: str = "2.0.0"
    
    # CORS
    BACKEND_CORS_ORIGINS: list = ["http://localhost:5173", "http://localhost:3000"]
    
    # Database (use /tmp for Vercel serverless)
    DATABASE_URL: str = "sqlite:////tmp/tds_projects.db"
    
    # GitHub
    GITHUB_TOKEN: str = ""
    GITHUB_USERNAME: str = ""
    
    # AI
    GEMINI_API_KEY: str = ""
    
    # Security
    USER_SECRET: str = ""
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # Paths
    TEMP_DIR: Path = Path("/tmp/tds_attachments")
    
    class Config:
        case_sensitive = True

settings = Settings()

# Ensure temp directory exists
settings.TEMP_DIR.mkdir(parents=True, exist_ok=True)

# Print loaded values for debugging (remove in production)
print(f"🔑 USER_SECRET loaded: {'✅ Yes' if settings.USER_SECRET else '❌ No'}")
if settings.USER_SECRET:
    print(f"🔑 USER_SECRET value: '{settings.USER_SECRET}'")
    print(f"🔑 USER_SECRET length: {len(settings.USER_SECRET)}")
print(f"🔑 GITHUB_TOKEN loaded: {'✅ Yes' if settings.GITHUB_TOKEN else '❌ No'}")
print(f"🔑 GEMINI_API_KEY loaded: {'✅ Yes' if settings.GEMINI_API_KEY else '❌ No'}")
