import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, FileSignature, Users, MessagesSquare, Bot, ClipboardCheck, Building2, CalendarDays, GraduationCap, MessageCircle } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="text-muted-foreground">Your career toolbox and placement hub</p>
      </div>

      {/* 1️⃣ Career Prep */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Career Prep</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-4 w-4"/>Interview Question Bank</CardTitle>
              <CardDescription>Technical & HR questions by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">Browse questions</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4"/>Resume Templates</CardTitle>
              <CardDescription>ATS-friendly, industry-specific</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">Download templates</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileSignature className="h-4 w-4"/>Cover Letter Samples</CardTitle>
              <CardDescription>Polished letters you can adapt</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">View samples</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4"/>Soft Skills Guides</CardTitle>
              <CardDescription>Communication, teamwork, leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">Start learning</Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2️⃣ Placement Tools */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Placement Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bot className="h-4 w-4"/>AI Resume Scanner</CardTitle>
              <CardDescription>Quick resume check</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild><Link href="/student/resume-scanner">Open scanner</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-4 w-4"/>Mock Test Library</CardTitle>
              <CardDescription>Aptitude, coding, psychometric</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="/student/tests">Take a test</Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3️⃣ Company Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Company Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4"/>Company Profiles</CardTitle>
              <CardDescription>Culture, roles, average package</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">View companies</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessagesSquare className="h-4 w-4"/>Interview Experiences</CardTitle>
              <CardDescription>Shared by alumni/students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">Read stories</Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4️⃣ Events & Opportunities */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Events & Opportunities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/>Placement Calendar</CardTitle>
              <CardDescription>Deadlines & campus visits</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">View calendar</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><GraduationCap className="h-4 w-4"/>Workshops & Webinars</CardTitle>
              <CardDescription>Resume, LinkedIn, interview prep</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">See schedule</Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5️⃣ Networking */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Networking</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4"/>Alumni Connect</CardTitle>
              <CardDescription>LinkedIn links or contact info</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">Explore alumni</Link></Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageCircle className="h-4 w-4"/>Discussion Forums</CardTitle>
              <CardDescription>Ask & answer career questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline"><Link href="#">Open forums</Link></Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}


