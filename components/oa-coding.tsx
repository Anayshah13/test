"use client"

import { useMemo, useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Sample = { input: string; output: string }
type Question = {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  inputFormat: string
  outputFormat: string
  sampleTestCases: Sample[]
}

const questions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Medium",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat: "nums = [2,7,11,15], target = 9",
    outputFormat: "[0,1]",
    sampleTestCases: [
      { input: "nums=[2,7,11,15], target=9", output: "[0,1]" },
      { input: "nums=[3,2,4], target=6", output: "[1,2]" },
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    inputFormat: "s = '()[]{}'",
    outputFormat: "true",
    sampleTestCases: [
      { input: "s='()'", output: "true" },
      { input: "s='([)]'", output: "false" },
    ],
  },
  {
    id: 3,
    title: "Merge Intervals",
    difficulty: "Medium",
    description:
      "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.",
    inputFormat: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
    outputFormat: "[[1,6],[8,10],[15,18]]",
    sampleTestCases: [
      { input: "intervals=[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" },
      { input: "intervals=[[1,4],[4,5]]", output: "[[1,5]]" },
    ],
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    description:
      "Given an integer array nums, find the subarray with the largest sum and return its sum.",
    inputFormat: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    outputFormat: "6",
    sampleTestCases: [
      { input: "nums=[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums=[1]", output: "1" },
    ],
  },
]

const defaultTemplate = (fnName: string) => `// Write a function named ${fnName}.
// Return your result. Do not use console.log for return value.
function ${fnName}(input) {
  // TODO: parse input and compute answer
  return input;
}

// Do not edit below this line
module.exports = ${fnName};
`

function parseInput(raw: string): any {
  // naive parser for prototypes: key=value pairs, arrays allowed
  // examples: "nums=[1,2,3], target=4" or "s='()'" or "intervals=[[1,3],[2,6]]"
  const out: Record<string, any> = {}
  const parts = raw.split(/\s*,\s*/)
  for (const p of parts) {
    const [k, v] = p.split(/\s*=\s*/)
    if (!k) continue
    let val: any = v
    try {
      // try JSON-like parsing by replacing single quotes with double quotes
      const jsonish = v
        .replace(/'/g, '"')
        .replace(/([a-zA-Z0-9_]+)=/g, '"$1":')
      // Wrap bare arrays/objects
      if (jsonish.startsWith("[") || jsonish.startsWith("{")) {
        val = JSON.parse(jsonish)
      } else if (/^(true|false|null|[-]?[0-9]+(\.[0-9]+)?)$/.test(v)) {
        val = JSON.parse(v)
      } else {
        val = v.replace(/^'|"|`/, '').replace(/'|"|`$/, '')
      }
    } catch {
      // fallback as string
      val = v
    }
    out[k.trim()] = val
  }
  // If single key, return value directly
  const keys = Object.keys(out)
  if (keys.length === 1) return out[keys[0]]
  return out
}

export function OACoding() {
  const [currentId, setCurrentId] = useState(questions[0].id)
  const current = useMemo(() => questions.find(q => q.id === currentId)!, [currentId])
  const [code, setCode] = useState(defaultTemplate(current.title.replace(/\s+/g, "")))
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const run = async () => {
    setRunning(true)
    const fnName = current.title.replace(/\s+/g, "")
    try {
      // Build a CommonJS-like function to eval safely in a Function sandbox
      const wrapped = `(function(){ const module = { exports: {} }; const exports = module.exports; ${code}; return module.exports; })()`
      // eslint-disable-next-line no-new-func
      const exported = new Function("return " + wrapped)()
      if (typeof exported !== "function") throw new Error("Exported value must be a function")

      const outputs: string[] = []
      for (const [idx, tc] of current.sampleTestCases.entries()) {
        try {
          const input = parseInput(tc.input)
          const res = exported(input)
          const actual = typeof res === "object" ? JSON.stringify(res) : String(res)
          const expected = tc.output
          const pass = actual === expected
          outputs.push(`Test ${idx + 1}: ${pass ? "PASS" : "FAIL"}\nExpected: ${expected}\nActual:   ${actual}`)
        } catch (err: any) {
          outputs.push(`Test ${idx + 1}: ERROR\n${err?.message || String(err)}`)
        }
      }
      setResults(outputs)
    } catch (e: any) {
      setResults([`Build error: ${e?.message || String(e)}`])
    } finally {
      setRunning(false)
    }
  }

  const handleChangeQuestion = (id: number) => {
    setCurrentId(id)
    setResults([])
    setCode(defaultTemplate(questions.find(q => q.id === id)!.title.replace(/\s+/g, "")))
  }

  return (
    <div className="grid gap-4 md:grid-cols-[2fr_3fr]">
      {/* Left: Question */}
      <Card className="max-h-[70vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{current.title}</CardTitle>
            <span className="text-xs px-2 py-1 rounded bg-secondary">{current.difficulty}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="whitespace-pre-wrap">{current.description}</p>
          <div>
            <div className="font-semibold">Input Format</div>
            <pre className="mt-1 rounded bg-muted/50 p-2 text-xs overflow-auto">{current.inputFormat}</pre>
          </div>
          <div>
            <div className="font-semibold">Output Format</div>
            <pre className="mt-1 rounded bg-muted/50 p-2 text-xs overflow-auto">{current.outputFormat}</pre>
          </div>
          <div>
            <div className="font-semibold mb-2">Sample Test Cases</div>
            <div className="space-y-2">
              {current.sampleTestCases.map((tc, i) => (
                <div key={i} className="rounded border p-2">
                  <div className="text-xs text-muted-foreground">Input</div>
                  <pre className="text-xs overflow-auto">{tc.input}</pre>
                  <div className="text-xs text-muted-foreground mt-2">Output</div>
                  <pre className="text-xs overflow-auto">{tc.output}</pre>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-1">Questions</div>
            <div className="flex flex-wrap gap-2">
              {questions.map((q) => (
                <Button key={q.id} size="sm" variant={q.id === currentId ? "secondary" : "outline"} onClick={() => handleChangeQuestion(q.id)}>
                  {q.title}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right: Editor + Output */}
      <div className="grid grid-rows-[1fr_auto] gap-4 min-h-[70vh]">
        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Editor (JavaScript)</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setCode(defaultTemplate(current.title.replace(/\s+/g, "")))}>Reset</Button>
              <Button size="sm" onClick={run} disabled={running}>{running ? "Running…" : "Run"}</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Editor
              height="40vh"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v ?? "")}
              options={{ minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Output</CardTitle>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <p className="text-sm text-muted-foreground">Run your code to see results.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {results.map((r, i) => (
                  <pre key={i} className="rounded bg-muted/50 p-2 whitespace-pre-wrap">{r}</pre>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OACoding


