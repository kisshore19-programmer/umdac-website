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
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] lg:grid-cols-2">
        <div className="p-8 text-white md:p-10 border-b-4 border-slate-900 lg:border-b-0 lg:border-r-4">
          <p className="text-xs font-black uppercase tracking-widest text-white/80">Welcome back</p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-5xl">Access your UMDAC account</h1>
          <p className="mt-4 max-w-md text-base font-semibold leading-relaxed text-white/90">
            Continue your learning journey, register for events, and stay connected with the club community.
          </p>
          <div className="mt-8 rounded-xl border-2 border-slate-900 bg-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-400">New to the club?</p>
            <p className="mt-2 text-3xl font-black uppercase tracking-tight text-white">Join now</p>
            <p className="mt-2 text-sm font-semibold text-slate-300">Create an account to access events, updates, and opportunities.</p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-white/80">Login</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">Sign in</h2>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="testing123@gmail.com"
                required
                className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${error ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••••••"
                required
                className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${error ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`}
              />
            </div>

            {error ? (
              <p aria-live="polite" className="text-xs font-black uppercase tracking-wide text-red-300">
                {error}
              </p>
            ) : null}

            <div className="flex justify-end">
              <a href="#" className="text-xs font-black uppercase tracking-widest text-white/80 transition hover:text-white">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-3 text-base font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] focus:outline-none active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {loading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-sm font-semibold text-white/80">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-black text-white underline decoration-white/30 decoration-2 underline-offset-4 transition hover:decoration-white">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}