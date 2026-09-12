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

type EventPageProps = {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params
  const event = eventDetails[id] ?? {
    title: 'Event details',
    date: 'TBA',
    time: 'TBA',
    location: 'TBA',
    type: 'General',
    seats: 'Registration opens soon',
    status: 'Closed',
    description: 'This event is not available yet, but the UI is ready to support the real listing once it is published.',
    checklist: ['Data pending', 'Registration not open', 'Details will be shared soon'],
    cta: 'Check back soon',
    notice: 'Registration for this event has not opened yet.',
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero banner */}
      <div className="overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <div className="h-56 p-6 text-white md:p-10">
          <div className="flex h-full items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded bg-white/15 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white">
                {event.type}
              </span>
              <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
                {event.title}
              </h1>
            </div>
            <span className="shrink-0 rounded border-2 border-white/30 bg-white/15 px-3 py-1.5 text-sm font-extrabold uppercase tracking-wider text-white">
              {event.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

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
        </div>

        {/* Sidebar */}
        <aside className="rounded-2xl border-2 border-slate-900 bg-slate-50 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] h-fit">
          <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">Event details</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Date</dt>
              <dd className="mt-1 font-semibold text-slate-900">{event.date}</dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Time</dt>
              <dd className="mt-1 font-semibold text-slate-900">{event.time}</dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Venue</dt>
              <dd className="mt-1 font-semibold text-slate-900">{event.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Availability</dt>
              <dd className="mt-1 font-semibold text-slate-900">{event.seats}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <button
              id={`event-register-${id}`}
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-px focus:outline-none"
            >
              {event.cta}
            </button>

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
