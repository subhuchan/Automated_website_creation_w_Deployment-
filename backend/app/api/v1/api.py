from fastapi import APIRouter
from .endpoints import projects, builder, health

router = APIRouter()

router.include_router(health.router, prefix="/health", tags=["health"])
router.include_router(projects.router, prefix="/projects", tags=["projects"])
router.include_router(builder.router, prefix="/builder", tags=["builder"])
