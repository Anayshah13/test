export type TestCategory = "aptitude" | "technical" | "general-knowledge"

export interface TestQuestion {
  id: string
  prompt: string
  options: string[]
  answerIndex: number
}

export interface ReadyMadeTest {
  id: string
  category: TestCategory
  title: string
  description: string
  questions: TestQuestion[]
}

export const readyMadeTests: ReadyMadeTest[] = [
  {
    id: "apt-1",
    category: "aptitude",
    title: "Aptitude Basics I",
    description: "Ratios, percentages, and speed-distance time.",
    questions: [
      { id: "q1", prompt: "What is 25% of 160?", options: ["20", "30", "40", "50"], answerIndex: 2 },
      { id: "q2", prompt: "A train travels 120km in 2 hours. Speed?", options: ["40 km/h", "60 km/h", "80 km/h", "100 km/h"], answerIndex: 1 },
      { id: "q3", prompt: "Simplify ratio 36:24", options: ["3:2", "2:3", "4:3", "5:3"], answerIndex: 0 },
      { id: "q4", prompt: "If SP=120 and profit=20%, CP?", options: ["80", "90", "96", "100"], answerIndex: 2 },
      { id: "q5", prompt: "Average of 10, 20, 30, 40?", options: ["20", "25", "30", "35"], answerIndex: 1 },
    ],
  },
  {
    id: "apt-2",
    category: "aptitude",
    title: "Aptitude Basics II",
    description: "Time-work and simple interest.",
    questions: [
      { id: "q1", prompt: "SI on 1000 at 10% for 2 years?", options: ["100", "150", "200", "250"], answerIndex: 2 },
      { id: "q2", prompt: "A does a task in 10 days, B in 20. Together?", options: ["15", "10", "7", "6.67"], answerIndex: 3 },
      { id: "q3", prompt: "50 increased by 20% = ?", options: ["55", "60", "70", "75"], answerIndex: 1 },
      { id: "q4", prompt: "Median of 1,3,3,6,7,8,9?", options: ["3", "6", "6.5", "7"], answerIndex: 1 },
    ],
  },
  {
    id: "tech-1",
    category: "technical",
    title: "JavaScript Fundamentals",
    description: "Basics of JS behavior and types.",
    questions: [
      { id: "q1", prompt: "typeof null is?", options: ["null", "object", "undefined", "number"], answerIndex: 1 },
      { id: "q2", prompt: "const arr = [1,2,3]; arr.length?", options: ["2", "3", "4", "error"], answerIndex: 1 },
      { id: "q3", prompt: "Which is NOT a primitive?", options: ["string", "object", "number", "boolean"], answerIndex: 1 },
      { id: "q4", prompt: `JSON.parse('{"a":1}') returns?`, options: ["error", "{a:1}", `{"a":1}`, "[1]"], answerIndex: 2 },
    ],
  },
  {
    id: "tech-2",
    category: "technical",
    title: "Web Basics",
    description: "HTTP and browser fundamentals.",
    questions: [
      { id: "q1", prompt: "HTTP 404 means?", options: ["Unauthorized", "Not Found", "Server Error", "Bad Request"], answerIndex: 1 },
      { id: "q2", prompt: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Cascaded System Styles"], answerIndex: 0 },
      { id: "q3", prompt: "LocalStorage capacity is about?", options: ["5-10MB", "100MB", "1GB", "Unlimited"], answerIndex: 0 },
      { id: "q4", prompt: "Which is a GET parameter carrier?", options: ["Request body", "URL query string", "Cookies only", "WebSocket"], answerIndex: 1 },
    ],
  },
  {
    id: "gk-1",
    category: "general-knowledge",
    title: "World Capitals",
    description: "Identify capitals of countries.",
    questions: [
      { id: "q1", prompt: "Capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answerIndex: 2 },
      { id: "q2", prompt: "Capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Kyoto"], answerIndex: 1 },
      { id: "q3", prompt: "Capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answerIndex: 2 },
      { id: "q4", prompt: "Capital of Canada?", options: ["Toronto", "Ottawa", "Vancouver", "Montreal"], answerIndex: 1 },
    ],
  },
  {
    id: "gk-2",
    category: "general-knowledge",
    title: "Science Basics",
    description: "General science trivia.",
    questions: [
      { id: "q1", prompt: "H2O is chemical name for?", options: ["Oxygen", "Hydrogen", "Water", "Helium"], answerIndex: 2 },
      { id: "q2", prompt: "Earth revolves around?", options: ["Moon", "Sun", "Mars", "Venus"], answerIndex: 1 },
      { id: "q3", prompt: "Boiling point of water at sea level?", options: ["50°C", "90°C", "100°C", "120°C"], answerIndex: 2 },
      { id: "q4", prompt: "Human DNA is shaped like?", options: ["Square", "Double helix", "Triangle", "Circle"], answerIndex: 1 },
    ],
  },
]

export function getTestsByCategory(category?: TestCategory) {
  return category ? readyMadeTests.filter((t) => t.category === category) : readyMadeTests
}

export function getTestById(id: string) {
  return readyMadeTests.find((t) => t.id === id)
}


