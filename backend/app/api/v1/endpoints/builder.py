from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ....core.database import get_db
from ....core.config import settings
from ....models.project import Project, ProjectStatus
from ....schemas.project import ProjectCreate, ProjectResponse
from ....websockets.manager import manager

router = APIRouter()

async def process_request_legacy(data: dict, db: Session):
    """Legacy processing function for backward compatibility"""
    from ....services.llm_generator import generate_app_code, decode_attachments
    from ....services.github_service import create_repo, create_or_update_file, enable_pages, generate_mit_license, create_or_update_binary_file
    from ....services.notification_service import notify_evaluation_server
    import base64
    
    task_id = data["task"]
    round_num = data.get("round", 1)
    
    # Find or create project
    project = db.query(Project).filter(Project.task_id == task_id).first()
    if not project:
        project = Project(
            task_id=task_id,
            email=data["email"],
            brief=data["brief"],
            round_num=round_num,
            nonce=data["nonce"],
            checks=data.get("checks", []),
            attachments=data.get("attachments", []),
            evaluation_url=data["evaluation_url"],
            status=ProjectStatus.PROCESSING
        )
        db.add(project)
        db.commit()
    else:
        project.status = ProjectStatus.PROCESSING
        project.round_num = round_num
        db.commit()
    
    try:
        # Broadcast status update
        await manager.broadcast_project_update(task_id, {
            "status": "processing",
            "message": "Starting project generation..."
        })
        
        # Decode attachments
        attachments = data.get("attachments", [])
        saved_attachments = decode_attachments(attachments)
        
        # Create or get repo
        repo = create_repo(task_id, description=f"Auto-generated app: {data['brief']}")
        project.repo_url = repo.html_url
        db.commit()
        
        await manager.broadcast_project_update(task_id, {
            "status": "processing",
            "message": "Repository created, generating code..."
        })
        
        # Get previous README for round 2
        prev_readme = None
        if round_num == 2:
            try:
                readme = repo.get_contents("README.md")
                prev_readme = readme.decoded_content.decode("utf-8", errors="ignore")
            except:
                prev_readme = None
        
        # Generate code
        gen = generate_app_code(
            data["brief"],
            attachments=attachments,
            checks=data.get("checks", []),
            round_num=round_num,
            prev_readme=prev_readme
        )
        
        files = gen.get("files", {})
        saved_info = gen.get("attachments", [])
        
        await manager.broadcast_project_update(task_id, {
            "status": "processing",
            "message": "Code generated, uploading to GitHub..."
        })
        
        # Upload attachments
        if round_num == 1:
            for att in saved_info:
                path = att["name"]
                try:
                    with open(att["path"], "rb") as f:
                        content_bytes = f.read()
                    if att["mime"].startswith("text") or att["name"].endswith((".md", ".csv", ".json", ".txt")):
                        text = content_bytes.decode("utf-8", errors="ignore")
                        create_or_update_file(repo, path, text, f"Add attachment {path}")
                    else:
                        create_or_update_binary_file(repo, path, content_bytes, f"Add binary {path}")
                except Exception as e:
                    print(f"⚠ Attachment commit failed: {e}")
        
        # Upload generated files
        for fname, content in files.items():
            create_or_update_file(repo, fname, content, f"Add/Update {fname}")
        
        # Add MIT license
        mit_text = generate_mit_license()
        create_or_update_file(repo, "LICENSE", mit_text, "Add MIT license")
        
        await manager.broadcast_project_update(task_id, {
            "status": "processing",
            "message": "Enabling GitHub Pages..."
        })
        
        # Enable GitHub Pages
        if round_num == 1:
            pages_ok = enable_pages(task_id)
            pages_url = f"https://{settings.GITHUB_USERNAME}.github.io/{task_id}/" if pages_ok else None
        else:
            pages_ok = True
            pages_url = f"https://{settings.GITHUB_USERNAME}.github.io/{task_id}/"
        
        project.pages_url = pages_url
        
        # Get commit SHA
        try:
            commit_sha = repo.get_commits()[0].sha
            project.commit_sha = commit_sha
        except:
            commit_sha = None
        
        # Notify evaluation server
        payload = {
            "email": data["email"],
            "task": data["task"],
            "round": round_num,
            "nonce": data["nonce"],
            "repo_url": repo.html_url,
            "commit_sha": commit_sha,
            "pages_url": pages_url,
        }
        
        notify_evaluation_server(data["evaluation_url"], payload)
        project.evaluation_notified = 1
        
        # Mark as completed
        project.status = ProjectStatus.COMPLETED
        project.completed_at = datetime.utcnow()
        db.commit()
        
        await manager.broadcast_project_update(task_id, {
            "status": "completed",
            "message": "Project completed successfully!",
            "repo_url": repo.html_url,
            "pages_url": pages_url
        })
        
        print(f"✅ Finished round {round_num} for {task_id}")
        
    except Exception as e:
        print(f"❌ Error processing {task_id}: {e}")
        project.status = ProjectStatus.FAILED
        project.error_message = str(e)
        db.commit()
        
        await manager.broadcast_project_update(task_id, {
            "status": "failed",
            "message": f"Error: {str(e)}"
        })

@router.post("/create", response_model=ProjectResponse)
async def create_project_endpoint(
    project_data: ProjectCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Create a new project and start processing"""
    
    # Validate secret
    print(f"🔍 DEBUG: Received secret: '{project_data.secret}'")
    print(f"🔍 DEBUG: Expected secret: '{settings.USER_SECRET}'")
    print(f"🔍 DEBUG: Secrets match: {project_data.secret == settings.USER_SECRET}")
    
    if project_data.secret != settings.USER_SECRET:
        print(f"❌ SECRET MISMATCH!")
        print(f"   Received length: {len(project_data.secret)}")
        print(f"   Expected length: {len(settings.USER_SECRET)}")
        print(f"   Received bytes: {project_data.secret.encode()}")
        print(f"   Expected bytes: {settings.USER_SECRET.encode()}")
        raise HTTPException(status_code=403, detail="Invalid secret")
    
    # Check for duplicate
    existing = db.query(Project).filter(
        Project.task_id == project_data.task,
        Project.nonce == project_data.nonce,
        Project.round_num == project_data.round
    ).first()
    
    if existing:
        return existing
    
    # Create project record
    project = Project(
        task_id=project_data.task,
        email=project_data.email,
        brief=project_data.brief,
        round_num=project_data.round,
        nonce=project_data.nonce,
        checks=project_data.checks,
        attachments=[att.dict() for att in project_data.attachments],
        evaluation_url=project_data.evaluation_url,
        status=ProjectStatus.PENDING
    )
    
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Schedule background processing
    background_tasks.add_task(process_request_legacy, project_data.dict(), db)
    
    # Broadcast new project
    await manager.broadcast_global({
        "type": "new_project",
        "project": {
            "task_id": project.task_id,
            "status": project.status.value,
            "brief": project.brief
        }
    })
    
    return project
