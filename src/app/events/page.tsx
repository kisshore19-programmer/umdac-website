'use client'

import { useState, useEffect } from 'react'
import { EventCard, EventStatus } from '@/components/umdac-ui'
import { fetchAdminEventsAction, AdminEventRecord } from '@/app/actions/adminActions'

const fallbackUpcoming = [
  {
    title: 'Startup Bootcamp',
    date: 'TBA',
    type: 'Bootcamp',
    location: 'TBA',
    status: 'Open' as EventStatus,
    description: 'Learn how to build and scale your ideas in our intensive startup bootcamp designed for student founders.',
    href: '/events/startup-bootcamp',
  },
  {
    title: 'Datathon',
    date: 'TBA',
    type: 'Competition',
    location: 'TBA',
    status: 'Open' as EventStatus,
    description: 'A challenge to solve real-world problems using data analytics, machine learning, and storytelling.',
    href: '/events/datathon',
  },
  {
    title: 'DataFair',
    date: 'TBA',
    type: 'Fair',
    location: 'TBA',
    status: 'Open' as EventStatus,
    description: 'Connect with industry professionals, explore career opportunities, and discover the latest in data technology.',
    href: '/events/data-fair',
  },
]

const fallbackPast = [
  {
    title: 'Data Debut 2025',
    date: '12 October 2025',
    type: 'Workshop',
    location: 'Faculty of Computer Science, UM',
    status: 'Past Event' as EventStatus,
    description: 'Our annual introductory workshop introducing 300+ students to data analytics paths and tools.',
    href: '/events/data-debut-2025',
  },
  {
    title: 'UMDAC Datathon 2025',
    date: '5 December 2025',
    type: 'Competition',
    location: 'Dewan Tunku Canselor',
    status: 'Past Event' as EventStatus,
    description: 'A 48-hour challenge solving real-world mobility and energy forecasting problems with industry mentors.',
    href: '/events/datathon-2025',
  },
]

export default function EventsPage() {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming')
  const [dbEvents, setDbEvents] = useState<AdminEventRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminEventsAction()
        setDbEvents(data)
      } catch (err) {
        console.error('Failed to load events from DB:', err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // Map DB events to EventCard props
  const mappedUpcoming = dbEvents
    .filter((e) => !e.is_past)
    .map((e) => ({
      title: e.title,
      date: e.date && e.date !== 'TBA' && !e.date.includes('2026-12-31')
        ? new Date(e.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'TBA',
      type: e.type || 'Event',
      location: e.location || 'TBA',
      status: (e.status === 'active' || e.status === 'upcoming' ? 'Open' : e.status === 'closed' ? 'Closed' : 'Open') as EventStatus,
      description: e.description || '',
      href: `/events/${e.slug || e.event_id}`,
    }))

  const mappedPast = dbEvents
    .filter((e) => e.is_past)
    .map((e) => ({
      title: e.title,
      date: e.date && e.date !== 'TBA'
        ? new Date(e.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Past Event',
      type: e.type || 'Event',
      location: e.location || 'TBA',
      status: 'Past Event' as EventStatus,
      description: e.description || e.writeup || '',
      href: `/events/${e.slug || e.event_id}`,
    }))

  const upcomingList = mappedUpcoming.length > 0 ? mappedUpcoming : fallbackUpcoming
  const pastList = mappedPast.length > 0 ? mappedPast : fallbackPast
  const eventsToShow = view === 'upcoming' ? upcomingList : pastList

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero */}
      <section className="flex min-h-[225px] flex-col justify-center overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:min-h-[255px] md:p-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            UMDAC Events
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
              className={view === 'past' ? 'opacity-90 hover:opacity-100 transition-opacity duration-200' : ''}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
