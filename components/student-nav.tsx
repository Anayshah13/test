"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Brain,
  MessageSquare,
  Calendar,
  BookOpen,
  LogOut,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { storage } from "@/lib/storage"

export function StudentNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [navItems, setNavItems] = useState<{ href: string; label: string; icon?: any }[]>([])

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const res = await fetch("/api/nav", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load nav")
        const data: { name: string; path: string }[] = await res.json()
        const iconMap: Record<string, any> = {
          Dashboard: LayoutDashboard,
          Jobs: Briefcase,
          Applications: FileText,
          "Skill Tests": Brain,
          "Mock Interviews": MessageSquare,
          "Job Fairs": Calendar,
          Resources: BookOpen,
        }
        const items = data
          .filter((item) => item.path.startsWith("/student/"))
          .map((item) => ({ href: item.path, label: item.name, icon: iconMap[item.name] }))
        if (isMounted) setNavItems(items)
      } catch (e) {
        // Fallback to previous static items if fetch fails
        if (isMounted)
          setNavItems([
            { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { href: "/student/job-fairs", label: "Job Fairs", icon: Calendar },
            { href: "/student/applications", label: "Applications", icon: FileText },
            { href: "/student/tests", label: "Skill Tests", icon: Brain },
            { href: "/student/interviews", label: "Mock Interviews", icon: MessageSquare },
            { href: "/student/resources", label: "Resources", icon: BookOpen },
          ])
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = () => {
    storage.clearCurrentUser()
    router.push("/")
  }

  

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/student/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            AI
          </div>
          <span className="hidden sm:inline-block">PlacementHub</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Button key={item.href} asChild variant={isActive ? "secondary" : "ghost"} size="sm" className="gap-2">
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/student/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
