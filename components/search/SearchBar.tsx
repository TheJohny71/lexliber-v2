import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchBar({ 
  placeholder = "Search books by title, call number, or practice group...",
  onChange,
  className 
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className={`w-full bg-white dark:bg-gray-800 pl-9 ${className}`}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}