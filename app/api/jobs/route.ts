import { NextResponse } from "next/server"
import { mockJobs } from "@/lib/mock-data"

function serializeJobs() {
  return mockJobs.map((j) => ({
    id: j.id,
    title: j.title,
    company: j.companyName,
    location: j.location,
    type: j.type,
    postedDate: j.postedAt.toISOString(),
    description: j.description,
  }))
}

export async function GET() {
  return NextResponse.json(serializeJobs())
}


