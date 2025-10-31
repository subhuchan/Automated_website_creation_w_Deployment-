import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { projectsApi } from '@/lib/api'
import { formatRelativeTime } from '@/lib/utils'
import type { ProjectStatus } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Clock, ExternalLink, Github, Loader2, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['projects', statusFilter],
    queryFn: () => projectsApi.getProjects({
      status: statusFilter === 'all' ? undefined : statusFilter
    }),
    refetchInterval: 5000,
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: 'success',
      processing: 'warning',
      failed: 'destructive',
      pending: 'secondary',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const filteredProjects = data?.projects?.filter((project: any) =>
    project.task_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.brief.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage all your generated applications
          </p>
        </div>
        <Button onClick={() => navigate('/builder')}>
          Create New Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'completed', 'processing', 'failed', 'pending'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project: any) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/projects/${project.task_id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.task_id}</CardTitle>
                  {getStatusBadge(project.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.brief}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(project.created_at)}
                  <span>•</span>
                  <span>Round {project.round_num}</span>
                </div>

                {project.status === 'completed' && (
                  <div className="flex gap-2">
                    {project.repo_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.repo_url, '_blank')
                        }}
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Repo
                      </Button>
                    )}
                    {project.pages_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.pages_url, '_blank')
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live
                      </Button>
                    )}
                  </div>
                )}

                {project.status === 'processing' && (
                  <div className="flex items-center gap-2 text-sm text-yellow-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </div>
                )}

                {project.status === 'failed' && project.error_message && (
                  <p className="text-xs text-destructive line-clamp-1">
                    {project.error_message}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== 'all'
                ? 'No projects match your filters'
                : 'No projects yet. Create your first one!'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button onClick={() => navigate('/builder')} className="mt-4">
                Create Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {data && data.total > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {data.total} projects
        </div>
      )}
    </div>
  )
}
