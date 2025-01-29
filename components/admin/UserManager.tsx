"use client"

import { useState } from 'react'
import { 
  UserPlus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  BookOpen,
  UserCog,
  Ban,
  Check,
  Clock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Librarian' | 'User'
  status: 'Active' | 'Inactive' | 'Pending'
  booksCheckedOut: number
  joinedDate: string
  department?: string
  lastActive?: string
}

export function UserManager() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showEditUserDialog, setShowEditUserDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Dummy data - will be replaced with actual API calls
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      status: 'Active',
      booksCheckedOut: 2,
      joinedDate: '2024-01-01T00:00:00',
      department: 'Corporate Law',
      lastActive: '2024-01-29T15:30:00'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Librarian',
      status: 'Active',
      booksCheckedOut: 0,
      joinedDate: '2023-12-15T00:00:00',
      department: 'Library Services',
      lastActive: '2024-01-29T16:45:00'
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'Admin',
      status: 'Active',
      booksCheckedOut: 1,
      joinedDate: '2023-11-20T00:00:00',
      department: 'Administration',
      lastActive: '2024-01-29T14:15:00'
    },
    {
      id: '4',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      role: 'User',
      status: 'Inactive',
      booksCheckedOut: 0,
      joinedDate: '2023-10-05T00:00:00',
      department: 'Litigation',
      lastActive: '2024-01-15T09:20:00'
    },
    {
      id: '5',
      name: 'Carol Brown',
      email: 'carol.brown@example.com',
      role: 'User',
      status: 'Pending',
      booksCheckedOut: 0,
      joinedDate: '2024-01-28T00:00:00',
      department: 'Patent Law',
      lastActive: null
    }
  ]

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
      case 'Librarian':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
      case 'User':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
  }

  const getStatusBadgeColor = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShowAddUserDialog(false)
    setIsLoading(false)
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShowEditUserDialog(false)
    setSelectedUser(null)
    setIsLoading(false)
  }

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const UserDialog = ({ isEdit = false }) => (
    <Dialog 
      open={isEdit ? showEditUserDialog : showAddUserDialog} 
      onOpenChange={isEdit ? setShowEditUserDialog : setShowAddUserDialog}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Edit user details and permissions.' 
              : 'Add a new user to the library system.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={isEdit ? handleEditUser : handleAddUser}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                className="col-span-3"
                defaultValue={isEdit ? selectedUser?.name : ''}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                defaultValue={isEdit ? selectedUser?.email : ''}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Select defaultValue={isEdit ? selectedUser?.role : 'User'}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Librarian">Librarian</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <Input
                id="department"
                className="col-span-3"
                defaultValue={isEdit ? selectedUser?.department : ''}
              />
            </div>
            {isEdit && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select defaultValue={selectedUser?.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : isEdit ? 'Save changes' : 'Add user'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Button onClick={() => setShowAddUserDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Books</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={getRoleBadgeColor(user.role)}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={getStatusBadgeColor(user.status)}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.booksCheckedOut}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.lastActive 
                    ? new Date(user.lastActive).toLocaleDateString()
                    : 'Never'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setShowEditUserDialog(true)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Loans
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Permissions
                      </DropdownMenuItem>
                      {user.status === 'Active' ? (
                        <DropdownMenuItem className="text-yellow-600">
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend
                        </DropdownMenuItem>
                      ) : user.status === 'Inactive' ? (
                        <DropdownMenuItem className="text-green-600">
                          <Check className="h-4 w-4 mr-2" />
                          Activate
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDialog />
      <UserDialog isEdit />
    </div>
  )
}