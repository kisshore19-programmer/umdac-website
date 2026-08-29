'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { EventCard, SectionHeading } from '@/components/umdac-ui'

const featuredEvents = [
  {
    title: 'Data Debut 2026',
    date: '18 October 2026 · 10:00 AM',
    type: 'Workshop',
    location: 'Faculty of Computer Science, UM',
    status: 'Open' as const,
    description: 'A step-by-step introduction to analytics, spreadsheets, and data storytelling for new members.',
    href: '/events/data-debut-2026',
  },
  {
    title: 'AI & Society Panel',
    date: '2 November 2026 · 6:30 PM',
    type: 'Panel',
    location: 'Dewan Perdana',
    status: 'Closing Soon' as const,
    description: 'Hear from practitioners exploring how AI is shaping research, careers, and responsible innovation.',
    href: '/events/ai-society-panel',
  },
  {
    title: 'Project Sprint Night',
    date: '15 November 2026 · 7:00 PM',
    type: 'Hack Night',
    location: 'Innovation Lab',
    status: 'Open' as const,
    description: 'Collaborate, pitch ideas, and learn from members building data and AI projects together.',
    href: '/events/project-sprint-night',
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
    title: 'Data@',
    description: 'Industry conversations, networking, and career exposure that connect club learning with real-world opportunities.',
  },
]

const pastEvents = [
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
      <section className="relative overflow-hidden rounded-2xl border-4 border-slate-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-14">
        {/* Intro WebP Overlay */}
        <div className={`absolute inset-0 z-20 flex items-center justify-center bg-white transition-opacity duration-1000 ${introFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
            <span className="mb-3 inline-flex w-fit items-center rounded bg-slate-100 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              University Malaya Data Analytics Club
            </span>
            <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900 md:text-7xl">
              Decode.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Transform.
              </span>
              <br />
              Excel.
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-slate-600">
              UMDAC empowers over 500+ student developers and data enthusiasts at Universiti Malaya.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events" className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-[2px]">
                Explore events
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-[2px]">
                About Us
              </Link>
            </div>
          </div>

          {/* UMDAC Isometric Logo */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md overflow-hidden rounded-xl border-4 border-slate-900 bg-white shadow-[6px_6px_0px_0px_rgba(168,85,247,1)]">
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
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <dt className="text-xs font-black uppercase tracking-widest text-slate-500">Active Members</dt>
          <dd className="mt-2 text-4xl font-black text-indigo-600">500+</dd>
        </div>
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <dt className="text-xs font-black uppercase tracking-widest text-slate-500">Practical Workshops</dt>
          <dd className="mt-2 text-4xl font-black text-purple-600">30+</dd>
        </div>
        <div className="rounded-xl border-2 border-slate-900 bg-slate-50 p-6 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <dt className="text-xs font-black uppercase tracking-widest text-slate-500">Collaborative Projects</dt>
          <dd className="mt-2 text-4xl font-black text-pink-600">40+</dd>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="mt-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-purple-600">OUR CORE PILLARS</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">Building Skills, Projects & Connections</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border-2 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-lg font-black text-white">
                {pillar.title.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-xl font-extrabold uppercase text-slate-900">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mt-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#be1e2d] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">UPCOMING EVENTS</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">Opportunities to learn & build</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <div key={event.title} className="hover:translate-y-[-4px] transition-transform duration-200">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </section>

      {/* Past Events & Write-ups Section */}
      <section className="mt-20">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-500">PAST EVENTS & WRITE-UPS</p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">Looking back at our community journeys</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <div key={event.title} className="opacity-85 hover:opacity-100 hover:translate-y-[-4px] transition-all duration-200">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </section>

      {/* Join Callout Section */}
      <section className="mt-20 rounded-2xl border-4 border-slate-900 bg-slate-950 px-6 py-10 text-white shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] md:px-10">
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
    </main>
  )
}
