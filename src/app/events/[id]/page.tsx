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
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="h-56 bg-gradient-to-br from-sky-600 via-cyan-500 to-indigo-600 p-6 text-white">
          <div className="flex h-full items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">{event.type}</p>
              <h1 className="mt-3 text-3xl font-bold md:text-5xl">{event.title}</h1>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-sky-50">
              {event.status}
            </span>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Registration status</p>
              <p className="mt-2 text-base text-slate-700">{event.notice}</p>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-600">{event.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">What to expect</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                {event.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">Event details</h2>
            <dl className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <dt className="font-semibold text-slate-900">Date</dt>
                <dd className="mt-1">{event.date}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Time</dt>
                <dd className="mt-1">{event.time}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Venue</dt>
                <dd className="mt-1">{event.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Availability</dt>
                <dd className="mt-1">{event.seats}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              {event.cta}
            </button>

            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Save for later
            </button>

            <Link href="/events" className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Back to events
            </Link>
          </aside>
        </div>
      </div>
    </main>
  )
}
