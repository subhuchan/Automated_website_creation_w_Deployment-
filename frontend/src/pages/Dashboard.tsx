import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { projectsApi } from '@/lib/api'
import { formatRelativeTime } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, CheckCircle2, Clock, Loader2, Rocket, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['project-stats'],
    queryFn: projectsApi.getStats,
    refetchInterval: 5000,
  })

  const { data: recentProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ['recent-projects'],
    queryFn: () => projectsApi.getProjects({ limit: 5 }),
    refetchInterval: 5000,
  })

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.total_projects || 0,
      icon: Rocket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: stats?.completed || 0,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Processing',
      value: stats?.processing || 0,
      icon: Loader2,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Failed',
      value: stats?.failed || 0,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: 'success',
      processing: 'warning',
      failed: 'destructive',
      pending: 'secondary',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your AI-generated applications
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.title === 'Completed' && stats && stats.total_projects > 0 && (
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {Math.round((stats.completed / stats.total_projects) * 100)}% success rate
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with building your next app</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button onClick={() => navigate('/builder')} size="lg">
            <Rocket className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
          <Button onClick={() => navigate('/projects')} variant="outline" size="lg">
            View All Projects
          </Button>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your latest generated applications</CardDescription>
        </CardHeader>
        <CardContent>
          {projectsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : recentProjects?.projects?.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.projects.map((project: any) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/projects/${project.task_id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{project.task_id}</h4>
                      {getStatusBadge(project.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                      {project.brief}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatRelativeTime(project.created_at)}
                      </span>
                      <span>Round {project.round_num}</span>
                    </div>
                  </div>
                  {project.pages_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.pages_url, '_blank')
                      }}
                    >
                      View Live
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No projects yet. Create your first one!</p>
              <Button onClick={() => navigate('/builder')} className="mt-4">
                Get Started
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
