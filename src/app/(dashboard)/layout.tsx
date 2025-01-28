'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterBar } from '@/components/filters/FilterBar';

// Define the Filter type to match your FilterBar component
interface Filter {
  id: string;
  label: string;
  type: 'practice' | 'status' | 'other';
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Sample filters matching your Filter interface
  const availableFilters: Filter[] = [
    { id: 'corporate', label: 'Corporate Law', type: 'practice' },
    { id: 'litigation', label: 'Litigation', type: 'practice' },
    { id: 'ip', label: 'Intellectual Property', type: 'practice' },
    { id: 'active', label: 'Active', type: 'status' },
    { id: 'archived', label: 'Archived', type: 'status' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterSelect = (filterId: string) => {
    if (!selectedFilters.includes(filterId)) {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  const handleFilterRemove = (filterId: string) => {
    setSelectedFilters(selectedFilters.filter(id => id !== filterId));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/75 dark:bg-gray-900/75
          ${scrolled ? 'border-b border-gray-200 dark:border-gray-800' : ''}`}
        initial={false}
        animate={scrolled ? { height: '4rem' } : { height: '5rem' }}
        transition={{ duration: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-8"
            animate={scrolled ? { scale: 0.9 } : { scale: 1 }}
          >
            <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              LexLiber
            </h1>
            <div className="w-96">
              <SearchBar />
            </div>
          </motion.div>
          
          <nav className="hidden md:flex items-center">
            <FilterBar 
              filters={availableFilters}
              selectedFilters={selectedFilters}
              onFilterSelect={handleFilterSelect}
              onFilterRemove={handleFilterRemove}
              className="min-w-[300px]"
            />
          </nav>
        </div>
      </motion.header>

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
    </div>
  );
}