export type ProjectStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface Project {
  id: number
  task_id: string
  email: string
  brief: string
  round_num: number
  status: ProjectStatus
  repo_url?: string
  pages_url?: string
  commit_sha?: string
  created_at: string
  updated_at?: string
  completed_at?: string
  error_message?: string
}

export interface ProjectStats {
  total_projects: number
  completed: number
  processing: number
  failed: number
  pending: number
}

export interface Attachment {
  name: string
  url: string
}

export interface CreateProjectRequest {
  email: string
  secret: string
  task: string
  round: number
  nonce: string
  brief: string
  checks: string[]
  evaluation_url: string
  attachments: Attachment[]
}

export interface WebSocketMessage {
  type: 'project_update' | 'global_update' | 'subscribed'
  task_id?: string
  data?: any
}
