"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, MapPin } from 'lucide-react'

interface Book {
  id: string
  title: string
  author: string
  location: string
  callNumber: string
  status: string
  coverUrl: string
  description?: string
  isbn?: string
  publishedDate?: string
  publisher?: string
  language?: string
  pages?: number
}

interface BookCardProps {
  book: Book
  viewMode: 'grid' | 'list'
}

export function BookCard({ book, viewMode }: BookCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const statusColor = {
    'Available': 'bg-green-500/15 text-green-500 border-green-500/30',
    'Checked Out': 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
    'On Hold': 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    'In Processing': 'bg-purple-500/15 text-purple-500 border-purple-500/30',
    'Lost': 'bg-red-500/15 text-red-500 border-red-500/30'
  }[book.status] || 'bg-gray-500/15 text-gray-500 border-gray-500/30'

  if (viewMode === 'list') {
    return (
      <Card className="flex items-center gap-4 p-4">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-20 w-16 object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold leading-none truncate">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>
            <Badge className={statusColor}>{book.status}</Badge>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{book.location} • {book.callNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </DialogTrigger>
            <BookDetailsDialog book={book} />
          </Dialog>
          <Button size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Borrow
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[2/3] relative">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className={`${statusColor} absolute bottom-2 right-2`}>
          {book.status}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-none truncate">{book.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground truncate">{book.author}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{book.location} • {book.callNumber}</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                Details
              </Button>
            </DialogTrigger>
            <BookDetailsDialog book={book} />
          </Dialog>
          <Button size="sm" className="flex-1">
            <BookOpen className="mr-2 h-4 w-4" />
            Borrow
          </Button>
        </div>
      </div>
    </Card>
  )
}

function BookDetailsDialog({ book }: { book: Book }) {
  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Book Details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-6 sm:grid-cols-2">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="aspect-[2/3] w-full object-cover rounded-lg"
        />
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-muted-foreground">{book.author}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className={statusColor}>{book.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span>{book.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Call Number</span>
              <span>{book.callNumber}</span>
            </div>
            {book.isbn && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">ISBN</span>
                <span>{book.isbn}</span>
              </div>
            )}
            {book.publishedDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Published</span>
                <span>{book.publishedDate}</span>
              </div>
            )}
            {book.publisher && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Publisher</span>
                <span>{book.publisher}</span>
              </div>
            )}
            {book.language && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language</span>
                <span>{book.language}</span>
              </div>
            )}
            {book.pages && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pages</span>
                <span>{book.pages}</span>
              </div>
            )}
          </div>

          {book.description && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{book.description}</p>
            </div>
          )}

          <Button className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Borrow this Book
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}