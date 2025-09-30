import { NextResponse } from "next/server"

// In a real app, fetch from DB based on role/tenant. Here: static config
const studentNav = [
  { name: "Dashboard", path: "/student/dashboard" },
  { name: "Jobs", path: "/student/jobs" },
  { name: "Applications", path: "/student/applications" },
  { name: "Skill Tests", path: "/student/tests" },
  { name: "Mock Interviews", path: "/student/interviews" },
  { name: "Job Fairs", path: "/student/job-fairs" },
  { name: "Resources", path: "/student/resources" },
  { name: "Career Guidance", path: "/student/career-guidance" },
]

export async function GET(request: Request) {
  // Example auth-aware filtering using a simple query (?public=true)
  const { searchParams } = new URL(request.url)
  const isPublic = searchParams.get("public") === "true"

  if (isPublic) {
    // Show restricted set when not logged in
    const publicNav = studentNav.filter((i) => ["Dashboard", "Resources"].includes(i.name))
    return NextResponse.json(publicNav)
  }

  return NextResponse.json(studentNav)
}


