"use client"

import { ReactNode } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { 
  BarChart3, 
  Library, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Overview',
    icon: BarChart3,
    href: '/admin'
  },
  {
    title: 'Catalog',
    icon: Library,
    href: '/admin/catalog'
  },
  {
    title: 'Users',
    icon: Users,
    href: '/admin/users'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings'
  }
]

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar 
          items={adminNavItems}
          footerItems={[
            {
              title: 'Logout',
              icon: LogOut,
              href: '/auth/logout'
            }
          ]}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}