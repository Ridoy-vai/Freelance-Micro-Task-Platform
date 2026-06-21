import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2, ArrowRight, Receipt } from 'lucide-react'
import Link from 'next/link'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Mirrors the old client-side handleAccept, run server-side right after
// Stripe confirms payment: mark the proposal accepted, then the task booked.
async function acceptProposalAfterPayment(proposalId) {
  if (!proposalId) return

  try {
    const res = await fetch(`${API_URL}/task/proposals/${proposalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'accepted' }),
    })
    const result = await res.json()
    if (!res.ok) {
      console.log('Failed to update proposal status:', result.message)
      return
    }
  } catch (error) {
    console.log('Error accepting proposal:', error)
    return
  }

  try {
    const taskRes = await fetch(`${API_URL}/proposalTaskid/${proposalId}`)
    const taskData = await taskRes.json()
    const taskId = taskData.taskId

    const statusRes = await fetch(`${API_URL}/updatetaskstatus/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'booked' }),
    })
    await statusRes.json()
  } catch (error) {
    console.log('Error booking task:', error)
  }
}

// Saves a payment record in PaymentsCollection, guarded by session_id
// so a refresh or repeat visit to /success never inserts a duplicate row.
async function savePaymentRecord(sessionId, metadata, customerEmail) {
  if (!sessionId) return

  try {
    const res = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        ClientId: metadata.ClientId,
        Clintemail: metadata.Clintemail || customerEmail,
        Freelancer: metadata.Freelancer,
        ProposedId: metadata.ProposedId,
        price: metadata.price,
        title: metadata.title,
      }),
    })
    const result = await res.json()
    if (!res.ok) {
      console.log('Failed to save payment:', result.message)
    }
  } catch (error) {
    console.log('Error saving payment record:', error)
  }
}

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const { title, Freelancer, price, ProposedId } = metadata

    // Payment confirmed -> mark proposal as accepted + task as booked
    await acceptProposalAfterPayment(ProposedId)

    // Save the payment record (guarded against duplicates by session_id)
    await savePaymentRecord(session_id, metadata, customerEmail)

    return (
      <section
        id="success"
        className="min-h-screen bg-paper flex items-center justify-center px-4 py-16"
      >
        <div className="w-full max-w-md">
          {/* Stamp moment */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-5">
              <span className="absolute inset-0 rounded-full bg-sage/20 animate-ping" />
              <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-sage text-paper">
                <CheckCircle2 size={32} strokeWidth={2.5} />
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-ink tracking-tight">
              Payment confirmed
            </h1>
            <p className="text-sm text-ink/60 mt-1.5">
              A confirmation email is on its way to{' '}
              <span className="text-ink font-medium">{customerEmail}</span>
            </p>
          </div>

          {/* Receipt card */}
          <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-ink/10 bg-paper/60">
              <Receipt size={15} className="text-ink/40" />
              <span className="text-xs font-medium text-ink/50 uppercase tracking-wide">
                Task receipt
              </span>
              <span className="ml-auto text-xs text-ink/40 font-mono">
                #{ProposedId?.slice(-8)}
              </span>
            </div>

            <div className="px-5 py-4 space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm text-ink/50">Task</span>
                <span className="text-sm font-medium text-ink text-right">
                  {title}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm text-ink/50">Freelancer</span>
                <span className="text-sm font-medium text-ink text-right">
                  {Freelancer}
                </span>
              </div>
              <div className="h-px bg-ink/10" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink/50">Amount paid</span>
                <span className="text-lg font-semibold text-signal">
                  ${price}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 mt-8">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-ink text-paper text-sm font-medium py-3 rounded-xl hover:bg-ink/90 transition"
            >
              Go to dashboard
              <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-center text-ink/40">
              Questions? Email{' '}
              <a
                href="mailto:support@tasknest.com"
                className="text-ink/60 underline underline-offset-2 hover:text-ink"
              >
                support@tasknest.com
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }
}