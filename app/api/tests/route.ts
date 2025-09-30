import { NextResponse } from "next/server"
import { getTestsByCategory } from "@/lib/mock-tests"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") as any
  const tests = getTestsByCategory(category)
  return NextResponse.json(
    tests.map((t) => ({ id: t.id, category: t.category, title: t.title, description: t.description, questions: t.questions.length }))
  )
}


