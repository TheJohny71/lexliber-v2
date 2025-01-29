"use client"

import { useState } from 'react'
import { BookCard } from '@/components/books/BookCard'
import { SearchBar } from '@/components/search/SearchBar'
import { FilterBar } from '@/components/search/FilterBar'
import { Button } from '@/components/ui/button'
import { LayoutGrid, List } from 'lucide-react'

type ViewMode = 'grid' | 'list'

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    status: '',
    category: ''
  })

  // Placeholder data - replace with actual data fetching
  const books = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      location: 'Fiction Section',
      callNumber: 'F FITZ',
      status: 'Available',
      coverUrl: '/api/placeholder/200/300'
    },
    // Add more sample books...
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Library Catalog</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="sticky top-4 z-10 space-y-4 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar filters={selectedFilters} onChange={setSelectedFilters} />
      </div>

      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        : "space-y-4"
      }>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}