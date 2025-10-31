from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from ....core.database import get_db
from ....models.project import Project, ProjectStatus
from ....schemas.project import ProjectResponse, ProjectListResponse, ProjectStats

router = APIRouter()

@router.get("/stats", response_model=ProjectStats)
async def get_project_stats(db: Session = Depends(get_db)):
    """Get project statistics"""
    total = db.query(Project).count()
    completed = db.query(Project).filter(Project.status == ProjectStatus.COMPLETED).count()
    processing = db.query(Project).filter(Project.status == ProjectStatus.PROCESSING).count()
    failed = db.query(Project).filter(Project.status == ProjectStatus.FAILED).count()
    pending = db.query(Project).filter(Project.status == ProjectStatus.PENDING).count()
    
    return ProjectStats(
        total_projects=total,
        completed=completed,
        processing=processing,
        failed=failed,
        pending=pending
    )

@router.get("", response_model=ProjectListResponse)
async def list_projects(
    skip: int = 0,
    limit: int = 50,
    status: Optional[ProjectStatus] = None,
    db: Session = Depends(get_db)
):
    """List all projects with optional filtering"""
    query = db.query(Project)
    
    if status:
        query = query.filter(Project.status == status)
    
    total = query.count()
    projects = query.order_by(Project.created_at.desc()).offset(skip).limit(limit).all()
    
    return ProjectListResponse(total=total, projects=projects)

@router.get("/{task_id}", response_model=ProjectResponse)
async def get_project(task_id: str, db: Session = Depends(get_db)):
    """Get a specific project by task_id"""
    project = db.query(Project).filter(Project.task_id == task_id).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return project

@router.delete("/{task_id}")
async def delete_project(task_id: str, db: Session = Depends(get_db)):
    """Delete a project"""
    project = db.query(Project).filter(Project.task_id == task_id).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(project)
    db.commit()
    
    return {"message": "Project deleted successfully"}
