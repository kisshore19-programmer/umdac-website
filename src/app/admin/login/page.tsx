'use client'

import Link from 'next/link'
import { useState } from 'react'
import { adminLoginAction } from '@/app/actions/auth'

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    try {
      await adminLoginAction(formData)
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to sign in as admin. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border-4 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] lg:grid-cols-2">
        {/* Left info panel */}
        <div className="bg-slate-900 p-8 text-white md:p-10 border-b-4 border-slate-900 lg:border-b-0 lg:border-r-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-400 border border-red-500/30">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              Restricted Area
            </div>
            <h1 className="mt-6 text-4xl font-black uppercase tracking-tight md:text-5xl">
              UMDAC Admin Portal
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-300">
              Secure administration console for managing events, viewing members, and overseeing club operations.
            </p>
          </div>

          <div className="mt-8 rounded-xl border-2 border-slate-800 bg-slate-800/80 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Admin Access Only
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              Only authorized executive and management accounts can authenticate into this portal.
            </p>
          </div>
        </div>

        {/* Right login form panel */}
        <div className="p-6 md:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-8 flex justify-between items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Authentication
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">
                  Admin Sign In
                </h2>
              </div>
              <Link
                href="/login"
                className="rounded-lg border-2 border-slate-900 bg-slate-100 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:outline-none"
              >
                Member Login
              </Link>
            </div>

            <form action={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-black uppercase tracking-wide text-slate-900"
                >
                  Admin Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@umdac.org"
                  required
                  className="w-full rounded-xl border-2 border-slate-900 bg-white px-4 py-3 text-base font-bold text-slate-900 placeholder-slate-400 outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-black uppercase tracking-wide text-slate-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••••"
                  required
                  className="w-full rounded-xl border-2 border-slate-900 bg-white px-4 py-3 text-base font-bold text-slate-900 placeholder-slate-400 outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                />
              </div>

              {error ? (
                <div
                  role="alert"
                  className="rounded-xl border-2 border-red-900 bg-red-100 p-3 text-xs font-black uppercase tracking-wide text-red-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                >
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-900 px-4 py-3 text-base font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-1 hover:bg-slate-800 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] focus:outline-none active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading ? 'Authenticating Admin...' : 'Enter Admin Portal'}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-xs font-bold text-slate-500">
            Not an administrator?{' '}
            <Link
              href="/login"
              className="font-black text-slate-900 underline decoration-slate-900/40 decoration-2 underline-offset-4 hover:decoration-slate-900"
            >
              Sign in as member
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
