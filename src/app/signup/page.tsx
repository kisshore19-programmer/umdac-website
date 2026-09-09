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
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="p-8 text-white md:p-10 border-b-4 border-slate-900 lg:border-b-0 lg:border-r-4">
          <p className="text-xs font-black uppercase tracking-widest text-white/80">Become a member</p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight md:text-5xl">Create your UMDAC profile</h1>
          <p className="mt-4 max-w-md text-base font-semibold leading-relaxed text-white/90">
            Join the community, access event registration, and start connecting with other students passionate about data and analytics.
          </p>

          <div className="mt-8 space-y-4 text-sm text-white/90">
            <div className="rounded-xl border-2 border-slate-900 bg-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="font-black uppercase tracking-wide text-white">Beginner friendly</p>
              <p className="mt-2 font-semibold">Start with workshops and learn in a supportive environment.</p>
            </div>
            <div className="rounded-xl border-2 border-slate-900 bg-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="font-black uppercase tracking-wide text-white">Hands-on growth</p>
              <p className="mt-2 font-semibold">Build skills through projects, events, and mentorship.</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest text-white/80">Sign up</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">Register your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="full_name" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Full name
                </label>
                <input id="full_name" name="full_name" placeholder="Your full name" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Email address
                </label>
                <input id="email" name="email" type="email" placeholder="testing123@gmail.com" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="password" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Password
                </label>
                <input id="password" name="password" type="password" placeholder="••••••••••••••" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div>
                <label htmlFor="university" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  University
                </label>
                <input id="university" name="university" placeholder="Universiti Malaya" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div>
                <label htmlFor="faculty" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Faculty
                </label>
                <input id="faculty" name="faculty" placeholder="Faculty of Computer Science" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div>
                <label htmlFor="major" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Major
                </label>
                <input id="major" name="major" placeholder="Computer Science" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div>
                <label htmlFor="year_of_study" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Year of study
                </label>
                <input id="year_of_study" name="year_of_study" type="number" min="1" max="7" placeholder="2" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>

              <div>
                <label htmlFor="semester" className="mb-2 block text-sm font-black uppercase tracking-wide text-white">
                  Semester
                </label>
                <input id="semester" name="semester" type="number" min="1" max="3" placeholder="1" required className={`w-full rounded-xl border-2 px-4 py-3 text-base font-bold outline-none transition shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] focus:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] ${errorMessage ? 'border-red-500 bg-[#78132B] text-white placeholder-white/70' : 'border-slate-900 bg-white text-slate-900 placeholder-slate-400'}`} />
              </div>
            </div>

            {errorMessage ? (
              <p aria-live="polite" className="text-xs font-black uppercase tracking-wide text-red-300">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-3 text-base font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] focus:outline-none active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-sm font-semibold text-white/80">
            Already have an account?{' '}
            <Link href="/login" className="font-black text-white underline decoration-white/30 decoration-2 underline-offset-4 transition hover:decoration-white">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}