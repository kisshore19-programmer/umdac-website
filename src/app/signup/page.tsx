'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signUpAction } from '../actions/auth'

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)
    const res = await signUpAction(formData)

    if (res && !res.success) {
      setErrorMessage(res.error || 'Something went wrong while creating your account.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4B7D5] via-[#8D58B9] to-[#3B2276] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-900 p-8 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200">Become a member</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Create your UMDAC profile</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-fuchsia-100">
            Join the community, access event registration, and start connecting with other students passionate about data and analytics.
          </p>

          <div className="mt-8 space-y-4 text-sm text-fuchsia-100">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="font-semibold text-white">Beginner friendly</p>
              <p className="mt-2">Start with workshops and learn in a supportive environment.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="font-semibold text-white">Hands-on growth</p>
              <p className="mt-2">Build skills through projects, events, and mentorship.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#3B1354] p-6 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Sign up</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Register your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="full_name" className="mb-2 block text-sm font-bold text-white">
                  Full name
                </label>
                <input id="full_name" name="full_name" placeholder="Your full name" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-white">
                  Email address
                </label>
                <input id="email" name="email" type="email" placeholder="testing123@gmail.com" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="password" className="mb-2 block text-sm font-bold text-white">
                  Password
                </label>
                <input id="password" name="password" type="password" placeholder="••••••••••••••" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div>
                <label htmlFor="university" className="mb-2 block text-sm font-bold text-white">
                  University
                </label>
                <input id="university" name="university" placeholder="Universiti Malaya" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div>
                <label htmlFor="faculty" className="mb-2 block text-sm font-bold text-white">
                  Faculty
                </label>
                <input id="faculty" name="faculty" placeholder="Faculty of Computer Science" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div>
                <label htmlFor="major" className="mb-2 block text-sm font-bold text-white">
                  Major
                </label>
                <input id="major" name="major" placeholder="Computer Science" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div>
                <label htmlFor="year_of_study" className="mb-2 block text-sm font-bold text-white">
                  Year of study
                </label>
                <input id="year_of_study" name="year_of_study" type="number" min="1" max="7" placeholder="2" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>

              <div>
                <label htmlFor="semester" className="mb-2 block text-sm font-bold text-white">
                  Semester
                </label>
                <input id="semester" name="semester" type="number" min="1" max="3" placeholder="1" required className={`w-full rounded-xl border px-4 py-3 text-base outline-none transition ${errorMessage ? 'border-red-600 bg-[#78132B] text-white placeholder-white/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/50'}`} />
              </div>
            </div>

            {errorMessage ? (
              <p aria-live="polite" className="text-xs font-bold text-[#E53E3E]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#C582F2] to-[#8922D7] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] px-4 py-3 text-base font-bold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-[#3B1354] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-fuchsia-200">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-white transition hover:text-fuchsia-300">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}