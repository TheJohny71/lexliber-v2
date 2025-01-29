"use client"

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FilterBarProps {
  filters: {
    location?: string
    status?: string
    category?: string
    language?: string
    publishYear?: string
    availability?: string
  }
  onChange: (filters: any) => void
}

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterCategory {
  id: string
  label: string
  options: FilterOption[]
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filter categories with options
  const filterCategories: FilterCategory[] = [
    {
      id: 'location',
      label: 'Location',
      options: [
        { label: 'Main Library', value: 'main', count: 1250 },
        { label: 'Reference Section', value: 'reference', count: 450 },
        { label: 'Special Collections', value: 'special', count: 200 },
        { label: 'Digital Archive', value: 'digital', count: 800 },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { label: 'Available', value: 'available', count: 1500 },
        { label: 'Checked Out', value: 'checked-out', count: 300 },
        { label: 'On Hold', value: 'on-hold', count: 50 },
        { label: 'In Processing', value: 'processing', count: 100 },
      ]
    },
    {
      id: 'category',
      label: 'Category',
      options: [
        { label: 'Fiction', value: 'fiction', count: 800 },
        { label: 'Non-Fiction', value: 'non-fiction', count: 1200 },
        { label: 'Reference', value: 'reference', count: 300 },
        { label: 'Periodicals', value: 'periodicals', count: 150 },
        { label: 'Children\'s', value: 'children', count: 400 },
        { label: 'Young Adult', value: 'young-adult', count: 250 },
      ]
    },
    {
      id: 'language',
      label: 'Language',
      options: [
        { label: 'English', value: 'english', count: 2000 },
        { label: 'Spanish', value: 'spanish', count: 300 },
        { label: 'French', value: 'french', count: 150 },
        { label: 'German', value: 'german', count: 100 },
        { label: 'Chinese', value: 'chinese', count: 200 },
        { label: 'Japanese', value: 'japanese', count: 150 },
      ]
    },
    {
      id: 'publishYear',
      label: 'Publish Year',
      options: [
        { label: 'Last 5 Years', value: 'last-5', count: 500 },
        { label: '5-10 Years', value: '5-10', count: 400 },
        { label: '10-20 Years', value: '10-20', count: 600 },
        { label: '20+ Years', value: '20-plus', count: 800 },
      ]
    },
    {
      id: 'availability',
      label: 'Availability',
      options: [
        { label: 'Available Now', value: 'now', count: 1500 },
        { label: 'Available This Week', value: 'this-week', count: 200 },
        { label: 'Digital Access', value: 'digital', count: 800 },
        { label: 'Inter-Library Loan', value: 'loan', count: 300 },
      ]
    }
  ]

  // Update active filters when filters prop changes
  useEffect(() => {
    const active = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}:${value}`)
    setActiveFilters(active)
  }, [filters])

  const handleFilterChange = (categoryId: string, value: string) => {
    const newFilters = { ...filters }
    if (newFilters[categoryId as keyof typeof filters] === value) {
      delete newFilters[categoryId as keyof typeof filters]
    } else {
      newFilters[categoryId as keyof typeof filters] = value
    }
    onChange(newFilters)
    setOpenPopover(null)
  }

  const removeFilter = (filter: string) => {
    const [category] = filter.split(':')
    const newFilters = { ...filters }
    delete newFilters[category as keyof typeof filters]
    onChange(newFilters)
  }

  const clearAllFilters = () => {
    onChange({})
  }

  return (
    <Card className="border-dashed">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Filters</CardTitle>
            <CardDescription>Refine your search results</CardDescription>
          </div>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category) => (
              <Popover
                key={category.id}
                open={openPopover === category.id}
                onOpenChange={(open) => setOpenPopover(open ? category.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover === category.id}
                    className="h-8 justify-between"
                  >
                    {category.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder={`Search ${category.label}...`} />
                    <CommandEmpty>No {category.label} found.</CommandEmpty>
                    <CommandGroup>
                      {category.options.map((option) => {
                        const isSelected = filters[category.id as keyof typeof filters] === option.value
                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => handleFilterChange(category.id, option.value)}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                isSelected ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            <span className="flex-1">{option.label}</span>
                            {option.count && (
                              <span className="ml-2 text-sm text-muted-foreground">
                                {option.count}
                              </span>
                            )}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            ))}
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => {
                const [categoryId, value] = filter.split(':')
                const category = filterCategories.find((c) => c.id === categoryId)
                const option = category?.options.find((o) => o.value === value)
                if (!category || !option) return null
                
                return (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <span className="text-muted-foreground">{category.label}:</span>
                    {option.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFilter(filter)}
                      className="h-auto p-0 px-1 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}