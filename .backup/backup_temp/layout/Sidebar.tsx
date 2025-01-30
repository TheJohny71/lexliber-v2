"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface NavItem {
  title: string
  icon: LucideIcon
  href: string
}

interface SidebarProps {
  items: NavItem[]
  footerItems?: NavItem[]
}

export function Sidebar({ items, footerItems }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col h-full border-r bg-card transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col flex-1 p-4">
        <Button 
          variant="ghost" 
          className="mb-4 justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </Button>
        
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-primary/10"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5",
                    collapsed ? "mr-0" : "mr-2"
                  )} />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
      
      {footerItems && (
        <div className="p-4 border-t">
          {footerItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Icon className={cn(
                    "h-5 w-5",
                    collapsed ? "mr-0" : "mr-2"
                  )} />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}