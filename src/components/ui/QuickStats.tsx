'use client';

import React from 'react';
import { BookOpen, Users, Clock } from 'lucide-react';

const quickStats = [
  { name: 'Total Books', value: '24,389', icon: BookOpen, trend: '+2.5%' },
  { name: 'Active Users', value: '1,892', icon: Users, trend: '+12.3%' },
  { name: 'Recent Downloads', value: '3,456', icon: Clock, trend: '+8.1%' },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
      {quickStats.map((stat) => (
        <div
          key={stat.name}
          className="p-6 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50">
              <stat.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {stat.name}
              </p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <span className="ml-2 text-sm font-medium text-green-600">
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}