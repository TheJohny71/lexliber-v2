"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  location: string
  callNumber: string
  status: "available" | "checked-out" | "processing" | "lost"
  publishedDate: string
}

export function UserCatalogTable() {
  const columns: ColumnDef<Book>[] = [
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
      accessorKey: "publishedDate",
      header: "Published",
      cell: ({ getValue }) => {
        return new Date(getValue() as string).getFullYear()
      },
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
      id: "actions",
      cell: ({ row }) => {
        const book = row.original
        const isAvailable = book.status === "available"
        
        return (
          <Button
            variant={isAvailable ? "default" : "secondary"}
            disabled={!isAvailable}
            onClick={() => console.log("Borrow:", book.id)}
            className="w-[110px]"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            {isAvailable ? "Borrow" : "Unavailable"}
          </Button>
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
      location: "Fiction",
      callNumber: "F FITZ",
      status: "available",
      publishedDate: "1925-04-10"
    },
    // Add more sample data...
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable
      searchColumn="title"
      pageSize={10}
      onRowClick={(row) => console.log("View details:", row.id)}
    />
  )
}