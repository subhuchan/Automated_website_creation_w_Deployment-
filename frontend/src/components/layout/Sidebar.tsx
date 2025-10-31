import { cn } from '@/lib/utils'
import { FolderGit2, Hammer, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Builder', href: '/builder', icon: Hammer },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 border-r bg-background/50 backdrop-blur">
      <nav className="space-y-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
