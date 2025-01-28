import React from 'react';
'use client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <main className="flex-1 space-y-4 p-8 pt-6">{children}</main>
    </div>
  );
}
