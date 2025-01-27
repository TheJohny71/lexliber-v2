import React from 'react';
import { motion } from 'framer-motion';
import { Book, Check, Clock } from 'lucide-react';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    callNumber: string;
    practiceArea: string;
    available: boolean;
    lastCheckout?: string;
  };
  onClick?: (id: string) => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const handleClick = () => {
    onClick?.(book.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl 
                transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-0 
                    group-hover:opacity-100 transition-opacity" />

      <div className="relative p-6">
        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          {book.available ? (
            <motion.div
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400 opacity-0 
                           group-hover:opacity-100 transition-opacity">
                Available
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={false}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 opacity-0 
                           group-hover:opacity-100 transition-opacity">
                Checked Out
              </span>
            </motion.div>
          )}
        </div>

        {/* Book Icon */}
        <div className="mb-4">
          <Book className="w-8 h-8 text-blue-500/50 dark:text-blue-400/50" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {book.title}
          </h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {book.callNumber}
          </p>

          {/* Practice Area Tag */}
          <div className="pt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                         bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              {book.practiceArea}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 dark:from-gray-800/80 
                    to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default BookCard;