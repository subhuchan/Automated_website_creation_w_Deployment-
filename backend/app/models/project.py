from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, JSON
from sqlalchemy.sql import func
from ..core.database import Base
import enum

class ProjectStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, index=True)
    brief = Column(Text, nullable=False)
    round_num = Column(Integer, default=1)
    nonce = Column(String)
    
    status = Column(Enum(ProjectStatus), default=ProjectStatus.PENDING)
    
    # GitHub info
    repo_url = Column(String)
    pages_url = Column(String)
    commit_sha = Column(String)
    
    # Metadata
    checks = Column(JSON)
    attachments = Column(JSON)
    
    # Evaluation
    evaluation_url = Column(String)
    evaluation_notified = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True))
    
    # Error tracking
    error_message = Column(Text)
