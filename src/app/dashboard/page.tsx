'use client';

import React, { Fragment } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Fragment>
      <div className="flex min-h-screen flex-col space-y-6">
        <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </main>
      </div>
    </Fragment>
  );
}