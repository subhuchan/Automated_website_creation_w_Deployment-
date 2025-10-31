import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { projectsApi } from '@/lib/api'
import { generateNonce } from '@/lib/utils'
import type { CreateProjectRequest } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Plus, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Builder() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    secret: '',
    task: '',
    brief: '',
    round: 1,
    evaluationUrl: 'https://httpbin.org/post',
    checks: [''] as string[],
  })

  const createMutation = useMutation({
    mutationFn: (data: CreateProjectRequest) => projectsApi.createProject(data),
    onSuccess: (data) => {
      navigate(`/projects/${data.task_id}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData: CreateProjectRequest = {
      email: formData.email,
      secret: formData.secret,
      task: formData.task,
      round: formData.round,
      nonce: generateNonce(),
      brief: formData.brief,
      checks: formData.checks.filter(c => c.trim() !== ''),
      evaluation_url: formData.evaluationUrl,
      attachments: [],
    }

    createMutation.mutate(projectData)
  }

  const addCheck = () => {
    setFormData(prev => ({ ...prev, checks: [...prev.checks, ''] }))
  }

  const removeCheck = (index: number) => {
    setFormData(prev => ({
      ...prev,
      checks: prev.checks.filter((_, i) => i !== index)
    }))
  }

  const updateCheck = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      checks: prev.checks.map((c, i) => i === index ? value : c)
    }))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">App Builder</h2>
        <p className="text-muted-foreground">
          Create a new AI-generated application
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Project Configuration
          </CardTitle>
          <CardDescription>
            Fill in the details below to generate your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            {/* Secret */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Secret Key</label>
              <Input
                type="password"
                placeholder="Your secret key"
                value={formData.secret}
                onChange={(e) => setFormData(prev => ({ ...prev, secret: e.target.value }))}
                required
              />
              <p className="text-xs text-muted-foreground">
                This should match the USER_SECRET in your .env file
              </p>
            </div>

            {/* Task ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Task ID</label>
              <Input
                type="text"
                placeholder="my-awesome-app"
                value={formData.task}
                onChange={(e) => setFormData(prev => ({ ...prev, task: e.target.value }))}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be your GitHub repository name (use lowercase and hyphens)
              </p>
            </div>

            {/* Brief */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Brief</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the application you want to build... Be specific about features, design, and functionality."
                value={formData.brief}
                onChange={(e) => setFormData(prev => ({ ...prev, brief: e.target.value }))}
                required
              />
              <p className="text-xs text-muted-foreground">
                Example: "Create a responsive landing page for a coffee shop with a menu section, contact form, and image gallery"
              </p>
            </div>

            {/* Round */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Round</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.round}
                onChange={(e) => setFormData(prev => ({ ...prev, round: parseInt(e.target.value) }))}
              >
                <option value={1}>Round 1 - New Project</option>
                <option value={2}>Round 2 - Revision</option>
              </select>
            </div>

            {/* Checks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Evaluation Checks (Optional)</label>
                <Button type="button" variant="outline" size="sm" onClick={addCheck}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Check
                </Button>
              </div>
              {formData.checks.map((check, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Must have responsive design"
                    value={check}
                    onChange={(e) => updateCheck(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCheck(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Evaluation URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Evaluation URL</label>
              <Input
                type="url"
                placeholder="https://httpbin.org/post"
                value={formData.evaluationUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, evaluationUrl: e.target.value }))}
                required
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={createMutation.isPending}
                className="flex-1"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Application
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>

            {createMutation.isError && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                <p className="text-sm text-destructive">
                  Error: {(createMutation.error as any)?.response?.data?.detail || 'Failed to create project'}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
