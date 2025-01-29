import { ThemeProvider } from "@/components/theme-provider"
import { TopNav } from "@/components/layout/TopNav"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="border-t">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            © 2025 LexLiber Library. All rights reserved.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}