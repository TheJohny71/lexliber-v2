import { Metadata } from "next"
import { CatalogManager } from "@/components/admin/CatalogManager"

export const metadata: Metadata = {
  title: "Catalog Management",
  description: "Manage your library catalog",
}

export default function CatalogPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Catalog Management</h2>
      </div>
      <CatalogManager />
    </div>
  )
}