import Link from 'next/link'

const eventDetails: Record<string, { title: string; date: string; time: string; location: string; type: string; seats: string; status: string; description: string; checklist: string[]; cta: string; notice: string }> = {
  'data-debut-2026': {
    title: 'Data Debut 2026',
    date: '18 October 2026',
    time: '10:00 AM – 1:00 PM',
    location: 'Faculty of Computer Science, UM',
    type: 'Workshop',
    seats: '42 seats available',
    status: 'Open',
    description: 'This entry-level workshop introduces students to the fundamentals of analytics with a focus on spreadsheet fluency, exploratory analysis, and communicating insights clearly.',
    checklist: ['Beginner-friendly session', 'Hands-on exercises', 'Data storytelling guidance', 'Certificate of participation'],
    cta: 'Register for Data Debut',
    notice: 'Login is required before a registration can be submitted.',
  },
  'ai-society-panel': {
    title: 'AI & Society Panel',
    date: '2 November 2026',
    time: '6:30 PM – 8:00 PM',
    location: 'Dewan Perdana',
    type: 'Panel',
    seats: '18 spots left',
    status: 'Closing Soon',
    description: 'Join practitioners and campus leaders for a discussion on AI, ethics, readiness, and opportunities across industries and research. The session is designed to introduce students to the broader context behind AI adoption.',
    checklist: ['Industry speakers', 'Q&A session', 'Networking opportunity', 'Career exposure'],
    cta: 'Reserve a seat',
    notice: 'Registration closes soon. Members are encouraged to confirm early.',
  },
  'project-sprint-night': {
    title: 'Project Sprint Night',
    date: '15 November 2026',
    time: '7:00 PM – 9:30 PM',
    location: 'Innovation Lab',
    type: 'Hack Night',
    seats: 'Waitlist open',
    status: 'Full',
    description: 'An evening for building, refining, and validating ideas with a supportive peer environment. Members can work on initial prototypes, validate assumptions, and prepare for upcoming showcases.',
    checklist: ['Team formation', 'Prototype support', 'Mentor feedback', 'Project idea validation'],
    cta: 'Join the waitlist',
    notice: 'This event is currently full, but the waitlist is open for interested members.',
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
