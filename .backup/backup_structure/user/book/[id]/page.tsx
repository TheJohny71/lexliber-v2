"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, MapPin, Share2, Star } from 'lucide-react'

interface BookDetailsProps {
  params: {
    id: string
  }
}

export default function BookDetailsPage({ params }: BookDetailsProps) {
  const [activeTab, setActiveTab] = useState('details')

  // Placeholder data - replace with actual data fetching
  const book = {
    id: params.id,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.',
    coverUrl: '/api/placeholder/400/600',
    location: 'Fiction Section',
    callNumber: 'F FITZ',
    status: 'Available',
    isbn: '9780743273565',
    publishedDate: '1925',
    publisher: 'Charles Scribner\'s Sons',
    language: 'English',
    pages: 180,
    copies: [
      { id: 1, status: 'Available', lastBorrowed: null },
      { id: 2, status: 'Checked Out', lastBorrowed: '2024-01-15', dueDate: '2024-02-15' }
    ],
    borrowingHistory: [
      { date: '2024-01-15', type: 'Checked Out', user: 'Anonymous', dueDate: '2024-02-15' },
      { date: '2023-12-01', type: 'Returned', user: 'Anonymous', returnDate: '2023-12-15' }
    ],
    relatedBooks: [
      { id: '2', title: 'This Side of Paradise', author: 'F. Scott Fitzgerald', coverUrl: '/api/placeholder/200/300' },
      { id: '3', title: 'Tender Is the Night', author: 'F. Scott Fitzgerald', coverUrl: '/api/placeholder/200/300' }
    ]
  }

  const statusColor = {
    'Available': 'bg-green-500/15 text-green-500 border-green-500/30',
    'Checked Out': 'bg-yellow-500/15 text-yellow-500 border-yellow-500/30',
    'On Hold': 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    'In Processing': 'bg-purple-500/15 text-purple-500 border-purple-500/30',
    'Lost': 'bg-red-500/15 text-red-500 border-red-500/30'
  }[book.status] || 'bg-gray-500/15 text-gray-500 border-gray-500/30'

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Cover Image and Actions */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full rounded-lg"
            />
            <Badge className={`${statusColor} absolute top-2 right-2`}>
              {book.status}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full" disabled={book.status !== 'Available'}>
              <BookOpen className="mr-2 h-4 w-4" />
              {book.status === 'Available' ? 'Borrow this Book' : 'Currently Unavailable'}
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Availability</h3>
            <div className="space-y-2">
              {book.copies.map((copy) => (
                <div key={copy.id} className="flex justify-between items-center text-sm">
                  <span>Copy #{copy.id}</span>
                  <Badge className={statusColor}>{copy.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-xl text-muted-foreground">{book.author}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{book.location} • {book.callNumber}</span>
            </div>
            {book.publishedDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Published {book.publishedDate}</span>
              </div>
            )}
            {book.pages && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{book.pages} pages</span>
              </div>
            )}
          </div>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">Borrowing History</TabsTrigger>
              <TabsTrigger value="related">Related Books</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              {book.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{book.description}</p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {book.isbn && (
                  <div>
                    <h4 className="font-medium text-muted-foreground">ISBN</h4>
                    <p>{book.isbn}</p>
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <h4 className="font-medium text-muted-foreground">Publisher</h4>
                    <p>{book.publisher}</p>
                  </div>
                )}
                {book.language && (
                  <div>
                    <h4 className="font-medium text-muted-foreground">Language</h4>
                    <p>{book.language}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                {book.borrowingHistory.map((record, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline">{record.type}</Badge>
                        <p className="mt-1 text-sm text-muted-foreground">
                          by {record.user}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{record.date}</p>
                        {record.dueDate && (
                          <p className="text-sm text-muted-foreground">
                            Due: {record.dueDate}
                          </p>
                        )}
                        {record.returnDate && (
                          <p className="text-sm text-muted-foreground">
                            Returned: {record.returnDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="related">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {book.relatedBooks.map((relatedBook) => (
                  <Card key={relatedBook.id} className="overflow-hidden">
                    <img
                      src={relatedBook.coverUrl}
                      alt={relatedBook.title}
                      className="aspect-[2/3] w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold truncate">{relatedBook.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {relatedBook.author}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}