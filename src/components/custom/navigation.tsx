"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Flag, Trophy, Users, Calendar } from "lucide-react"
import {startTransition} from 'react'
import {signOutServerFunction} from '@/serverFunctions/users'

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Trophy },
  { name: "Drivers", href: "/drivers", icon: Users },
  { name: "Teams", href: "/teams", icon: Flag },
  { name: "Results", href: "/results", icon: Calendar },
] as const

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Flag className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">F1 TRACKER</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn("gap-2", isActive && "bg-primary text-primary-foreground")}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>

          <Button onClick={evt => {
            evt.preventDefault()
            startTransition(signOutServerFunction)
          }} variant="outline">Sign Out</Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center justify-around border-t border-border bg-background py-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn("flex flex-col gap-1 h-auto py-2", isActive && "text-primary")}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
