'use client'

import { useState } from 'react'
import { CommitteeCard, SectionHeading } from '@/components/umdac-ui'

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

export default function AboutPage() {
  const [selected, setSelected] = useState(committee[0])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <SectionHeading
          eyebrow="About UMDAC"
          title="We help students turn data curiosity into real capability"
          description="UMDAC is a student-driven community focused on analytics, AI, and technological problem-solving. We create pathways for learning, collaboration, and career growth within the university ecosystem."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Mission</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              To make data and analytics skills accessible, practical, and empowering for all students.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Purpose</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              To empower members through projects, workshops, mentorship, and meaningful community building.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Impact</p>
            <p className="mt-4 text-base leading-7 text-slate-600">
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

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Selected member</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-700">
                {selected.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{selected.name}</h3>
                <p className="text-sm text-sky-200">{selected.role}</p>
              </div>
            </div>
            <p className="mt-6 text-base leading-7 text-slate-200">“{selected.quote}”</p>
            <div className="mt-8 space-y-4 rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
              <div>
                <p className="font-semibold text-white">Department</p>
                <p className="mt-2">{selected.department}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Contact</p>
                <p className="mt-2">Contact details are shared through the club’s official channels and member community updates.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
