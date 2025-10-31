import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Builder from './pages/Builder'
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import Projects from './pages/Projects'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="builder" element={<Builder />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:taskId" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
