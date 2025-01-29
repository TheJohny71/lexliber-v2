"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NavigationMenuProps {
  children: React.ReactNode
  className?: string
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
)
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex gap-4", className)} {...props} />
  )
)
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
)
NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn("", className)} {...props} />
  )
)
NavigationMenuLink.displayName = "NavigationMenuLink"

const navigationMenuTriggerStyle = () =>
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
  )

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
}