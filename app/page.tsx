import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Briefcase,
  Brain,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  Sparkles,
  Target,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-8 py-20 md:py-32">
        <Badge variant="secondary" className="gap-2 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Placement Platform
        </Badge>

        <h1 className="max-w-4xl text-center font-bold text-5xl leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl">
          Your Career Journey,{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Supercharged by AI
          </span>
        </h1>

        <p className="max-w-2xl text-center text-muted-foreground text-xl leading-relaxed text-pretty">
          Connect students with dream opportunities and help recruiters find perfect candidates using intelligent
          matching, AI resume analysis, and personalized career guidance.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2 text-base">
            <Link href="/student/signup">
              <GraduationCap className="h-5 w-5" />
              Get Started as Student
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 text-base bg-transparent">
            <Link href="/employer/signup">
              <Briefcase className="h-5 w-5" />
              Post Jobs as Employer
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>10,000+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>500+ Companies</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>95% Placement Rate</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <Badge variant="outline" className="gap-2">
              <Zap className="h-3.5 w-3.5" />
              Platform Features
            </Badge>
            <h2 className="max-w-2xl font-bold text-4xl tracking-tight text-balance md:text-5xl">
              Everything you need to succeed
            </h2>
            <p className="max-w-2xl text-muted-foreground text-lg text-pretty">
              Powerful tools and AI-driven insights to accelerate your career or hiring process
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Brain className="h-6 w-6" />
                </div>
                <CardTitle>AI Resume Scanner</CardTitle>
                <CardDescription>
                  Get instant feedback on your resume with AI-powered analysis and improvement suggestions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <CardTitle>AI Career Chatbot</CardTitle>
                <CardDescription>
                  24/7 personalized career guidance, interview tips, and answers to all your placement questions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Mock Interviews</CardTitle>
                <CardDescription>
                  Practice with AI-powered mock interviews tailored to your target role and get detailed feedback
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Skill Assessments</CardTitle>
                <CardDescription>
                  Test your knowledge with comprehensive skill tests and earn certificates to boost your profile
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  AI analyzes your profile and recommends the best job opportunities that match your skills
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Job Fairs & Events</CardTitle>
                <CardDescription>
                  Access exclusive virtual and in-person job fairs with top companies actively hiring
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="flex flex-col items-center gap-6 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="max-w-2xl font-bold text-3xl tracking-tight text-balance md:text-4xl">
              Ready to transform your career journey?
            </h2>
            <p className="max-w-xl text-muted-foreground text-lg text-pretty">
              Join thousands of students and hundreds of companies already using AI PlacementHub
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/student/signup">
                  Start as Student
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/employer/signup">Start Hiring</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
