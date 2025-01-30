import React, { useState, useEffect } from 'react';
import { BookForm } from "@/components/admin/BookForm";
import { BookForm } from "@/components/admin/BookForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterBar } from "@/components/filters/FilterBar";
import { PlusCircle, Download, Trash, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed' | 'processing';
  publisher: string;
  publishYear: number;
  copies: number;
  description?: string;
  coverImage?: string;
  categories?: string[];
}

  export const CatalogManager = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  // Columns definition for DataTable
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300"
        />
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'author',
      header: 'Author',
    },
    {
      accessorKey: 'isbn',
      header: 'ISBN',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          row.original.status === 'available' ? 'bg-green-100 text-green-800' :
          row.original.status === 'borrowed' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: 'copies',
      header: 'Copies',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Edit className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, activeFilters]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/books?' + new URLSearchParams({
        search: searchQuery,
        ...activeFilters
      }));
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError('Failed to delete book. Please try again later.');
    }
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export books:', selectedBooks);
  };

  const handleBulkDelete = async () => {
    try {
      // TODO: Replace with actual API call
      await Promise.all(
        selectedBooks.map(id => 
          fetch(`/api/books/${id}`, { method: 'DELETE' })
        )
      );
      setBooks(books.filter(book => !selectedBooks.includes(book.id)));
      setSelectedBooks([]);
    } catch (err) {
      setError('Failed to delete selected books. Please try again later.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Catalog Management</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleExport} disabled={!selectedBooks.length}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleBulkDelete} disabled={!selectedBooks.length}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Add a new book to the library catalog.
                </DialogDescription>
              </DialogHeader>
              <BookForm 
                onSubmit={async (data) => {
                  try {
                    // TODO: Replace with actual API call
                    await fetch('/api/books', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                    setIsAddDialogOpen(false);
                    fetchBooks();
                  } catch (err) {
                    setError('Failed to add book. Please try again later.');
                  }
                }}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogDescription>
                  Modify book details in the library catalog.
                </DialogDescription>
              </DialogHeader>
              {selectedBook && (
                <BookForm 
                  book={selectedBook}
                  onSubmit={async (data) => {
                    try {
                      await fetch(`/api/books/${selectedBook.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      });
                      setIsEditDialogOpen(false);
                      fetchBooks();
                    } catch (err) {
                      setError('Failed to update book. Please try again later.');
                    }
                  }}
                  onCancel={() => setIsEditDialogOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
          <CardDescription>
            Find and filter books in the catalog
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchBar onSearch={handleSearch} />
          <FilterBar 
            filters={[
              { key: 'status', label: 'Status', options: ['available', 'borrowed', 'processing'] },
              { key: 'publishYear', label: 'Publish Year', type: 'range' },
            ]} 
            onChange={handleFilterChange}
          />
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={books}
        loading={loading}
        onRowSelectionChange={setSelectedBooks}
        selectedRows={selectedBooks}
      />
    </div>
  );
};

export default CatalogManager;