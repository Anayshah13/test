import { NextResponse } from "next/server"
import { mockJobs } from "@/lib/mock-data"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const job = mockJobs.find((j) => j.id === params.id)
  if (!job) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 })
  }
  return NextResponse.json({
    id: job.id,
    title: job.title,
    company: job.companyName,
    location: job.location,
    type: job.type,
    postedDate: job.postedAt.toISOString(),
    description: job.description,
    requirements: job.requirements,
    salary: job.salary,
  })
}


