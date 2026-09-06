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
    <main className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
        <div className="bg-[#4A1D67] p-8 text-white md:p-10">
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

        <div className="p-6 md:p-10 bg-white">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-700">Login</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Sign in</h2>
            </div>
            <Link
              href="/admin"
              className="rounded-lg bg-fuchsia-100 px-3 py-1.5 text-xs font-semibold text-fuchsia-800 transition hover:bg-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-[#FAF5FF]"
            >
              Admin Login
            </Link>
          </div>

          {error ? (
            <div aria-live="polite" className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="testing123@gmail.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••••••"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#A338F5] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-fuchsia-700 transition hover:text-fuchsia-800">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}