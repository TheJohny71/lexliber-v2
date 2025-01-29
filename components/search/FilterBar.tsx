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
  const locations = ["Fiction Section", "Non-Fiction Section", "Reference"]
  const statuses = ["Available", "Checked Out", "On Hold"]
  const categories = ["Fiction", "Non-Fiction", "Reference"]

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full sm:w-auto">
        <Select
          value={filters.location}
          onValueChange={(value: string) => onChange({ ...filters, location: value })}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Select
          value={filters.status}
          onValueChange={(value: string) => onChange({ ...filters, status: value })}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Select
          value={filters.category}
          onValueChange={(value: string) => onChange({ ...filters, category: value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
      </div>
    </div>
  )
}