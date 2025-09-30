"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Job = {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "internship" | "remote"
  postedDate: string
  description: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [type, setType] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch("/api/jobs", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load jobs")
        const data: Job[] = await res.json()
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

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const q = query.toLowerCase()
      const matchesQuery = !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      const matchesType = !type || j.type === type
      const matchesLocation = !location || j.location.toLowerCase().includes(location.toLowerCase())
      return matchesQuery && matchesType && matchesLocation
    })
  }, [jobs, query, type, location])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 mb-6">
        <Input placeholder="Search by title, company, or location" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="border rounded-md h-9 px-3 bg-transparent" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
        <Input placeholder="Filter by location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Button variant="outline" onClick={() => { setQuery(""); setType(""); setLocation("") }}>Clear</Button>
      </div>

      {loading && <p className="text-muted-foreground">Loading jobs…</p>}
      {error && !loading && <p className="text-destructive">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription>{job.company} • {job.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded bg-secondary">{job.type}</span>
                  <Link href={`/student/jobs/${job.id}`} className="text-sm text-primary underline underline-offset-4">View details</Link>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground">No jobs match your criteria.</p>
          )}
        </div>
      )}
    </div>
  )
}


