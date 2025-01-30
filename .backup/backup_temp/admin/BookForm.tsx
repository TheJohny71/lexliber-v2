import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BookFormProps {
  book?: {
    id?: string;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishYear: number;
    copies: number;
    status: 'available' | 'borrowed' | 'processing';
    description?: string;
    coverImage?: string;
    categories?: string[];
  };
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const BookForm = ({ book, onSubmit, onCancel }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publishYear: new Date().getFullYear(),
    copies: 1,
    status: 'available',
    description: '',
    coverImage: '',
    categories: [],
    ...book
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (!/^(?:\d{10}|\d{13})$/.test(formData.isbn.replace(/-/g, ''))) {
      newErrors.isbn = 'Invalid ISBN format';
    }

    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Publisher is required';
    }

    if (formData.publishYear < 1000 || formData.publishYear > new Date().getFullYear()) {
      newErrors.publishYear = 'Invalid publish year';
    }

    if (formData.copies < 1) {
      newErrors.copies = 'Must have at least one copy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setSubmitError('Failed to save book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title}</span>
            )}
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              error={errors.author}
              className={errors.author ? 'border-red-500' : ''}
            />
            {errors.author && (
              <span className="text-sm text-red-500">{errors.author}</span>
            )}
          </div>

          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={formData.isbn}
              onChange={(e) => handleChange('isbn', e.target.value)}
              error={errors.isbn}
              className={errors.isbn ? 'border-red-500' : ''}
            />
            {errors.isbn && (
              <span className="text-sm text-red-500">{errors.isbn}</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="publisher">Publisher</Label>
            <Input
              id="publisher"
              value={formData.publisher}
              onChange={(e) => handleChange('publisher', e.target.value)}
              error={errors.publisher}
              className={errors.publisher ? 'border-red-500' : ''}
            />
            {errors.publisher && (
              <span className="text-sm text-red-500">{errors.publisher}</span>
            )}
          </div>

          <div>
            <Label htmlFor="publishYear">Publish Year</Label>
            <Input
              id="publishYear"
              type="number"
              value={formData.publishYear}
              onChange={(e) => handleChange('publishYear', parseInt(e.target.value))}
              error={errors.publishYear}
              className={errors.publishYear ? 'border-red-500' : ''}
            />
            {errors.publishYear && (
              <span className="text-sm text-red-500">{errors.publishYear}</span>
            )}
          </div>

          <div>
            <Label htmlFor="copies">Number of Copies</Label>
            <Input
              id="copies"
              type="number"
              value={formData.copies}
              onChange={(e) => handleChange('copies', parseInt(e.target.value))}
              error={errors.copies}
              className={errors.copies ? 'border-red-500' : ''}
              min="1"
            />
            {errors.copies && (
              <span className="text-sm text-red-500">{errors.copies}</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleChange('status', value)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="borrowed">Borrowed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          className="w-full min-h-[100px] p-2 border rounded-md"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;