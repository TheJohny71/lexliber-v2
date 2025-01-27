import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Filter {
  id: string;
  label: string;
  type: 'practice' | 'status' | 'other';
}

interface FilterBarProps {
  filters: Filter[];
  selectedFilters: string[];
  onFilterSelect: (filterId: string) => void;
  onFilterRemove: (filterId: string) => void;
  className?: string;
}

export const FilterBar = ({ 
  filters, 
  selectedFilters, 
  onFilterSelect, 
  onFilterRemove,
  className = '' 
}: FilterBarProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Active Filters */}
      <AnimatePresence>
        {selectedFilters.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2"
          >
            {selectedFilters.map(filterId => {
              const filter = filters.find(f => f.id === filterId);
              if (!filter) return null;

              return (
                <motion.button
                  key={filter.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFilterRemove(filter.id)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                           bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400
                           hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                >
                  {filter.label}
                  <X className="w-4 h-4 ml-1" />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Options */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(filter => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterSelect(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                     transition-colors ${
              selectedFilters.includes(filter.id)
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;