'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome to LexLiber
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your centralized law library catalog system
        </p>
        
        {/* Welcome Card */}
        <div className="mt-6 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
          <h2 className="text-xl font-medium">Getting Started</h2>
          <p className="mt-2">
            Access thousands of legal resources, manage your library, and collaborate with your team.
          </p>
          <div className="mt-4 space-x-4">
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-opacity-90">
              Browse Library
            </button>
            <button className="px-4 py-2 border border-white text-white rounded-md font-medium hover:bg-white hover:bg-opacity-10">
              View Tutorial
            </button>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Books</h3>
            <p className="mt-2 text-gray-600">Continue where you left off</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">My Checkouts</h3>
            <p className="mt-2 text-gray-600">Manage your borrowed resources</p>
          </div>
        </div>
      </div>
    </div>
  );
}