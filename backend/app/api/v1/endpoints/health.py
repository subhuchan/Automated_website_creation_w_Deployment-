from fastapi import APIRouter
from ....core.config import settings

router = APIRouter()

@router.get("")
async def health_check():
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "github_configured": bool(settings.GITHUB_TOKEN),
        "gemini_configured": bool(settings.GEMINI_API_KEY)
    }
