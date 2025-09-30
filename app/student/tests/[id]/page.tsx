"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TestData = {
  id: string
  category: "aptitude" | "technical" | "general-knowledge"
  title: string
  description: string
  questions: { id: string; prompt: string; options: string[]; answerIndex: number }[]
}

export default function TakeTestPage({ params }: { params: { id: string } }) {
  const [test, setTest] = useState<TestData | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/tests/${params.id}`, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load test")
        const data: TestData = await res.json()
        if (mounted) setTest(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || "Something went wrong")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [params.id])

  const score = useMemo(() => {
    if (!test) return 0
    return test.questions.reduce((acc, q) => acc + (answers[q.id] === q.answerIndex ? 1 : 0), 0)
  }, [answers, test])

  const suggestion = useMemo(() => {
    if (!test) return ""
    const total = test.questions.length
    const pct = total ? (score / total) * 100 : 0
    if (pct >= 80) return "Great job! Keep practicing to maintain your edge."
    if (pct >= 50) return "Good attempt. Review the questions you missed and retry."
    return "Consider revising the basics for this category, then try again."
  }, [score, test])

  if (loading) return <div className="container py-8"><p className="text-muted-foreground">Loading…</p></div>
  if (error || !test) return (
    <div className="container py-8">
      <p className="text-destructive">{error || "Test not found"}</p>
      <Link className="text-primary underline" href="/student/tests">Back to tests</Link>
    </div>
  )

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link className="text-primary underline" href="/student/tests">Back to tests</Link>
      </div>
      <h1 className="text-2xl font-bold">{test.title}</h1>
      <p className="text-muted-foreground mb-6">{test.description}</p>

      <div className="space-y-4">
        {test.questions.map((q, idx) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-base">Q{idx + 1}. {q.prompt}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {q.options.map((opt, oi) => (
                  <label key={oi} className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${answers[q.id] === oi ? "border-primary bg-primary/5" : ""}`}>
                    <input
                      type="radio"
                      name={q.id}
                      className="accent-primary"
                      checked={answers[q.id] === oi}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)}>Submit</Button>
        ) : (
          <>
            <div className="text-sm">Score: <span className="font-semibold">{score}</span> / {test.questions.length}</div>
            <div className="text-sm text-muted-foreground">{suggestion}</div>
          </>
        )}
      </div>
    </div>
  )
}


