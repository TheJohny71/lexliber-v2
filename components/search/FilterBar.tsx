"use client"

import { Select } from "@/components/ui/select"

interface FilterBarProps {
  filters: {
    location: string
    status: string
    category: string
  }
  onChange: (filters: {
    location: string
    status: string
    category: string
  }) => void
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={filters.location}
        onValueChange={(value) => onChange({ ...filters, location: value })}
      >
        <option value="">All Locations</option>
        <option value="Fiction Section">Fiction Section</option>
        <option value="Non-Fiction Section">Non-Fiction Section</option>
        <option value="Reference">Reference</option>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => onChange({ ...filters, status: value })}
      >
        <option value="">All Statuses</option>
        <option value="Available">Available</option>
        <option value="Checked Out">Checked Out</option>
        <option value="On Hold">On Hold</option>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(value) => onChange({ ...filters, category: value })}
      >
        <option value="">All Categories</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Reference">Reference</option>
      </Select>
    </div>
  )
}