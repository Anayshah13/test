"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import { GraduationCap, Briefcase } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            AI
          </div>
          <span className="hidden sm:inline-block">PlacementHub</span>
        </Link>

        <div className="flex items-center gap-4">
          {isHome && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/student/signin">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Student
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/employer/signin">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Employer
                </Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
