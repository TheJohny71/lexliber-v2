"use client"

import { useState } from 'react'
import { BookCard } from '@/components/books/BookCard'
import { SearchBar } from '@/components/search/SearchBar'
import { FilterBar } from '@/components/search/FilterBar'
import { Button } from '@/components/ui/button'
import { LayoutGrid, List } from 'lucide-react'
import { useDebounce } from '@/lib/hooks/use-debounce'

type ViewMode = 'grid' | 'list'

interface Book {
  id: string
  title: string
  author: string
  location: string
  callNumber: string
  status: string
  coverUrl: string
}

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    status: '',
    category: ''
  })

  const debouncedSearch = useDebounce(searchQuery, 300)

  // Mock data - replace with actual API call
  const books: Book[] = [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      location: 'Fiction Section',
      callNumber: 'F FITZ',
      status: 'Available',
      coverUrl: '/api/placeholder/200/300'
    },
    {
      id: '2',
      title: '1984',
      author: 'George Orwell',
      location: 'Fiction Section',
      callNumber: 'F ORWE',
      status: 'Checked Out',
      coverUrl: '/api/placeholder/200/300'
    },
    {
      id: '3',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      location: 'Fiction Section',
      callNumber: 'F LEE',
      status: 'Available',
      coverUrl: '/api/placeholder/200/300'
    },
    // Add more books as needed
  ]

  // Filter books based on search and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         book.author.toLowerCase().includes(debouncedSearch.toLowerCase())
    
    const matchesLocation = !selectedFilters.location || book.location === selectedFilters.location
    const matchesStatus = !selectedFilters.status || book.status === selectedFilters.status
    
    return matchesSearch && matchesLocation && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Library Catalog</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="sticky top-4 z-10 space-y-4 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Search by title or author..."
        />
        <FilterBar 
          filters={selectedFilters} 
          onChange={setSelectedFilters} 
        />
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "space-y-4"
        }>
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  )
}