import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterBarProps {
  filters: {
    location: string
    status: string
    category: string
  }
  onChange: (filters: { location: string; status: string; category: string }) => void
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Select
          value={filters.location}
          onValueChange={(value) =>
            onChange({ ...filters, location: value })
          }
        >
          <SelectTrigger id="location" className="w-[180px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fiction">Fiction Section</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction Section</SelectItem>
            <SelectItem value="reference">Reference Section</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            onChange({ ...filters, status: value })
          }
        >
          <SelectTrigger id="status" className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="checked-out">Checked Out</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) =>
            onChange({ ...filters, category: value })
          }
        >
          <SelectTrigger id="category" className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="literature">Literature</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}