import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { projectsApi } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { wsClient } from '@/lib/websocket'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, ArrowLeft, Calendar, ExternalLink, Github, Hash, Loader2, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { taskId } = useParams<{ taskId: string }>()
  const navigate = useNavigate()
  const [liveStatus, setLiveStatus] = useState<any>(null)

  const { data: project, isLoading, refetch } = useQuery({
    queryKey: ['project', taskId],
    queryFn: () => projectsApi.getProject(taskId!),
    enabled: !!taskId,
  })

  useEffect(() => {
    if (!taskId) return

    const unsubscribe = wsClient.subscribe(`project:${taskId}`, (data) => {
      setLiveStatus(data)
      refetch()
    })

    return unsubscribe
  }, [taskId, refetch])

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: 'success',
      processing: 'warning',
      failed: 'destructive',
      pending: 'secondary',
    }
    return <Badge variant={variants[status] || 'default'} className="text-sm">{status}</Badge>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Button onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{project.task_id}</h2>
          <p className="text-muted-foreground">Project Details</p>
        </div>
        {getStatusBadge(project.status)}
      </div>

      {/* Live Status Updates */}
      {liveStatus && project.status === 'processing' && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-100">
                  {liveStatus.message || 'Processing...'}
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  This updates in real-time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {project.status === 'failed' && project.error_message && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{project.error_message}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Hash className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Task ID</p>
                <p className="text-sm text-muted-foreground">{project.task_id}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{project.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">{formatDate(project.created_at)}</p>
              </div>
            </div>

            {project.completed_at && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed</p>
                  <p className="text-sm text-muted-foreground">{formatDate(project.completed_at)}</p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t">
              <p className="text-sm font-medium mb-1">Round</p>
              <Badge>{project.round_num}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
            <CardDescription>Access your generated application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.repo_url ? (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(project.repo_url, '_blank')}
              >
                <Github className="h-4 w-4 mr-2" />
                View Repository
                <ExternalLink className="h-3 w-3 ml-auto" />
              </Button>
            ) : (
              <div className="p-4 border rounded-lg text-sm text-muted-foreground">
                Repository not yet created
              </div>
            )}

            {project.pages_url ? (
              <Button
                className="w-full justify-start"
                onClick={() => window.open(project.pages_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Application
              </Button>
            ) : (
              <div className="p-4 border rounded-lg text-sm text-muted-foreground">
                {project.status === 'completed'
                  ? 'GitHub Pages URL not available'
                  : 'Application not yet deployed'}
              </div>
            )}

            {project.commit_sha && (
              <div className="pt-2 border-t">
                <p className="text-xs font-medium text-muted-foreground mb-1">Commit SHA</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {project.commit_sha.substring(0, 7)}
                </code>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Brief */}
      <Card>
        <CardHeader>
          <CardTitle>Project Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">{project.brief}</p>
        </CardContent>
      </Card>
    </div>
  )
}
