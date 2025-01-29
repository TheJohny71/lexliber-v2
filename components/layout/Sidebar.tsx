import React from 'react';
import { 
  BarChart3, 
  Library, 
  Users, 
  Settings,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: BarChart3
    },
    {
      title: "Catalog",
      href: "/dashboard/catalog",
      icon: Library
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/dashboard">
            <h2 className="mb-2 px-4 text-lg font-semibold">
              LexLiber Admin
            </h2>
          </Link>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                <span
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
                    pathname === item.href ? "bg-gray-100 dark:bg-gray-800" : "transparent",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}