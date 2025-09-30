"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles, TrendingUp } from "lucide-react"

export default function ResumeScannerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResults(null)
    }
  }

  const handleScan = async () => {
    if (!file) return

    setScanning(true)
    // Simulate AI scanning
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setResults({
      overallScore: 78,
      strengths: [
        "Clear and concise summary",
        "Quantified achievements with metrics",
        "Relevant technical skills listed",
        "Good use of action verbs",
      ],
      improvements: [
        "Add more specific project outcomes",
        "Include certifications or courses",
        "Optimize keywords for ATS systems",
        "Add links to portfolio or GitHub",
      ],
      keywords: {
        present: ["React", "TypeScript", "Node.js", "Git", "Agile"],
        missing: ["Docker", "AWS", "CI/CD", "Testing", "MongoDB"],
      },
      atsCompatibility: 85,
    })
    setScanning(false)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl tracking-tight">AI Resume Scanner</h1>
        <p className="text-muted-foreground text-lg">
          Get instant feedback and improve your resume with AI-powered analysis
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>Upload your resume in PDF or DOCX format for AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                  <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">Choose a file or drag it here</h3>
                  <p className="mb-4 text-muted-foreground text-sm">PDF or DOCX up to 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      Select File
                    </label>
                  </Button>
                  {file && (
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      <span>{file.name}</span>
                    </div>
                  )}
                </div>

                <Button onClick={handleScan} disabled={!file || scanning} className="w-full gap-2">
                  {scanning ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Scan Resume
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {results && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analysis Results</CardTitle>
                  <Badge variant="secondary" className="gap-2 text-base">
                    <TrendingUp className="h-4 w-4" />
                    {results.overallScore}/100
                  </Badge>
                </div>
                <CardDescription>AI-powered insights to improve your resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">Overall Score</span>
                    <span className="text-muted-foreground">{results.overallScore}%</span>
                  </div>
                  <Progress value={results.overallScore} />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">ATS Compatibility</span>
                    <span className="text-muted-foreground">{results.atsCompatibility}%</span>
                  </div>
                  <Progress value={results.atsCompatibility} className="[&>div]:bg-accent" />
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {results.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {results.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold">Keyword Analysis</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="mb-2 text-muted-foreground text-sm">Present Keywords</p>
                      <div className="flex flex-wrap gap-2">
                        {results.keywords.present.map((keyword: string) => (
                          <Badge key={keyword} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-muted-foreground text-sm">Missing Keywords (Consider Adding)</p>
                      <div className="flex flex-wrap gap-2">
                        {results.keywords.missing.map((keyword: string) => (
                          <Badge key={keyword} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  1
                </div>
                <p>Upload your resume in PDF or DOCX format</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  2
                </div>
                <p>AI analyzes content, structure, and keywords</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  3
                </div>
                <p>Get detailed feedback and improvement suggestions</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  4
                </div>
                <p>Optimize and re-scan until you get 90+ score</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Use action verbs to start bullet points</p>
              <p>• Quantify achievements with numbers</p>
              <p>• Tailor keywords to job descriptions</p>
              <p>• Keep formatting simple for ATS</p>
              <p>• Update regularly with new skills</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
