"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { storage } from "@/lib/storage"
import type { StudentProfile } from "@/lib/types"
import { ArrowRight, ArrowLeft, GraduationCap } from "lucide-react"

export default function StudentSignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: new Date().getFullYear(),
    cgpa: 0,
    skills: "",
  })

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    const student: StudentProfile = {
      id: `student-${Date.now()}`,
      email: formData.email,
      role: "student",
      name: formData.name,
      phone: formData.phone,
      college: formData.college,
      degree: formData.degree,
      branch: formData.branch,
      graduationYear: formData.graduationYear,
      cgpa: formData.cgpa,
      skills: formData.skills.split(",").map((s) => s.trim()),
      profileComplete: true,
      createdAt: new Date(),
    }

    storage.setCurrentUser(student)
    router.push("/student/dashboard")
  }

  const progress = (step / totalSteps) * 100

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="secondary" className="gap-2">
              <GraduationCap className="h-3.5 w-3.5" />
              Student Registration
            </Badge>
            <span className="text-muted-foreground text-sm">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-2xl">
            {step === 1 && "Create Your Account"}
            {step === 2 && "Academic Information"}
            {step === 3 && "Skills & Interests"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Let's start with your basic information"}
            {step === 2 && "Tell us about your educational background"}
            {step === 3 && "What are your key skills and areas of interest?"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="space-y-6"
          >
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    placeholder="Stanford University"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      placeholder="B.Tech"
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch/Major</Label>
                    <Input
                      id="branch"
                      placeholder="Computer Science"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min="2020"
                      max="2030"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/GPA</Label>
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="8.5"
                      value={formData.cgpa || ""}
                      onChange={(e) => setFormData({ ...formData, cgpa: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    placeholder="React, TypeScript, Node.js, Python"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    required
                  />
                  <p className="text-muted-foreground text-sm">Separate skills with commas</p>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h4 className="mb-2 font-semibold text-sm">What's Next?</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Complete your profile with a resume</li>
                    <li>• Take skill assessments to boost your profile</li>
                    <li>• Get AI-powered job recommendations</li>
                    <li>• Practice with mock interviews</li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack} className="gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1 gap-2">
                {step === totalSteps ? "Complete Registration" : "Continue"}
                {step < totalSteps && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
