import { ReactNode } from "react"
import Link from "next/link"
import { Book, Users, Settings, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Catalog', href: '/catalog', icon: Book },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900">
        <div className="flex flex-col h-full">
          <div className="flex h-16 items-center px-4 bg-gray-900 text-white">
            <h1 className="text-xl font-bold">Library Admin</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b bg-background flex items-center px-4 gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex h-16 items-center px-4 bg-gray-900 text-white">
                <h1 className="text-xl font-bold">Library Admin</h1>
              </div>
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">Library Admin</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        <div className="h-16 lg:h-0" /> {/* Mobile header spacing */}
        <main className="container py-6">
          {children}
        </main>
      </div>
    </div>
  )
}