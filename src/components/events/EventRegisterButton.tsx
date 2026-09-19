'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerForEventAction } from '@/app/actions/applications'

type EventRegisterButtonProps = {
  eventId: number
  eventTitle: string
  isLoggedIn: boolean
  initialIsRegistered?: boolean
  initialStatus?: string
  isClosed?: boolean
  eventStatus?: string
  externalUrl?: string | null
  ctaLabel?: string | null
}

export function EventRegisterButton({
  eventId,
  eventTitle,
  isLoggedIn,
  initialIsRegistered = false,
  initialStatus = 'registered',
  isClosed = false,
  eventStatus,
  externalUrl,
  ctaLabel,
}: EventRegisterButtonProps) {
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered)
  const [status, setStatus] = useState(initialStatus)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // 1. If Registration is closed / not open yet / event completed
  if (isClosed) {
    const isUpcomingNotOpen = eventStatus === 'upcoming'
    return (
      <div className="rounded-2xl border-2 border-slate-900 bg-slate-100 p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-center space-y-2">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-400 text-slate-600 text-lg mb-1">
          {isUpcomingNotOpen ? '⏳' : '🔒'}
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-slate-800">
          {isUpcomingNotOpen ? 'Registration Opening Soon' : 'Registration Closed'}
        </h3>
        <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
          {isUpcomingNotOpen
            ? `Registration for ${eventTitle} has not opened yet. Check back soon or follow our announcements!`
            : `Registration for ${eventTitle} is currently closed. Stay tuned for future events!`}
        </p>
      </div>
    )
  }

  // 2. If event has an external registration link (e.g. Google Form, Luma, Typeform) and is OPEN
  if (externalUrl) {
    return (
      <div className="rounded-2xl border-2 border-slate-900 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            External Registration
          </span>
          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            Register for {eventTitle}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-600">
            Registration for this event is hosted via an external form. Click below to open the registration page in a new tab.
          </p>
        </div>

        <div className="pt-2">
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-slate-900 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider text-sm rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer"
          >
            {ctaLabel || 'Register on External Form'} ↗
          </a>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-center space-y-3">
        <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
          Ready to join?
        </h3>
        <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
          Log in or create an account to register for <strong>{eventTitle}</strong> with a single click.
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-900 bg-purple-600 px-6 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-purple-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all"
          >
            Log in to Register →
          </Link>
        </div>
      </div>
    )
  }

  if (isRegistered) {
    return (
      <div className="rounded-2xl border-2 border-slate-900 bg-emerald-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
            ✓
          </span>
          <h3 className="text-xl font-black uppercase tracking-tight text-emerald-900">
            You are registered!
          </h3>
        </div>
        <p className="text-sm font-semibold text-emerald-800">
          Your spot has been recorded for <strong>{eventTitle}</strong>. A confirmation email has been dispatched.
        </p>
        <div className="pt-2">
          <span className="inline-block px-3 py-1 bg-white border-2 border-emerald-600 text-emerald-800 text-xs font-black uppercase rounded-lg shadow-[2px_2px_0px_0px_rgba(5,150,105,1)]">
            Status: Registered
          </span>
        </div>
      </div>
    )
  }

  const handleRegister = async () => {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await registerForEventAction(eventId)
      if (res.success) {
        setIsRegistered(true)
        setStatus('registered')
      } else {
        setErrorMsg(res.error || 'Failed to complete registration.')
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4">
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-purple-600">
          Instant Registration
        </span>
        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
          Register for this event
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-600">
          Click below to register instantly with your student account. No long forms required!
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-xl text-xs font-bold text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="button"
        disabled={loading}
        onClick={handleRegister}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-slate-900 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider text-sm rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? 'Securing your spot...' : '⚡ Register with 1-Click'}
      </button>
    </div>
  )
}
