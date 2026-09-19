import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getEventBySlug, EventRecord } from '@/lib/supabase/queries/events'
import { EventRegisterButton } from '@/components/events/EventRegisterButton'
import { parseEventDateTime, parseEventNotice } from '@/lib/utils'

const fallbackEvents: Record<string, {
  event_id: number
  title: string
  slug: string
  description: string
  type: string
  date: string
  time_label: string
  location: string
  seats_label: string
  capacity: number | null
  status: string
  checklist: string[]
  notice: string
  cta_label: string
  is_past: boolean
  writeup: string | null
  image_urls: string[]
}> = {
  'startup-bootcamp': {
    event_id: 1,
    title: 'Startup Bootcamp',
    slug: 'startup-bootcamp',
    description: 'Learn how to build and scale your ideas in our intensive startup bootcamp designed for student founders.',
    type: 'Bootcamp',
    date: 'TBA',
    time_label: '10:00 AM - 1:00 PM MYT',
    location: 'Faculty of Computer Science and Information Technology, UM',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Beginner-friendly session', 'Hands-on exercises', 'Mentorship opportunity', 'Certificate of participation'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
  },
  'datathon': {
    event_id: 2,
    title: 'Datathon',
    slug: 'datathon',
    description: 'A challenge to solve real-world problems using data analytics, machine learning, and storytelling.',
    type: 'Competition',
    date: 'TBA',
    time_label: '9:00 AM - 6:00 PM MYT',
    location: 'Dewan Tunku Canselor',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Team formation', 'Industry speakers', 'Mentorship opportunity', 'Cash prizes'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
  },
  'datafair': {
    event_id: 3,
    title: 'DataFair',
    slug: 'data-fair',
    description: 'Connect with industry professionals, explore career opportunities, and discover the latest in data technology.',
    type: 'Fair',
    date: 'TBA',
    time_label: '10:00 AM - 4:00 PM MYT',
    location: 'FSKTM The Cube, UM',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Networking opportunity', 'Career exposure', 'Industry speakers', 'Resume review'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
  },
  'data-fair': {
    event_id: 3,
    title: 'DataFair',
    slug: 'data-fair',
    description: 'Connect with industry professionals, explore career opportunities, and discover the latest in data technology.',
    type: 'Fair',
    date: 'TBA',
    time_label: '10:00 AM - 4:00 PM MYT',
    location: 'FSKTM The Cube, UM',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Networking opportunity', 'Career exposure', 'Industry speakers', 'Resume review'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
  },
  'data-debut-2025': {
    event_id: 10,
    title: 'Data Debut 2025',
    slug: 'data-debut-2025',
    description: 'Our annual introductory workshop introducing 300+ students to data analytics paths and tools.',
    type: 'Workshop',
    date: '2025-10-12',
    time_label: '9:00 AM – 5:00 PM MYT',
    location: 'Faculty of Computer Science, UM',
    seats_label: 'Event Concluded',
    capacity: null,
    status: 'Past Event',
    checklist: [],
    notice: '',
    cta_label: 'View gallery',
    is_past: true,
    writeup: 'Our annual introductory workshop introduced 300+ students across faculties to core data analytics workflows, spreadsheet fluency, and industry pathways.',
    image_urls: [],
  },
  'datathon-2025': {
    event_id: 11,
    title: 'UMDAC Datathon 2025',
    slug: 'datathon-2025',
    description: 'A 48-hour challenge solving real-world mobility and energy forecasting problems with industry mentors.',
    type: 'Competition',
    date: '2025-12-05',
    time_label: '8:00 AM – 8:00 PM MYT (48 Hours)',
    location: 'Dewan Tunku Canselor',
    seats_label: 'Event Concluded',
    capacity: null,
    status: 'Past Event',
    checklist: [],
    notice: '',
    cta_label: 'View gallery',
    is_past: true,
    writeup: 'Over 40 teams tackled complex mobility and sustainable energy datasets over a 48-hour sprint, presenting predictive models to panels of academic and enterprise judges.',
    image_urls: [],
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function resolveEvent(supabase: any, id: string): Promise<EventRecord | null> {
  const decodedId = decodeURIComponent(id).trim()

  // 1. Try slug
  let event = await getEventBySlug(supabase, decodedId)
  
  // 2. Try numeric ID
  if (!event) {
    const numId = Number(decodedId)
    if (!isNaN(numId) && numId > 0) {
      const { data } = await supabase.from('events').select('*').eq('event_id', numId).maybeSingle()
      if (data) {
        event = {
          ...data,
          checklist: Array.isArray(data.checklist) ? data.checklist : [],
          image_urls: Array.isArray(data.image_urls) ? data.image_urls : [],
          is_past: Boolean(data.is_past),
        }
      }
    }
  }

  // 3. Try case-insensitive slug search in DB
  if (!event) {
    const { data } = await supabase
      .from('events')
      .select('*')
      .ilike('slug', decodedId)
      .limit(1)
    if (data && data.length > 0) {
      const row = data[0]
      event = {
        ...row,
        checklist: Array.isArray(row.checklist) ? row.checklist : [],
        image_urls: Array.isArray(row.image_urls) ? row.image_urls : [],
        is_past: Boolean(row.is_past),
      }
    }
  }

  // 4. Fallbacks
  if (!event && decodedId === 'datafair') {
    event = await getEventBySlug(supabase, 'data-fair')
  }
  if (!event && decodedId === 'data-fair') {
    event = await getEventBySlug(supabase, 'datafair')
  }
  if (!event) {
    const fallback = Object.values(fallbackEvents).find(
      (e) => e.slug === decodedId || String(e.event_id) === decodedId
    )
    if (fallback) {
      event = fallback
    }
  }
  return event
}

type EventPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const event = await resolveEvent(supabase, id)
  if (!event) return { title: 'Event Not Found | UMDAC' }
  return {
    title: `${event.title} | UMDAC`,
    description: event.description ?? undefined,
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const event = await resolveEvent(supabase, id)

  if (!event) notFound()

  // Get current user registration status
  const { data: { user } } = await supabase.auth.getUser()
  let isRegistered = false
  let regStatus = 'registered'

  if (user) {
    const { data: appData } = await supabase
      .from('applications')
      .select('status')
      .eq('event_id', event.event_id)
      .eq('user_id', user.id)
      .limit(1)

    if (appData && appData.length > 0) {
      isRegistered = true
      regStatus = appData[0].status || 'registered'
    }
  }

  // Resolve display values
  const { displayDate, displayTime } = parseEventDateTime(event.date, event.time_label)
  const { noticeText, registrationLink } = parseEventNotice(event.notice)
  const displayLocation = event.location     || 'Faculty of Computer Science and Information Technology, UM'
  const displayType     = event.type         || 'General'
  const displayStatus   = event.status       || 'TBA'
  const displayNotice   = noticeText         || 'Registration details will be announced soon.'
  const effectiveRegLink = event.registration_link || registrationLink

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        {event.image_urls && event.image_urls.length > 0 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_urls[0]}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-900/40" />
        <div className="relative z-10 flex min-h-[220px] flex-col justify-end p-6 text-white md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded border border-white/20 bg-black/50 backdrop-blur-sm px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white">
                {displayType}
              </span>
              <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-white md:text-5xl drop-shadow-md">
                {event.title}
              </h1>
            </div>
            <span className="shrink-0 rounded border-2 border-white/30 bg-black/40 backdrop-blur-sm px-3 py-1.5 text-sm font-extrabold uppercase tracking-wider text-white">
              {displayStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

        {/* Main content */}
        <div>
          {event.is_past ? (
            <div className="space-y-8">
              {/* Write-up */}
              <div className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                  Event Write-up
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600 whitespace-pre-line">
                  {event.writeup ||
                    'Our annual event bringing students, industry partners, and tech leaders together.'}
                </p>
              </div>

              {/* Image gallery */}
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                  Gallery
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {event.image_urls && event.image_urls.length > 0 ? (
                    event.image_urls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-video overflow-hidden rounded-xl border-2 border-slate-900 bg-slate-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`${event.title} photo ${i + 1}`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </a>
                    ))
                  ) : (
                    <>
                      <div className="aspect-video flex items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Photos Coming Soon
                        </span>
                      </div>
                      <div className="aspect-video flex items-center justify-center rounded-xl border-2 border-slate-900 bg-slate-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Photos Coming Soon
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Notice banner */}
              <div className="rounded-xl border-2 border-slate-900 bg-indigo-50 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                  Registration status
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{displayNotice}</p>
              </div>

              {event.description && (
                <div className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                    About this event
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600 whitespace-pre-line">{event.description}</p>
                </div>
              )}

              {/* What to expect checklist */}
              {event.checklist.length > 0 && (
                <div className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
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

              {/* Event Gallery / Photos */}
              {event.image_urls && event.image_urls.length > 0 && (
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                    Gallery & Highlights
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {event.image_urls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-video overflow-hidden rounded-xl border-2 border-slate-900 bg-slate-100 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`${event.title} photo ${i + 1}`}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Registration section (1-Click or External Form) */}
              <div className="pt-2">
                <EventRegisterButton
                  eventId={event.event_id}
                  eventTitle={event.title}
                  isLoggedIn={Boolean(user)}
                  initialIsRegistered={isRegistered}
                  initialStatus={regStatus}
                  isClosed={
                    event.status === 'closed' ||
                    event.status === 'completed' ||
                    event.status === 'cancelled' ||
                    event.status === 'upcoming'
                  }
                  eventStatus={event.status}
                  externalUrl={effectiveRegLink}
                  ctaLabel={event.cta_label}
                />
              </div>
            </div>
          )}
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
    </main>
  )
}
