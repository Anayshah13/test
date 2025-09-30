import Link from "next/link"

async function getJob(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jobs/${id}`, { cache: "no-store" })
  if (!res.ok) return null
  return res.json()
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)
  if (!job) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-2">Job not found</h1>
        <Link className="text-primary underline" href="/student/jobs">Back to jobs</Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link className="text-primary underline" href="/student/jobs">Back to jobs</Link>
      </div>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-muted-foreground">{job.company} • {job.location}</p>
      <div className="mt-4 inline-block text-xs px-2 py-1 rounded bg-secondary">{job.type}</div>
      <div className="mt-6 space-y-4">
        <p>{job.description}</p>
        {job.requirements?.length ? (
          <div>
            <h2 className="font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-5 space-y-1">
              {job.requirements.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}


