'use client';
import React from 'react';

interface BookCardProps {
  title: string;
  author?: string;
  description?: string;
}

export function BookCard({ title, author, description }: BookCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="text-lg font-medium">{title}</h3>
      {author && <p className="text-sm text-gray-600">{author}</p>}
      {description && <p className="mt-2 text-sm">{description}</p>}
    </div>
  );
}
