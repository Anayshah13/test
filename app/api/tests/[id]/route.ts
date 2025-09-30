import { NextResponse } from "next/server"
import { getTestById } from "@/lib/mock-tests"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const test = getTestById(params.id)
  if (!test) return NextResponse.json({ message: "Test not found" }, { status: 404 })
  return NextResponse.json(test)
}


