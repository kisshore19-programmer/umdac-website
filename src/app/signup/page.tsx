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
    <main className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-900 p-8 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Become a member</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">Create your UMDAC profile</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
            Join the community, access event registration, and start connecting with other students passionate about data and analytics.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-200">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-semibold text-white">Beginner friendly</p>
              <p className="mt-2">Start with workshops and learn in a supportive environment.</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-semibold text-white">Hands-on growth</p>
              <p className="mt-2">Build skills through projects, events, and mentorship.</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Sign up</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Register your account</h2>
          </div>

          {errorMessage ? (
            <div aria-live="polite" className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input id="full_name" name="full_name" placeholder="Your full name" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input id="email" name="email" type="email" placeholder="student@um.edu.my" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input id="password" name="password" type="password" placeholder="Create a strong password" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div>
                <label htmlFor="university" className="mb-2 block text-sm font-medium text-slate-700">
                  University
                </label>
                <input id="university" name="university" placeholder="Universiti Malaya" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div>
                <label htmlFor="faculty" className="mb-2 block text-sm font-medium text-slate-700">
                  Faculty
                </label>
                <input id="faculty" name="faculty" placeholder="Faculty of Computer Science" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div>
                <label htmlFor="major" className="mb-2 block text-sm font-medium text-slate-700">
                  Major
                </label>
                <input id="major" name="major" placeholder="Computer Science" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div>
                <label htmlFor="year_of_study" className="mb-2 block text-sm font-medium text-slate-700">
                  Year of study
                </label>
                <input id="year_of_study" name="year_of_study" type="number" min="1" max="7" placeholder="2" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>

              <div>
                <label htmlFor="semester" className="mb-2 block text-sm font-medium text-slate-700">
                  Semester
                </label>
                <input id="semester" name="semester" type="number" min="1" max="3" placeholder="1" required className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-sky-700 transition hover:text-sky-800">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}