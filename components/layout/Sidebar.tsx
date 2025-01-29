import { useState } from 'react'
import { BarChart3, Users, Library, Settings, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col h-screen p-4 bg-white dark:bg-gray-800",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="space-y-4">
        <Button variant="ghost" className="w-full justify-start">
          <Library className="h-5 w-5 mr-2" />
          {!collapsed && <span>Library</span>}
        </Button>
      </div>
    </div>
  )
}