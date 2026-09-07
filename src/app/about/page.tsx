'use client'

import { useState } from 'react'

const committee = [
  {
    name: 'Aisha Rahman',
    role: 'President',
    department: 'Data Science',
    quote: 'We build a student community where curiosity leads to confidence.',
  },
  {
    name: 'Kok Wei Lim',
    role: 'Vice President',
    department: 'Computer Science',
    quote: 'Strong fundamentals and real project experience make the difference.',
  },
  {
    name: 'Nadia Ismail',
    role: 'Events Lead',
    department: 'Statistics',
    quote: 'Meaningful learning experiences should be accessible, inclusive, and practical.',
  },
  {
    name: 'Hafiz Tan',
    role: 'Partnerships Manager',
    department: 'Business Analytics',
    quote: 'When members connect with industry, opportunities become tangible.',
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
  isDark = false,
}: {
  eyebrow: string
  title: string
  description?: string
  isDark?: boolean
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className={`mb-2 text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/80' : 'text-purple-600'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-3xl font-black uppercase tracking-tight md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base font-semibold leading-relaxed ${isDark ? 'text-white/90' : 'text-slate-700'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

function CommitteeCard({
  name,
  role,
  onSelect,
  isSelected = false,
}: {
  name: string
  role: string
  department: string
  quote: string
  onSelect: () => void
  isSelected?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`group w-full rounded-2xl border-2 p-4 text-left transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
          : 'border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]'
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-slate-900 text-lg font-black uppercase ${
            isSelected ? 'bg-slate-900 text-white' : 'bg-purple-100 text-slate-900'
          }`}
        >
          {name
            .split(' ')
            .slice(0, 2)
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <p
            className={`text-lg font-black uppercase tracking-tight ${
              isSelected ? 'text-white' : 'text-slate-900'
            }`}
          >
            {name}
          </p>
          <p
            className={`text-sm font-bold ${
              isSelected ? 'text-white/80' : 'text-purple-600'
            }`}
          >
            {role}
          </p>
        </div>
      </div>
    </button>
  )
}

export default function AboutPage() {
  const [selected, setSelected] = useState(committee[0])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-10">
        <SectionHeading
          eyebrow="About UMDAC"
          title="We help students turn data curiosity into real capability"
          description="UMDAC is a student-driven community focused on analytics, AI, and technological problem-solving. We create pathways for learning, collaboration, and career growth within the university ecosystem."
          isDark={true}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border-2 border-slate-900 bg-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">
              Mission
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              To make data and analytics skills accessible, practical, and empowering for all students.
            </p>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">
              Purpose
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              To empower members through projects, workshops, mentorship, and meaningful community building.
            </p>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-purple-50 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-purple-600">
              Impact
            </p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
              To connect theory with application so members can grow into confident, industry-ready contributors.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the committee"
          description="Our committee members support the club’s learning culture, events, and member experience across the academic year."
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {committee.map((member) => (
              <CommitteeCard
                key={member.name}
                name={member.name}
                role={member.role}
                department={member.department}
                quote={member.quote}
                onSelect={() => setSelected(member)}
                isSelected={selected.name === member.name}
              />
            ))}
          </div>

          <aside className="rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-white/80">
              Selected member
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-900 text-lg font-black text-white">
                {selected.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {selected.name}
                </h3>
                <p className="text-sm font-bold text-white/80">{selected.role}</p>
              </div>
            </div>
            <p className="mt-6 text-base font-medium leading-relaxed text-white/90">
              “{selected.quote}”
            </p>
            <div className="mt-8 space-y-4 rounded-xl border-2 border-slate-900 bg-slate-900 p-4 text-sm text-white/80">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-white">
                  Department
                </p>
                <p className="mt-1 font-semibold">{selected.department}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-white">
                  Contact
                </p>
                <p className="mt-1 font-medium leading-relaxed">
                  Contact details are shared through the club’s official channels and member community updates.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
