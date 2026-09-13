import type { Metadata } from 'next'
import Link from 'next/link'

const eventDetails: Record<string, { title: string; date: string; time: string; location: string; type: string; seats: string; status: string; description: string; checklist: string[]; cta: string; notice: string }> = {
  'startup-bootcamp': {
    title: 'Startup Bootcamp',
    date: 'TBA',
    time: 'TBA',
    location: 'TBA',
    type: 'Bootcamp',
    seats: 'TBA',
    status: 'Open',
    description: 'Learn how to build and scale your ideas in our intensive startup bootcamp designed for student founders.',
    checklist: ['Beginner-friendly session', 'Hands-on exercises', 'Mentorship opportunity', 'Certificate of participation'],
    cta: 'Register for Bootcamp',
    notice: 'Login is required before a registration can be submitted.',
  },
  'datathon': {
    title: 'Datathon',
    date: 'TBA',
    time: 'TBA',
    location: 'TBA',
    type: 'Competition',
    seats: 'TBA',
    status: 'Open',
    description: 'A challenge to solve real-world problems using data analytics, machine learning, and storytelling.',
    checklist: ['Team formation', 'Industry speakers', 'Mentorship opportunity', 'Cash prizes'],
    cta: 'Register for Datathon',
    notice: 'Login is required before a registration can be submitted.',
  },
  'datafair': {
    title: 'DataFair',
    date: 'TBA',
    time: 'TBA',
    location: 'TBA',
    type: 'Fair',
    seats: 'TBA',
    status: 'Open',
    description: 'Connect with industry professionals, explore career opportunities, and discover the latest in data technology.',
    checklist: ['Networking opportunity', 'Career exposure', 'Industry speakers', 'Resume review'],
    cta: 'Reserve a seat',
    notice: 'Login is required before a registration can be submitted.',
  },
  'data-debut-2025': {
    title: 'Data Debut 2025',
    date: '12 October 2025',
    time: '9:00 AM – 5:00 PM',
    location: 'Faculty of Computer Science, UM',
    type: 'Workshop',
    seats: 'Event Concluded',
    status: 'Past Event',
    description: 'Our annual introductory workshop introducing 300+ students to data analytics paths and tools.',
    checklist: [],
    cta: 'View gallery',
    notice: '',
  },
  'datathon-2025': {
    title: 'UMDAC Datathon 2025',
    date: '5 December 2025',
    time: '8:00 AM – 8:00 PM (48 Hours)',
    location: 'Dewan Tunku Canselor',
    type: 'Competition',
    seats: 'Event Concluded',
    status: 'Past Event',
    description: 'A 48-hour challenge solving real-world mobility and energy forecasting problems with industry mentors.',
    checklist: [],
    cta: 'View gallery',
    notice: '',
  },
}
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getEventBySlug } from '@/lib/supabase/queries/events'
import { ApplicationForm } from '@/components/ApplicationForm'

type EventPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const event = await getEventBySlug(supabase, id)
  if (!event) return { title: 'Event Not Found | UMDAC' }
  return {
    title: `${event.title} | UMDAC`,
    description: event.description ?? undefined,
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const event = await getEventBySlug(supabase, id)

  if (!event) notFound()

  // Resolve display values — fall back to "TBA" for any null fields
  const displayDate = event.date
    ? new Date(event.date).toLocaleDateString('en-MY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'TBA'
  const displayTime     = event.time_label   || 'TBA'
  const displayLocation = event.location     || 'TBA'
  const displaySeats    = event.seats_label  || 'TBA'
  const displayType     = event.type         || 'General'
  const displayStatus   = event.status       || 'TBA'
  const displayNotice   = event.notice       || 'Registration details will be announced soon.'
  const displayCta      = event.cta_label    || 'Register now'

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero banner */}
      <div className="overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <div className="h-56 p-6 text-white md:p-10">
          <div className="flex h-full items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded bg-white/15 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white">
                {displayType}
              </span>
              <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                {event.title}
              </h1>
            </div>
            <span className="shrink-0 rounded border-2 border-white/30 bg-white/15 px-3 py-1.5 text-sm font-extrabold uppercase tracking-wider text-white">
              {displayStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ── PAST EVENT LAYOUT ── */}
      {event.is_past ? (
        <div className="mt-8 space-y-8">
          {/* Write-up */}
          {event.writeup && (
            <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                Event Write-up
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 whitespace-pre-line">
                {event.writeup}
              </p>
            </div>
          )}

        {/* Main content */}
        <div>
          {event.status === 'Past Event' ? (
            <>
              <div className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Event Write-up</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">[Placeholder for event write-up: A brief summary of what happened, who spoke, and the main takeaways.]</p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Gallery</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="aspect-video flex items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">[Image 1]</span>
                  </div>
                  <div className="aspect-video flex items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">[Image 2]</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Notice banner */}
              <div className="rounded-xl border-2 border-slate-900 bg-indigo-50 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Registration status</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{event.notice}</p>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600">{event.description}</p>

              {/* Checklist */}
              <div className="mt-8">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">What to expect</h2>
                <ul className="mt-4 space-y-3">
                  {event.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-xs font-black text-white shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                        ✓
                      </span>
                      <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {/* Image gallery */}
          {event.image_urls.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-slate-900">
                Gallery
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {event.image_urls.map((url, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={url}
                    alt={`${event.title} photo ${i + 1}`}
                    className="aspect-video w-full rounded-xl border-2 border-slate-900 object-cover shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-900 bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-px focus:outline-none"
          >
            ← Back to events
          </Link>
        </div>
      ) : (
        /* ── UPCOMING EVENT LAYOUT ── */
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Main content */}
          <div>
            {/* Notice banner */}
            <div className="rounded-xl border-2 border-slate-900 bg-indigo-50 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                Registration status
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{displayNotice}</p>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-600">{event.description}</p>

            {/* What to expect checklist */}
            {event.checklist.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                  What to expect
                </h2>
                <ul className="mt-4 space-y-3">
                  {event.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-xs font-black text-white shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
                        ✓
                      </span>
                      <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Application form — teammate plugs this in */}
            <div className="mt-10">
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                Registration
              </h2>
              <ApplicationForm eventId={event.event_id} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="rounded-2xl border-2 border-slate-900 bg-slate-50 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] h-fit">
            <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">
              Event details
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Date</dt>
                <dd className="mt-1 font-semibold text-slate-900">{displayDate}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Time</dt>
                <dd className="mt-1 font-semibold text-slate-900">{displayTime}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Venue</dt>
                <dd className="mt-1 font-semibold text-slate-900">{displayLocation}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Availability</dt>
                <dd className="mt-1 font-semibold text-slate-900">{displaySeats}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                href="/events"
                className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-white px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-px focus:outline-none"
              >
                ← Back to events
              </Link>
            </div>
          </aside>

        </div>
      )}
    </main>
  )
}
