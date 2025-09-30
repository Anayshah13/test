"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TextareaHTMLAttributes } from "react"

export default function NewJobPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    remote: "unspecified",
    availability: "immediately",
    relocation: "unspecified",
    noticePeriod: "0",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now just navigate back to dashboard; in a real app we'd POST to backend
    router.push("/employer/dashboard")
  }

  return (
    <div className="container py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>Provide role details and screening questions</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <select id="type" className="border rounded-md h-9 px-3 bg-transparent w-full" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary (optional)</Label>
                <Input id="salary" placeholder="$100k - $130k" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea id="description" className="min-h-[140px] w-full rounded-md border bg-transparent p-3 text-sm" placeholder="Role overview, responsibilities, required skills..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Screening Questions</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="remote">Are you willing to work remote?</Label>
                  <select id="remote" className="border rounded-md h-9 px-3 bg-transparent w-full" value={form.remote} onChange={(e) => setForm({ ...form, remote: e.target.value })}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="unspecified">Unspecified</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">How immediately can you join?</Label>
                  <select id="availability" className="border rounded-md h-9 px-3 bg-transparent w-full" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })}>
                    <option value="immediately">Immediately</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="relocation">Open to relocation?</Label>
                  <select id="relocation" className="border rounded-md h-9 px-3 bg-transparent w-full" value={form.relocation} onChange={(e) => setForm({ ...form, relocation: e.target.value })}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unspecified">Unspecified</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noticePeriod">Notice period (weeks)</Label>
                  <Input id="noticePeriod" type="number" min={0} value={form.noticePeriod} onChange={(e) => setForm({ ...form, noticePeriod: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/employer/dashboard")}>Cancel</Button>
              <Button type="submit">Publish Job</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


