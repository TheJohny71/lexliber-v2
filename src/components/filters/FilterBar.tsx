'use client';
import React from 'react';

interface FilterBarProps {
  onFilter?: (filters: any) => void;
}

export function FilterBar({ onFilter }: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="font-medium">Filters</h3>
        {/* Add filter controls here */}
      </div>
    </div>
  );
}
