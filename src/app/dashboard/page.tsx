'use client';

import React from 'react';
import { TopNav } from '../../components/ui/TopNav';
import { Sidebar } from '../../components/ui/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <Sidebar />
      <main className="pl-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}