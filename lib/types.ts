// User types
export type UserRole = "student" | "employer"

export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: Date
}

export interface StudentProfile extends User {
  role: "student"
  name: string
  phone: string
  college: string
  degree: string
  branch: string
  graduationYear: number
  cgpa: number
  skills: string[]
  resume?: string
  profileComplete: boolean
}

export interface EmployerProfile extends User {
  role: "employer"
  companyName: string
  contactPerson: string
  phone: string
  industry: string
  companySize: string
  website?: string
}

// Job types
export interface Job {
  id: string
  employerId: string
  companyName: string
  title: string
  description: string
  requirements: string[]
  location: string
  type: "full-time" | "part-time" | "internship" | "contract"
  salary?: string
  postedAt: Date
  deadline: Date
  status: "active" | "closed"
}

// Application types
export interface Application {
  id: string
  jobId: string
  studentId: string
  studentName: string
  studentEmail: string
  resume: string
  coverLetter?: string
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "accepted"
  appliedAt: Date
  aiScore?: number
}

// Mock Interview types
export interface MockInterview {
  id: string
  studentId: string
  topic: string
  difficulty: "easy" | "medium" | "hard"
  questions: InterviewQuestion[]
  completedAt?: Date
  score?: number
}

export interface InterviewQuestion {
  id: string
  question: string
  answer?: string
  feedback?: string
  score?: number
}

// Skill Test types
export interface SkillTest {
  id: string
  title: string
  category: string
  questions: number
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface TestResult {
  id: string
  studentId: string
  testId: string
  score: number
  completedAt: Date
}

// Job Fair types
export interface JobFair {
  id: string
  title: string
  description: string
  date: Date
  location: string
  companies: string[]
  registeredStudents: string[]
  status: "upcoming" | "ongoing" | "completed"
}

// Resource types
export interface Resource {
  id: string
  title: string
  category: string
  type: "article" | "video" | "course" | "document"
  url: string
  description: string
  tags: string[]
}
