from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime
from ..models.project import ProjectStatus

class AttachmentSchema(BaseModel):
    name: str
    url: str

class ProjectCreate(BaseModel):
    email: EmailStr
    secret: str
    task: str
    round: int = 1
    nonce: str
    brief: str
    checks: List[str] = []
    evaluation_url: str
    attachments: List[AttachmentSchema] = []

class ProjectResponse(BaseModel):
    id: int
    task_id: str
    email: str
    brief: str
    round_num: int
    status: ProjectStatus
    repo_url: Optional[str] = None
    pages_url: Optional[str] = None
    commit_sha: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
    
    class Config:
        from_attributes = True

class ProjectListResponse(BaseModel):
    total: int
    projects: List[ProjectResponse]

class ProjectStats(BaseModel):
    total_projects: int
    completed: int
    processing: int
    failed: int
    pending: int
