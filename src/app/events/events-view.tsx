'use client'

import { useState } from 'react'
import { EventCard, EventStatus } from '@/components/umdac-ui'
import { AdminEventRecord } from '@/app/actions/adminActions'
import { parseEventDateTime } from '@/lib/utils'

export function EventsView({ initialEvents = [] }: { initialEvents: AdminEventRecord[] }) {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming')
  const [dbEvents] = useState<AdminEventRecord[]>(initialEvents)

  // Map DB events to EventCard props
  const mappedUpcoming = dbEvents
    .filter((e) => !e.is_past)
    .map((e) => {
      const { displayDate } = parseEventDateTime(e.date, e.time_label)
      const isTba = displayDate.toUpperCase() === 'TBA' || e.status === 'upcoming' || e.status === 'tba'
      let badgeStatus: EventStatus = 'Open'
      if (isTba) {
        badgeStatus = 'TBA'
      } else if (e.status === 'closed' || e.status === 'completed' || e.status === 'cancelled') {
        badgeStatus = 'Closed'
      } else if (e.status === 'active' || e.status === 'open') {
        badgeStatus = 'Open'
      }

      return {
        title: e.title,
        date: displayDate,
        rawDate: e.date,
        type: e.type || 'Event',
        location: e.location || 'TBA',
        status: badgeStatus,
        description: e.description || '',
        href: `/events/${e.slug || e.event_id}`,
        imageUrl: e.image_urls?.[0],
      }
    })
    .sort((a, b) => {
      // 1. OPEN events appear ahead of TBA
      const getPriority = (status: EventStatus) => {
        if (status === 'Open' || status === 'Closing Soon') return 0
        if (status === 'Closed') return 1
        return 2 // TBA / Upcoming
      }
      const priorityDiff = getPriority(a.status) - getPriority(b.status)
      if (priorityDiff !== 0) return priorityDiff

      // 2. If both are open, sort by date ascending (closest date first)
      if (a.rawDate && b.rawDate && a.status === 'Open' && b.status === 'Open') {
        const timeA = new Date(a.rawDate).getTime()
        const timeB = new Date(b.rawDate).getTime()
        if (!isNaN(timeA) && !isNaN(timeB)) return timeA - timeB
      }

      return 0
    })

  const mappedPast = dbEvents
    .filter((e) => e.is_past)
    .map((e) => {
      const { displayDate } = parseEventDateTime(e.date, e.time_label)
      return {
        title: e.title,
        date: displayDate,
        type: e.type || 'Event',
        location: e.location || 'TBA',
        status: 'Past Event' as EventStatus,
        description: e.description || e.writeup || '',
        href: `/events/${e.slug || e.event_id}`,
        imageUrl: e.image_urls?.[0],
      }
    })

  const eventsToShow = view === 'upcoming' ? mappedUpcoming : mappedPast

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero */}
      <section className="flex min-h-[225px] flex-col justify-center overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:min-h-[255px] md:p-10 dark:border-slate-800 dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        <div className="max-w-2xl">
          <span className="mb-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm">
            ✦ Community Schedule
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            UMDAC Events
          </h1>
          <p className="mt-4 max-w-md text-sm font-semibold leading-relaxed text-white/90">
            UMDAC events guide students from curiosity to confidence through workshops, panels, project nights, and showcases.
          </p>
        </div>
      </section>

      {/* Toggle + grid section */}
      <section className="mt-14">

        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
              {view === 'upcoming' ? 'SCHEDULE & CALENDAR' : 'COMMUNITY HIGHLIGHTS'}
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-5xl">
              {view === 'upcoming' ? 'UPCOMING EVENTS' : 'PAST EVENTS'}
            </h2>
          </div>

          {/* Fluid Toggle */}
          <div className="inline-flex shrink-0 overflow-hidden rounded-xl border-2 border-slate-900 bg-white p-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            {(['upcoming', 'past'] as const).map((option) => (
              <button
                key={option}
                id={`events-toggle-${option}`}
                type="button"
                aria-pressed={view === option}
                onClick={() => setView(option)}
                className={`rounded-lg px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  view === option
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                {option === 'upcoming' ? 'Upcoming' : 'Past'}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        {eventsToShow.length === 0 ? (
          <div className="rounded-2xl border-2 border-slate-900 bg-white p-12 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            <p className="text-base font-bold text-slate-500 dark:text-slate-400">No {view} events currently available.</p>
          </div>
        ) : (
          <div
            key={view}
            className={`animate-fade-in-up ${view === 'upcoming' ? 'grid gap-6 lg:grid-cols-3 items-stretch' : 'grid gap-6 lg:grid-cols-2 items-stretch'}`}
          >
            {eventsToShow.map((event) => (
              <div
                key={event.title}
                className={`h-full flex flex-col ${view === 'past' ? 'opacity-90 hover:opacity-100 transition-opacity duration-200' : ''}`}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  )
}
