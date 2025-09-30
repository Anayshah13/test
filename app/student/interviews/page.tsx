"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, Play, CheckCircle, Clock, Target, Sparkles } from "lucide-react"

export default function MockInterviewsPage() {
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [started, setStarted] = useState(false)

  const topics = [
    { id: "technical", name: "Technical/Coding", description: "Data structures, algorithms, system design" },
    { id: "behavioral", name: "Behavioral", description: "Teamwork, leadership, problem-solving" },
    { id: "frontend", name: "Frontend Development", description: "React, JavaScript, CSS, web technologies" },
    { id: "backend", name: "Backend Development", description: "APIs, databases, server architecture" },
  ]

  const difficulties = [
    { id: "easy", name: "Easy", description: "Entry-level questions" },
    { id: "medium", name: "Medium", description: "Mid-level questions" },
    { id: "hard", name: "Hard", description: "Senior-level questions" },
  ]

  const pastInterviews = [
    { id: 1, topic: "Technical/Coding", difficulty: "Medium", score: 85, date: "2025-09-25" },
    { id: 2, topic: "Behavioral", difficulty: "Easy", score: 92, date: "2025-09-20" },
    { id: 3, topic: "Frontend Development", difficulty: "Hard", score: 78, date: "2025-09-15" },
  ]

  const handleStart = () => {
    if (selectedTopic && selectedDifficulty) {
      setStarted(true)
      // In a real app, this would start the interview session
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl tracking-tight">Mock Interviews</h1>
        <p className="text-muted-foreground text-lg">Practice with AI-powered interviews and get detailed feedback</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {!started ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Start New Mock Interview
                </CardTitle>
                <CardDescription>Choose your interview type and difficulty level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Interview Topic</Label>
                  <RadioGroup value={selectedTopic} onValueChange={setSelectedTopic}>
                    {topics.map((topic) => (
                      <div key={topic.id} className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value={topic.id} id={topic.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={topic.id} className="cursor-pointer font-medium">
                            {topic.name}
                          </Label>
                          <p className="text-muted-foreground text-sm">{topic.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Difficulty Level</Label>
                  <RadioGroup value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    {difficulties.map((difficulty) => (
                      <div key={difficulty.id} className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value={difficulty.id} id={difficulty.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={difficulty.id} className="cursor-pointer font-medium">
                            {difficulty.name}
                          </Label>
                          <p className="text-muted-foreground text-sm">{difficulty.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleStart}
                  disabled={!selectedTopic || !selectedDifficulty}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Play className="h-4 w-4" />
                  Start Interview
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Interview Session</CardTitle>
                <CardDescription>Answer the questions to the best of your ability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge variant="secondary">Question 1 of 5</Badge>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      <span>15:00</span>
                    </div>
                  </div>
                  <h3 className="mb-4 font-semibold text-lg">
                    Explain the difference between let, const, and var in JavaScript.
                  </h3>
                  <textarea
                    className="min-h-[200px] w-full rounded-lg border bg-background p-4 text-sm"
                    placeholder="Type your answer here..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Skip Question
                  </Button>
                  <Button className="flex-1 gap-2">
                    Next Question
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Past Interviews</CardTitle>
              <CardDescription>Review your previous interview performances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pastInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex-1">
                    <h4 className="mb-1 font-semibold">{interview.topic}</h4>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Badge variant="secondary">{interview.difficulty}</Badge>
                      <span>•</span>
                      <span>{interview.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">{interview.score}%</div>
                      <div className="text-muted-foreground text-xs">Score</div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
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
                <p>Select interview topic and difficulty</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  2
                </div>
                <p>Answer 5-10 questions in your chosen area</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  3
                </div>
                <p>Get AI feedback on each answer</p>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  4
                </div>
                <p>Review detailed performance report</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>Interviews Completed</span>
                </div>
                <span className="font-semibold">{pastInterviews.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>Average Score</span>
                </div>
                <span className="font-semibold">
                  {Math.round(pastInterviews.reduce((acc, i) => acc + i.score, 0) / pastInterviews.length)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Best Performance</span>
                </div>
                <span className="font-semibold">{Math.max(...pastInterviews.map((i) => i.score))}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Pro Tip</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Practice regularly to improve your interview skills. Aim to complete at least 2-3 mock interviews per
                week for best results!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
