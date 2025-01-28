'use client';

import React from 'react';
import { Home, LibraryBig, FileText, UserCircle } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard', current: true },
  { name: 'Library', icon: LibraryBig, href: '/dashboard/library', current: false },
  { name: 'Documents', icon: FileText, href: '/dashboard/documents', current: false },
  { name: 'My Profile', icon: UserCircle, href: '/dashboard/profile', current: false },
];

export function Sidebar() {
  return (
    <div className="fixed bottom-0 left-0 top-16 w-64 bg-white border-r border-gray-200">
      <nav className="px-4 mt-6 space-y-2">
        {navigationItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group ${
              item.current
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
              item.current ? 'text-indigo-600' : 'text-gray-400'
            }`} />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
}