'use client';
import React from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full rounded-lg border p-2"
        placeholder="Search books..."
        onChange={handleSearch}
      />
    </div>
  );
}
