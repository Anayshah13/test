import type React from "react"
import { EmployerNav } from "@/components/employer-nav"

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <EmployerNav />
      {children}
    </>
  )
}
