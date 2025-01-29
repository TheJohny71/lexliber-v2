"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  status: "available" | "checked-out" | "processing" | "lost"
  location: string
  callNumber: string
  lastUpdated: string
  copies: number
}

export function CatalogTable() {
  const columns: ColumnDef<Book>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("title")}</div>
          <div className="text-sm text-muted-foreground">{row.getValue("author")}</div>
        </div>
      ),
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string
        const statusColors = {
          available: "bg-green-500/15 text-green-500 border-green-500/30",
          "checked-out": "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
          processing: "bg-blue-500/15 text-blue-500 border-blue-500/30",
          lost: "bg-red-500/15 text-red-500 border-red-500/30",
        }
        return (
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            {status.replace("-", " ")}
          </Badge>
        )
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div>
          <div>{row.getValue("location")}</div>
          <div className="text-sm text-muted-foreground">{row.getValue("callNumber")}</div>
        </div>
      ),
    },
    {
      accessorKey: "copies",
      header: "Copies",
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string)
        return date.toLocaleDateString()
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const book = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => console.log("View:", book.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Edit:", book.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Delete:", book.id)}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Sample data
  const data: Book[] = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "9780743273565",
      status: "available",
      location: "Fiction",
      callNumber: "F FITZ",
      lastUpdated: "2024-01-15",
      copies: 3
    },
    // Add more sample data...
  ]

  const handleExport = () => {
    // Implement CSV export logic
    console.log("Exporting data...")
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable
      searchColumn="title"
      pageSize={10}
      onExport={handleExport}
    />
  )
}