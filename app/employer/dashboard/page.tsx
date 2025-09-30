"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { storage } from "@/lib/storage"
import { mockJobs } from "@/lib/mock-data"
import type { EmployerProfile } from "@/lib/types"
import Link from "next/link"
import {
  Briefcase,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react"

export default function EmployerDashboardPage() {
  const [employer, setEmployer] = useState<EmployerProfile | null>(null)

  useEffect(() => {
    const user = storage.getCurrentUser()
    if (user && user.role === "employer") {
      setEmployer(user as EmployerProfile)
    }
  }, [])

  const applications = storage.getApplications()
  const pendingApplications = applications.filter((app) => app.status === "pending").length
  const shortlistedApplications = applications.filter((app) => app.status === "shortlisted").length

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mb-2 font-bold text-3xl tracking-tight">Welcome, {employer?.companyName || "Company"}!</h1>
          <p className="text-muted-foreground text-lg">Manage your hiring pipeline and find top talent</p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/employer/jobs/new">
            <Plus className="h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{mockJobs.length}</div>
            <p className="text-muted-foreground text-xs">2 closing soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{applications.length}</div>
            <p className="text-muted-foreground text-xs">{pendingApplications} pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">324</div>
            <p className="text-muted-foreground text-xs">+18% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Shortlisted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{shortlistedApplications}</div>
            <p className="text-muted-foreground text-xs">Ready for interview</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Review and manage candidate applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-2 font-medium">No applications yet</p>
                  <p className="text-muted-foreground text-sm">Applications will appear here once students apply</p>
                </div>
              ) : (
                <>
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-start justify-between gap-4 rounded-lg border p-4">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="font-semibold">{app.studentName}</h4>
                          {app.aiScore && (
                            <Badge variant="secondary" className="gap-1">
                              <Sparkles className="h-3 w-3" />
                              {app.aiScore}% match
                            </Badge>
                          )}
                        </div>
                        <p className="mb-2 text-muted-foreground text-sm">{app.studentEmail}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              app.status === "shortlisted"
                                ? "default"
                                : app.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {app.status}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            Applied {app.appliedAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/employer/applications/${app.id}`}>Review</Link>
                      </Button>
                    </div>
                  ))}
                  <Button asChild variant="ghost" className="w-full gap-2">
                    <Link href="/employer/applications">
                      View All Applications
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Active Job Postings */}
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>Manage your current openings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockJobs.map((job) => (
                <div key={job.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="mb-1 font-semibold">{job.title}</h4>
                      <p className="text-muted-foreground text-sm">{job.location}</p>
                    </div>
                    <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
                  </div>
                  <div className="mb-3 flex items-center gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      156 views
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      23 applications
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Closes {job.deadline.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/employer/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/employer/jobs/${job.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Link href="/employer/jobs/new">
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Link href="/employer/candidates">
                  <Users className="h-4 w-4" />
                  Search Candidates
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Link href="/employer/interviews">
                  <Clock className="h-4 w-4" />
                  Schedule Interview
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <TrendingUp className="mt-0.5 h-4 w-4 text-accent" />
                <p>Your Software Engineer posting is getting 40% more views than average</p>
              </div>
              <div className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 text-primary" />
                <p>15 highly-matched candidates available for your Data Analyst role</p>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                <Link href="/employer/candidates">View Recommendations</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Application Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Pending</span>
                </div>
                <span className="font-semibold">{pendingApplications}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>Reviewed</span>
                </div>
                <span className="font-semibold">{applications.filter((app) => app.status === "reviewed").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Shortlisted</span>
                </div>
                <span className="font-semibold">{shortlistedApplications}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span>Rejected</span>
                </div>
                <span className="font-semibold">{applications.filter((app) => app.status === "rejected").length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
