'use client';
import React from 'react';

interface FilterOptions {
  category?: string;
  year?: number;
  status?: 'available' | 'checked_out';
}

interface FilterBarProps {
  onFilter?: (filters: FilterOptions) => void;
}

export function FilterBar({ onFilter }: FilterBarProps) {
  const handleFilterChange = (filters: FilterOptions) => {
    onFilter?.(filters);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">Filters</h3>
        <div className="mt-2 space-y-2">
          <select 
            className="w-full rounded border p-2"
            onChange={(e) => handleFilterChange({ category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="law">Law</option>
            <option value="reference">Reference</option>
          </select>
        </div>
      </div>
    </div>
  );
}
