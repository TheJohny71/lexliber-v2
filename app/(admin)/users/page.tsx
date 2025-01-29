import { Metadata } from "next"
import { UserManager } from "@/components/admin/UserManager"

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage library users and permissions",
}

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>
      <UserManager />
    </div>
  )
}