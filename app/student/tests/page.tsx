"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Category = "aptitude" | "technical" | "general-knowledge"

type TestMeta = {
  id: string
  category: Category
  title: string
  description: string
  questions: number
}

const categories: { key: Category; label: string; description: string }[] = [
  { key: "aptitude", label: "Aptitude Test", description: "Math, logic, and reasoning" },
  { key: "technical", label: "Technical Test", description: "Programming and web fundamentals" },
  { key: "general-knowledge", label: "General Knowledge", description: "Capitals, science, and trivia" },
]

export default function SkillTestsPage() {
  const [active, setActive] = useState<Category | null>(null)
  const [tests, setTests] = useState<TestMeta[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!active) return
    let mounted = true
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const res = await fetch(`/api/tests?category=${active}`, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load tests")
        const data: TestMeta[] = await res.json()
        if (mounted) setTests(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || "Something went wrong")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [active])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Skill Tests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categories.map((c) => (
          <Card key={c.key} className={active === c.key ? "border-primary" : undefined}>
            <CardHeader>
              <CardTitle>{c.label}</CardTitle>
              <CardDescription>{c.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setActive(c.key)}>{active === c.key ? "Selected" : "Choose"}</Button>
            </CardContent>
          </Card>
        ))}

        {/* removed OA shortcut */}
      </div>

      {active && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Available Tests</h2>
          {loading && <p className="text-muted-foreground">Loading tests…</p>}
          {error && !loading && <p className="text-destructive">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tests.map((t) => (
                <Card key={t.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{t.title}</CardTitle>
                    <CardDescription>{t.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 rounded bg-secondary">{t.questions} questions</span>
                      <Link href={`/student/tests/${t.id}`} className="text-primary underline underline-offset-4">Start</Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* removed OA subsection */}
    </div>
  )
}


