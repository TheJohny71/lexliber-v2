'use client';

import React from 'react';
import { BookOpen, FileText, Settings } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
      <div className="mt-4 space-y-4">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 rounded-md hover:bg-gray-50">
          <BookOpen className="w-5 h-5 mr-3 text-gray-400" />
          Add New Book
        </button>
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 rounded-md hover:bg-gray-50">
          <FileText className="w-5 h-5 mr-3 text-gray-400" />
          Generate Report
        </button>
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-700 rounded-md hover:bg-gray-50">
          <Settings className="w-5 h-5 mr-3 text-gray-400" />
          Settings
        </button>
      </div>
    </div>
  );
}