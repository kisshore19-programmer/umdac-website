'use client'

import { useState } from 'react'
import { EventCard, SectionHeading } from '@/components/umdac-ui'

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
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <SectionHeading
          eyebrow="Events"
          title="Learn with the club, then put it into action"
          description="UMDAC events are designed to guide students from curiosity to confidence through workshops, panels, project nights, and showcases."
        />

        <div className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {(['upcoming', 'past'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => setView(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                view === option
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              {option === 'upcoming' ? 'Upcoming' : 'Past'}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow={view === 'upcoming' ? 'Upcoming' : 'Past highlights'}
          title={view === 'upcoming' ? 'Open for registration' : 'What our members have built before'}
          description={
            view === 'upcoming'
              ? 'Browse the events currently open to members and the wider student community.'
              : 'A quick look at recent activities that shaped our community and learning culture.'
          }
        />
        <div className={view === 'upcoming' ? 'grid gap-6 lg:grid-cols-3' : 'grid gap-6 lg:grid-cols-2'}>
          {eventsToShow.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </section>
    </main>
  )
}
