"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  children: React.ReactNode
  className?: string
}

const Sheet = ({ children, className }: SheetProps) => (
  <div className={cn("fixed inset-0 z-50", className)}>
    {children}
  </div>
)
Sheet.displayName = "Sheet"

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    {children}
  </button>
))
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: "top" | "right" | "bottom" | "left"
  }
>(({ className, children, side = "right", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed z-50 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
      side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      side === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      side === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }