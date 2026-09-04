'use client'

import { useState } from 'react'
import { EventCard } from '@/components/umdac-ui'

const upcomingEvents = [
  {
    title: 'Data Debut 2026',
    date: '18 October 2026 · 10:00 AM',
    type: 'Workshop',
    location: 'Faculty of Computer Science, UM',
    status: 'Open' as const,
    description: 'Beginner-friendly analytics workshop covering practical data workflows and decision-making tools.',
    href: '/events/data-debut-2026',
  },
  {
    title: 'AI & Society Panel',
    date: '2 November 2026 · 6:30 PM',
    type: 'Panel',
    location: 'Dewan Perdana',
    status: 'Closing Soon' as const,
    description: 'Explore responsible AI adoption in research, society, and future career opportunities.',
    href: '/events/ai-society-panel',
  },
  {
    title: 'Project Sprint Night',
    date: '15 November 2026 · 7:00 PM',
    type: 'Hack Night',
    location: 'Innovation Lab',
    status: 'Full' as const,
    description: 'Build with peers, sharpen problem framing, and tighten project ideas for the next showcase cycle.',
    href: '/events/project-sprint-night',
  },
]

const pastEvents = [
  {
    title: 'UMDAC Data Visualization Jam',
    date: '12 August 2026',
    type: 'Competition',
    location: 'Engineering Faculty',
    status: 'Past Event' as const,
    description: 'Teams turned raw datasets into compelling narratives using a range of visualization techniques.',
    href: '/events/visualization-jam',
  },
  {
    title: 'Career in AI Bootcamp',
    date: '27 July 2026',
    type: 'Bootcamp',
    location: 'CITD',
    status: 'Past Event' as const,
    description: 'A hands-on learning series covering the realities of AI careers, projects, and portfolio development.',
    href: '/events/career-in-ai-bootcamp',
  },
]

export default function EventsPage() {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming')
  const eventsToShow = view === 'upcoming' ? upcomingEvents : pastEvents

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero — matches home page hero card style */}
      <section className="overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-14">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex w-fit items-center rounded bg-white/15 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white">
            UMDAC Events
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Learn.{' '}
            <span className="bg-white bg-clip-text text-transparent drop-shadow">
              Build.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm font-semibold leading-relaxed text-white/80">
            UMDAC events guide students from curiosity to confidence through workshops, panels, project nights, and showcases.
          </p>
        </div>
      </section>

      {/* Toggle + grid section */}
      <section className="mt-14">

        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-purple-600">
              {view === 'upcoming' ? 'UPCOMING EVENTS' : 'PAST EVENTS'}
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">
              {view === 'upcoming' ? 'Open for registration' : 'Community highlights'}
            </h2>
          </div>

          {/* Toggle */}
          <div className="inline-flex shrink-0 overflow-hidden rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            {(['upcoming', 'past'] as const).map((option) => (
              <button
                key={option}
                id={`events-toggle-${option}`}
                type="button"
                aria-pressed={view === option}
                onClick={() => setView(option)}
                className={`px-5 py-2.5 text-sm font-extrabold uppercase tracking-wider transition ${
                  view === option
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {option === 'upcoming' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <div className={view === 'upcoming' ? 'grid gap-6 lg:grid-cols-3' : 'grid gap-6 lg:grid-cols-2'}>
          {eventsToShow.map((event) => (
            <div
              key={event.title}
              className={view === 'past' ? 'opacity-80 hover:opacity-100 transition-opacity duration-200' : ''}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
