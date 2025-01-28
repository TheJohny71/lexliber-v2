'use client';

import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 w-full bg-white border-b border-gray-200 h-16">
        Top Navigation
      </div>
      <div className="fixed left-0 top-16 w-64 bg-white border-r border-gray-200 h-full">
        Sidebar
      </div>
      <main className="pl-64 pt-16">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}