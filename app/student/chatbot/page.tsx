"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI career assistant. I can help you with interview preparation, resume tips, career advice, and answer any placement-related questions. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const suggestedQuestions = [
    "How do I prepare for technical interviews?",
    "What should I include in my resume?",
    "Tips for answering behavioral questions",
    "How to negotiate salary offers?",
  ]

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const responses = [
      "Great question! For technical interviews, focus on data structures and algorithms. Practice coding problems daily on platforms like LeetCode. Also, understand time and space complexity for your solutions.",
      "Your resume should highlight quantifiable achievements, relevant skills, and projects. Use action verbs and keep it to 1-2 pages. Tailor it for each job application by matching keywords from the job description.",
      "For behavioral questions, use the STAR method (Situation, Task, Action, Result). Prepare stories that showcase your problem-solving, teamwork, and leadership skills. Be specific and honest.",
      "When negotiating salary, research market rates first. Express enthusiasm for the role, then present your case based on your skills and market data. Be prepared to discuss the entire compensation package, not just base salary.",
    ]

    const assistantMessage: Message = {
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
    }

    setMessages((prev) => [...prev, assistantMessage])
    setLoading(false)
  }

  const handleSuggestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl tracking-tight">AI Career Chatbot</h1>
        <p className="text-muted-foreground text-lg">Get instant answers to your career and placement questions</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="flex h-[600px] flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Chat with AI Assistant
              </CardTitle>
              <CardDescription>Ask anything about careers, interviews, resumes, and more</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={loading}
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Questions</CardTitle>
              <CardDescription>Click to ask</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto w-full justify-start whitespace-normal bg-transparent p-3 text-left text-sm"
                  onClick={() => handleSuggestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">What I Can Help With</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p>Interview preparation and tips</p>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p>Resume and cover letter advice</p>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p>Career path guidance</p>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p>Skill development recommendations</p>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <p>Job search strategies</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Available 24/7</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Get instant answers anytime, anywhere. Your AI career assistant is always ready to help!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
