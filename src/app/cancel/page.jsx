import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default async function Cancel({ searchParams }) {
  const { ProposedId } = await searchParams

  return (
    <section
      id="cancel"
      className="min-h-screen bg-paper flex items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-md">
        {/* Cancel moment */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-ink/5 text-ink/40 mb-5">
            <XCircle size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">
            Payment cancelled
          </h1>
          <p className="text-sm text-ink/60 mt-1.5">
            No charge was made. The task is still waiting for your approval.
          </p>
        </div>

        {/* Info card */}
        {ProposedId && (
          <div className="bg-white border border-ink/10 rounded-2xl px-5 py-4 mb-8">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink/50">Proposal</span>
              <span className="text-sm font-medium text-ink font-mono">
                #{ProposedId.slice(-8)}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full bg-ink text-paper text-sm font-medium py-3 rounded-xl hover:bg-ink/90 transition"
          >
            <RotateCcw size={16} />
            Try again from dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full text-ink/60 text-sm font-medium py-3 rounded-xl hover:bg-ink/5 transition"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}