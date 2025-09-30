import type React from "react"
import { StudentNav } from "@/components/student-nav"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StudentNav />
      {children}
    </>
  )
}
