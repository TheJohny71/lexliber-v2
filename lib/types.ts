// Book related types
export interface Book {
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
  location?: string;
  callNumber?: string;
}

// Form related types
export interface FormFieldProps {
  error?: string;
  [key: string]: any;
}

// Component props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

// Table related types
export interface TableColumn<T> {
  key: keyof T;
  header: string;
  cell?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  onRowClick?: (item: T) => void;
}

// Status types
export type BookStatus = 'available' | 'borrowed' | 'processing';
export type UserStatus = 'active' | 'inactive' | 'suspended';