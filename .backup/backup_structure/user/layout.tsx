import { ReactNode } from "react"
import Link from "next/link"
import { Search, BookOpen, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface UserLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Search', href: '/search', icon: Search },
  { name: 'My Books', href: '/my-books', icon: BookOpen },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <header className="hidden lg:block border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Library
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b bg-background flex items-center px-4 gap-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex h-16 items-center px-4 border-b">
                <h1 className="text-xl font-bold">Library</h1>
              </div>
              <nav className="flex-1 px-2 py-4">
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
        <Link href="/" className="text-lg font-semibold">
          Library
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="h-16 lg:h-0" /> {/* Mobile header spacing */}
        <main className="container py-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col gap-2 items-center justify-between text-sm text-muted-foreground lg:flex-row">
          <p>© 2024 Library. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}