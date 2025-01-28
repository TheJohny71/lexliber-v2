'use client';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
          Welcome to LexLiber
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Your centralized law library catalog system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Total Documents', 'Recent Updates', 'Active Users'].map((stat) => (
          <div 
            key={stat}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat}
            </h3>
            <p className="mt-2 text-2xl font-medium text-gray-900 dark:text-gray-100">
              {Math.floor(Math.random() * 1000)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}