import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Book, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'book' | 'practice' | 'recent';
  subtitle?: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  className?: string;
}

export const SearchBar = ({ onSearch, onSuggestionSelect, className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - replace with real data
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Corporate Law Fundamentals', type: 'book', subtitle: 'LAW-123.45' },
    { id: '2', title: 'Intellectual Property', type: 'practice' },
    { id: '3', title: 'Contract Negotiations', type: 'recent' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query) {
      // In a real app, this would be an API call
      setSuggestions(mockSuggestions.filter(s => 
        s.title.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <motion.div
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
            : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
        className="relative bg-white dark:bg-gray-800 rounded-xl"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search library resources..."
            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                     bg-transparent focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
                     text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Suggestions Panel */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-full left-0 right-0 mt-2 py-2 bg-white dark:bg-gray-800 
                     rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {suggestions.map((suggestion) => (
              <motion.button
                key={suggestion.id}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                onClick={() => onSuggestionSelect?.(suggestion)}
                className="w-full px-4 py-2 flex items-center space-x-3 text-left"
              >
                {suggestion.type === 'book' ? (
                  <Book className="w-5 h-5 text-blue-500" />
                ) : suggestion.type === 'practice' ? (
                  <BookOpen className="w-5 h-5 text-green-500" />
                ) : (
                  <Search className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {suggestion.title}
                  </div>
                  {suggestion.subtitle && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {suggestion.subtitle}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;