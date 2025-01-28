'use client';

import React from 'react';
import { TopNav } from '@/components/ui/TopNav';
import { Sidebar } from '@/components/ui/Sidebar';
import { QuickStats } from '@/components/ui/QuickStats';
import { QuickActions } from '@/components/ui/QuickActions';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <Sidebar />
      
      {/* Main Content */}
      <main className="min-h-screen pl-64 pt-16">
        <div className="px-8 py-6">
          <QuickStats />

          {/* Main Content Area */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="col-span-2">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                {children}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}