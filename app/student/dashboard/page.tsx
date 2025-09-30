"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { storage } from "@/lib/storage"
import { mockJobs, mockSkillTests, mockJobFairs } from "@/lib/mock-data"
import type { StudentProfile } from "@/lib/types"
import Link from "next/link"
import {
  FileText,
  Brain,
  MessageSquare,
  Calendar,
  TrendingUp,
  Upload,
  Target,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null)

  useEffect(() => {
    const user = storage.getCurrentUser()
    if (user && user.role === "student") {
      setStudent(user as StudentProfile)
    }
  }, [])

  const profileCompletion = student?.resume ? 100 : 75

  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl tracking-tight">Welcome back, {student?.name || "Student"}!</h1>
        <p className="text-muted-foreground text-lg">Here's what's happening with your career journey</p>
      </div>

      {/* Profile Completion */}
      {profileCompletion < 100 && (
        <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Complete Your Profile
                </CardTitle>
                <CardDescription>Add your resume to unlock all features and get better job matches</CardDescription>
              </div>
              <Badge variant="secondary">{profileCompletion}%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="mb-4" />
            <Button asChild className="gap-2">
              <Link href="/student/profile">
                <Upload className="h-4 w-4" />
                Upload Resume
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">12</div>
            <p className="text-muted-foreground text-xs">3 pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Profile Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">48</div>
            <p className="text-muted-foreground text-xs">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Tests Completed</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">5</div>
            <p className="text-muted-foreground text-xs">Avg score: 85%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Interviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">8</div>
            <p className="text-muted-foreground text-xs">2 scheduled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Recommended Jobs
              </CardTitle>
              <CardDescription>Jobs that match your profile and skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockJobs.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-start justify-between gap-4 rounded-lg border p-4">
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold">{job.title}</h4>
                    <p className="mb-2 text-muted-foreground text-sm">{job.companyName}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge variant="outline">{job.location}</Badge>
                      {job.salary && <Badge variant="outline">{job.salary}</Badge>}
                    </div>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/student/jobs/${job.id}`}>View</Link>
                  </Button>
                </div>
              ))}
              <Button asChild variant="ghost" className="w-full gap-2">
                <Link href="/student/jobs">
                  View All Jobs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Job Fairs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Upcoming Job Fairs
              </CardTitle>
              <CardDescription>Register for exclusive hiring events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockJobFairs.map((fair) => (
                <div key={fair.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="font-semibold">{fair.title}</h4>
                    <Badge>{fair.status}</Badge>
                  </div>
                  <p className="mb-3 text-muted-foreground text-sm">{fair.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                      <p>{fair.date.toLocaleDateString()}</p>
                      <p>{fair.location}</p>
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/student/job-fairs/${fair.id}`}>Register</Link>
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
                <Link href="/student/resume-scanner">
                  <Brain className="h-4 w-4" />
                  Scan My Resume
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Link href="/student/chatbot">
                  <MessageSquare className="h-4 w-4" />
                  Ask AI Career Bot
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Link href="/student/interviews">
                  <MessageSquare className="h-4 w-4" />
                  Practice Interview
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Link href="/student/tests">
                  <Brain className="h-4 w-4" />
                  Take Skill Test
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Skill Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommended Tests</CardTitle>
              <CardDescription>Boost your profile with certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSkillTests.slice(0, 3).map((test) => (
                <div key={test.id} className="rounded-lg border p-3">
                  <h4 className="mb-1 font-medium text-sm">{test.title}</h4>
                  <div className="mb-2 flex items-center gap-2 text-muted-foreground text-xs">
                    <span>{test.questions} questions</span>
                    <span>•</span>
                    <span>{test.duration} min</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {test.difficulty}
                  </Badge>
                </div>
              ))}
              <Button asChild variant="ghost" size="sm" className="w-full gap-2">
                <Link href="/student/tests">
                  View All Tests
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Achievement */}
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-5 w-5 text-accent" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">You're in the top 20% of active students this month!</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profile Strength</span>
                  <span className="font-semibold">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
