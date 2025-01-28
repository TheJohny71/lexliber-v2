'use client';

import React from 'react';
import { Search, Bell, BookOpen } from 'lucide-react';

export function TopNav() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">LexLiber</span>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search library..."
                />
              </div>
            </div>
            
            <button className="p-2 ml-4 text-gray-400 hover:text-gray-500">
              <Bell className="w-6 h-6" />
            </button>
            
            <div className="ml-4">
              <img
                className="w-8 h-8 rounded-full"
                src="/api/placeholder/32/32"
                alt="User"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}