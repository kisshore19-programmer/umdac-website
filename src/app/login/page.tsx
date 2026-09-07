'use client'

import Link from 'next/link'
import { useState } from 'react'
import { loginAction } from '@/app/actions/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    try {
      await loginAction(formData)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to sign in right now. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4B7D5] via-[#8D58B9] to-[#3B2276] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
        <div className="bg-slate-900 p-8 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Welcome back</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Access your UMDAC account</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-fuchsia-100">
            Continue your learning journey, register for events, and stay connected with the club community.
          </p>
          <div className="mt-8 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm text-fuchsia-100">New to the club?</p>
            <p className="mt-2 text-2xl font-bold">Join now</p>
            <p className="mt-2 text-sm text-fuchsia-100">Create an account to access events, updates, and opportunities.</p>
          </div>
        </div>

        <div className="bg-[#3B1354] p-6 md:p-10">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Login</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Sign in</h2>
            </div>
            <Link
              href="/admin"
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-200 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-[#3B1354]"
            >
              Admin Login
            </Link>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="testing123@gmail.com"
                required
                className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${error ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••••••"
                required
                className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${error ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`}
              />
            </div>

            {error ? (
              <p aria-live="polite" className="text-xs font-bold text-[#E53E3E]">
                {error}
              </p>
            ) : null}

            <div className="flex justify-end">
              <a href="#" className="text-xs font-semibold text-fuchsia-300 hover:text-fuchsia-200">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#C582F2] to-[#8922D7] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] px-4 py-3 text-base font-bold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-[#3B1354] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>

          <p className="mt-6 text-sm text-fuchsia-200">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-bold text-white transition hover:text-fuchsia-300">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}