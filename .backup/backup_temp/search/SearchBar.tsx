"use client"

import { useState, useCallback, useEffect } from 'react'
import { Search, Filter, X, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onAdvancedSearch?: (params: AdvancedSearchParams[]) => void
  onSearch?: (term: string) => void
  className?: string
}

interface AdvancedSearchParams {
  field: string
  operator: string
  value: string
}

const searchFields = [
  { label: 'Title', value: 'title' },
  { label: 'Author', value: 'author' },
  { label: 'ISBN', value: 'isbn' },
  { label: 'Call Number', value: 'callNumber' },
  { label: 'Publisher', value: 'publisher' },
  { label: 'Subject', value: 'subject' },
  { label: 'Language', value: 'language' },
  { label: 'Location', value: 'location' }
] as const

const searchOperators = [
  { label: 'Contains', value: 'contains' },
  { label: 'Starts with', value: 'startsWith' },
  { label: 'Ends with', value: 'endsWith' },
  { label: 'Equals', value: 'equals' },
  { label: 'Not equals', value: 'notEquals' },
  { label: 'Greater than', value: 'greaterThan' },
  { label: 'Less than', value: 'lessThan' }
] as const

export function SearchBar({ 
  value, 
  onChange, 
  onAdvancedSearch, 
  onSearch,
  className = '' 
}: SearchBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [advancedParams, setAdvancedParams] = useState<AdvancedSearchParams[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to parse search history:', error)
        setSearchHistory([])
      }
    }
  }, [])

  // Save search history to localStorage
  const saveToHistory = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return
    
    setSearchHistory(prev => {
      const newHistory = [searchTerm, ...prev.filter(item => item !== searchTerm)].slice(0, 10)
      localStorage.setItem('searchHistory', JSON.stringify(newHistory))
      return newHistory
    })
  }, [])

  const addSearchParam = () => {
    setAdvancedParams(prev => [
      ...prev,
      { field: searchFields[0].value, operator: searchOperators[0].value, value: '' }
    ])
  }

  const removeSearchParam = (index: number) => {
    setAdvancedParams(prev => {
      const newParams = prev.filter((_, i) => i !== index)
      if (onAdvancedSearch) {
        onAdvancedSearch(newParams)
      }
      return newParams
    })
  }

  const updateSearchParam = (index: number, field: keyof AdvancedSearchParams, value: string) => {
    setAdvancedParams(prev => {
      const newParams = [...prev]
      newParams[index] = { ...newParams[index], [field]: value }
      if (onAdvancedSearch) {
        onAdvancedSearch(newParams)
      }
      return newParams
    })
  }

  const handleSearch = () => {
    if (value.trim()) {
      saveToHistory(value)
      onSearch?.(value)
    }
    setShowSuggestions(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearch = () => {
    onChange('')
    setAdvancedParams([])
    setShowAdvanced(false)
    onAdvancedSearch?.([])
  }

  const getSuggestions = (query: string) => {
    // Placeholder suggestion logic - replace with actual implementation
    const commonTerms = [
      'fiction', 'non-fiction', 'mystery', 'science', 'history',
      'biography', 'romance', 'technology', 'art', 'music'
    ]
    
    return query.trim() 
      ? commonTerms
          .filter(term => term.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : []
  }

  // Update suggestions when value changes
  useEffect(() => {
    if (value.trim()) {
      setSuggestions(getSuggestions(value))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [value])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search by title, author, ISBN..."
          className="pl-9 pr-24"
        />
        
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-7 w-7 p-0"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-7 w-7 p-0"
                title="Search options"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Search Options</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setShowAdvanced(!showAdvanced)}>
                  Advanced Search
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsHistoryOpen(true)}>
                  Search History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={clearSearch}>
                  Clear Search
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            className="h-7"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 rounded-md border bg-background shadow-md z-10">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  onChange(suggestion)
                  handleSearch()
                }}
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Search Panel */}
      {showAdvanced && (
        <div className="rounded-md border bg-card p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Advanced Search</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addSearchParam}
              className="h-8"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
          </div>

          <div className="space-y-2">
            {advancedParams.map((param, index) => (
              <div key={index} className="flex items-center gap-2">
                <select
                  value={param.field}
                  onChange={(e) => updateSearchParam(index, 'field', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-w-[120px]"
                >
                  {searchFields.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>

                <select
                  value={param.operator}
                  onChange={(e) => updateSearchParam(index, 'operator', e.target.value)}
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-w-[120px]"
                >
                  {searchOperators.map((operator) => (
                    <option key={operator.value} value={operator.value}>
                      {operator.label}
                    </option>
                  ))}
                </select>

                <Input
                  value={param.value}
                  onChange={(e) => updateSearchParam(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSearchParam(index)}
                  className="h-9 w-9 p-0"
                  title="Remove condition"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search History</DialogTitle>
            <DialogDescription>
              Your recent searches
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {searchHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent searches</p>
            ) : (
              searchHistory.map((term, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <span className="text-sm">{term}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onChange(term)
                        setIsHistoryOpen(false)
                      }}
                    >
                      Use
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newHistory = searchHistory.filter((_, i) => i !== index)
                        setSearchHistory(newHistory)
                        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
                      }}
                      title="Remove from history"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}