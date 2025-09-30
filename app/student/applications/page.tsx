"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { storage } from "@/lib/storage"
import type { Application } from "@/lib/types"

type JobLite = {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "internship" | "remote"
  postedDate: string
  description: string
}

export default function ApplicationsPage() {
  const [submitted, setSubmitted] = useState<Application[]>([])
  const [jobs, setJobs] = useState<JobLite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    // Load submitted apps from local storage
    setSubmitted(storage.getApplications())
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch("/api/jobs", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load jobs")
        const data: JobLite[] = await res.json()
        if (mounted) setJobs(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || "Something went wrong")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const submittedById = useMemo(() => new Set(submitted.map((a) => a.jobId)), [submitted])

  const available = useMemo(() => {
    const list = jobs.filter((j) => !submittedById.has(j.id))
    const q = query.toLowerCase()
    return list.filter((j) => {
      const matchesQuery = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
      const matchesType = !type || j.type === type
      return matchesQuery && matchesType
    })
  }, [jobs, submittedById, query, type])

  const handleApply = (job: JobLite) => {
    const user = storage.getCurrentUser() as any
    const application: Application = {
      id: `${Date.now()}-${job.id}`,
      jobId: job.id,
      studentId: user?.id ?? "student-demo",
      studentName: user?.name ?? "You",
      studentEmail: user?.email ?? "you@example.com",
      resume: "",
      status: "pending",
      appliedAt: new Date(),
    }
    storage.addApplication(application)
    // Optimistically update submitted list so the card moves immediately
    setSubmitted((prev) => [...prev, application])
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Submitted</h2>
        {submitted.length === 0 ? (
          <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submitted.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{app.studentName || "Your Application"}</CardTitle>
                  <CardDescription>
                    Applied on {new Date(app.appliedAt).toLocaleDateString()} • Status: {app.status}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Job ID: {app.jobId}</p>
                  <Link href={`/student/jobs/${app.jobId}`} className="text-sm text-primary underline underline-offset-4">
                    View job
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Available to apply</h2>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-6">
          <Input placeholder="Search by title or company" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="border rounded-md h-9 px-3 bg-transparent" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
          <Button variant="outline" onClick={() => { setQuery(""); setType("") }}>Clear</Button>
        </div>

        {loading && <p className="text-muted-foreground">Loading opportunities…</p>}
        {error && !loading && <p className="text-destructive">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company} • {job.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded bg-secondary">{job.type}</span>
                    <div className="flex items-center gap-3">
                      <Link href={`/student/jobs/${job.id}`} className="text-sm text-primary underline underline-offset-4">Details</Link>
                      <Button size="sm" onClick={() => handleApply(job)}>Apply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {available.length === 0 && (
              <p className="text-muted-foreground">No new opportunities available.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}


