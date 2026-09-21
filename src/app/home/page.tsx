'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { EventCard, SectionHeading } from '@/components/umdac-ui'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import { fetchAdminEventsAction, AdminEventRecord } from '@/app/actions/adminActions'
import { parseEventDateTime } from '@/lib/utils'

const fallbackUpcoming = [
  {
    title: 'Startup Bootcamp',
    date: 'TBA',
    type: 'Bootcamp',
    location: 'TBA',
    status: 'TBA' as const,
    description: 'Learn how to build and scale your ideas in our intensive startup bootcamp designed for student founders.',
    href: '/events/startup-bootcamp',
  },
  {
    title: 'Datathon',
    date: 'TBA',
    type: 'Competition',
    location: 'TBA',
    status: 'TBA' as const,
    description: 'A challenge to solve real-world problems using data analytics, machine learning, and storytelling.',
    href: '/events/datathon',
  },
  {
    title: 'DataFair',
    date: 'TBA',
    type: 'Fair',
    location: 'TBA',
    status: 'TBA' as const,
    description: 'Connect with industry professionals, explore career opportunities, and discover the latest in data technology.',
    href: '/events/data-fair',
  },
]

const pillars = [
  {
    title: 'Data Debut',
    description: 'A welcoming foundation for students who want to learn the fundamentals of data, analysis, and decision-making.',
  },
  {
    title: 'DataDev',
    description: 'Hands-on project work, technical growth, and practical experience that strengthens problem-solving skills.',
  },
  {
    title: 'DATA CAREER',
    description: 'Industry conversations, networking, and career exposure that connect club learning with real-world opportunities.',
  },
]

const fallbackPast = [
  {
    title: 'Data Debut 2025',
    date: '12 October 2025',
    type: 'Workshop',
    location: 'Faculty of Computer Science, UM',
    status: 'Past Event' as const,
    description: 'Our annual introductory workshop introducing 300+ students to data analytics paths and tools.',
    href: '/events/data-debut-2025',
  },
  {
    title: 'UMDAC Datathon 2025',
    date: '5 December 2025',
    type: 'Competition',
    location: 'Dewan Tunku Canselor',
    status: 'Past Event' as const,
    description: 'A 48-hour challenge solving real-world mobility and energy forecasting problems with industry mentors.',
    href: '/events/datathon-2025',
  },
]

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false)
  const [introSrc, setIntroSrc] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [dbEvents, setDbEvents] = useState<AdminEventRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchAdminEventsAction()
        setDbEvents(data)
      } catch (err) {
        console.error('Failed to load events for home page:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Force browser to bypass cache for the animated WebP to ensure it plays from the beginning on mount
    setIntroSrc('/umdac_intro.webp?t=' + Date.now())
  }, [])

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIntroFinished(true)
      }, 7000) // play intro animation for 7.0 seconds after image loads
      return () => clearTimeout(timer)
    }
  }, [imageLoaded])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-14 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
        {/* Intro WebP Overlay */}
        <div className={`absolute inset-0 z-20 flex items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-1000 ${introFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {introSrc && (
            <img 
              src={introSrc} 
              alt="UMDAC Loading..." 
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit items-center rounded bg-slate-100 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:bg-slate-800 dark:text-indigo-400">
              Universiti Malaya Data Analytics Club
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-7xl">
              Decode.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Transform.
              </span>
              <br />
              Excel.
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
              UMDAC empowers over 500+ student developers and data enthusiasts at Universiti Malaya.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events" className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-[2px] dark:border-slate-700">
                Explore events
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-[2px] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                About Us
              </Link>
            </div>
          </div>

          {/* UMDAC Isometric Logo */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md overflow-hidden rounded-xl border-4 border-slate-900 bg-white shadow-[6px_6px_0px_0px_rgba(168,85,247,1)] dark:border-slate-700 dark:bg-slate-800 dark:shadow-[6px_6px_0px_0px_rgba(168,85,247,0.7)]">
              <Image 
                src="/umdac_isometric_logo.jpg" 
                alt="UMDAC Isometric Logo" 
                width={450} 
                height={450} 
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <dt className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Active Members</dt>
          <dd className="mt-2 text-4xl font-black text-indigo-600 dark:text-indigo-400">500+</dd>
        </div>
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <dt className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Practical Workshops</dt>
          <dd className="mt-2 text-4xl font-black text-purple-600 dark:text-purple-400">10+</dd>
        </div>
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <dt className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Collaborative Projects</dt>
          <dd className="mt-2 text-4xl font-black text-pink-600 dark:text-pink-400">20+</dd>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="mt-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">OUR CORE PILLARS</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-5xl">Building Skills, Projects & Connections</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border-2 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-lg font-black text-white dark:border-slate-700">
                {pillar.title.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-xl font-extrabold uppercase text-slate-900 dark:text-white">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mt-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">UPCOMING EVENTS</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-5xl">Opportunities to learn & build</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {(() => {
            const mappedUpcoming = dbEvents
              .filter((e) => !e.is_past)
              .map((e) => {
                const { displayDate } = parseEventDateTime(e.date, e.time_label)
                const isTba = displayDate.toUpperCase() === 'TBA' || e.status === 'upcoming' || e.status === 'tba'
                let badgeStatus: any = 'Open'
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
                const getPriority = (status: string) => {
                  if (status === 'Open' || status === 'Closing Soon') return 0
                  if (status === 'Closed') return 1
                  return 2 // TBA / Upcoming
                }
                const priorityDiff = getPriority(a.status) - getPriority(b.status)
                if (priorityDiff !== 0) return priorityDiff

                if (a.rawDate && b.rawDate && a.status === 'Open' && b.status === 'Open') {
                  const timeA = new Date(a.rawDate).getTime()
                  const timeB = new Date(b.rawDate).getTime()
                  if (!isNaN(timeA) && !isNaN(timeB)) return timeA - timeB
                }
                return 0
              })
              .slice(0, 3)

            const list = isLoading ? fallbackUpcoming : mappedUpcoming
            if (!isLoading && list.length === 0) {
              return (
                <div className="col-span-full rounded-2xl border-2 border-slate-900 bg-white p-8 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No upcoming events currently scheduled.</p>
                </div>
              )
            }
            return list.map((event) => (
              <div key={event.title} className="h-full flex flex-col hover:translate-y-[-4px] transition-transform duration-200">
                <EventCard {...event} />
              </div>
            ))
          })()}
        </div>
      </section>

      {/* Past Events & Write-ups Section */}
      <section className="mt-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">PAST EVENTS & WRITE-UPS</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white md:text-5xl">Looking back at our community journeys</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {(() => {
            const mappedPast = dbEvents
              .filter((e) => e.is_past)
              .slice(0, 3)
              .map((e) => {
                const { displayDate } = parseEventDateTime(e.date, e.time_label)
                return {
                  title: e.title,
                  date: displayDate,
                  type: e.type || 'Event',
                  location: e.location || 'TBA',
                  status: 'Past Event' as any,
                  description: e.description || e.writeup || '',
                  href: `/events/${e.slug || e.event_id}`,
                  imageUrl: e.image_urls?.[0],
                }
              })

            const list = isLoading ? fallbackPast : mappedPast
            if (!isLoading && list.length === 0) {
              return (
                <div className="col-span-full rounded-2xl border-2 border-slate-900 bg-white p-8 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No past events found.</p>
                </div>
              )
            }
            return list.map((event) => (
              <div key={event.title} className="h-full flex flex-col opacity-85 hover:opacity-100 hover:translate-y-[-4px] transition-all duration-200">
                <EventCard {...event} />
              </div>
            ))
          })()}
        </div>
      </section>

      {/* Join Callout Section - Only displayed for unauthenticated visitors */}
      {!user ? (
        <section className="mt-20 rounded-2xl border-4 border-slate-900 bg-slate-950 px-6 py-10 text-white shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] md:px-10 dark:border-slate-800 dark:shadow-[8px_8px_0px_0px_rgba(168,85,247,0.7)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-pink-400">BECOME A MEMBER</p>
              <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">Ready to decode, transform, and excel?</h2>
              <p className="mt-2 text-sm text-slate-400">Join our student community and kickstart your data journey today.</p>
            </div>
            <Link href="/signup" className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-900 active:translate-y-[1px]">
              Join UMDAC
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  )
}
