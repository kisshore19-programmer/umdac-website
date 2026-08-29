import Link from 'next/link'
import { EventCard, RecommendationPanel, SectionHeading } from '@/components/umdac-ui'

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

const recommendations = [
  {
    title: 'Data Debut 2026',
    date: '18 Oct 2026',
    type: 'Workshop',
    reason: 'Based on your interests in analytics and beginner learning',
    href: '/events/data-debut-2026',
  },
  {
    title: 'AI & Society Panel',
    date: '2 Nov 2026',
    type: 'Panel',
    reason: 'Matches your selected interests in AI and future opportunities',
    href: '/events/ai-society-panel',
  },
  {
    title: 'Project Sprint Night',
    date: '15 Nov 2026',
    type: 'Hack Night',
    reason: 'Good next step for members building practical project skills',
    href: '/events/project-sprint-night',
  },
]

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-14">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              University Malaya Data Analytics Club
            </span>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Decode. Transform. Excel.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              UMDAC brings students together to learn, build, and apply data, analytics, and AI through projects, events, and mentorship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Explore events
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                Meet the club
              </Link>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Members</dt>
                <dd className="mt-2 text-2xl font-bold text-slate-900">500+</dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Events</dt>
                <dd className="mt-2 text-2xl font-bold text-slate-900">30+</dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Projects</dt>
                <dd className="mt-2 text-2xl font-bold text-slate-900">40+</dd>
              </div>
            </dl>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-800 to-cyan-500 p-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-100">This semester</p>
              <div className="mt-8 space-y-5">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm text-sky-100">Upcoming</p>
                  <p className="mt-2 text-2xl font-bold">AI for Impact</p>
                  <p className="mt-2 text-sm text-sky-100">18 Oct · 6:00 PM · UM Innovation Hub</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm text-sky-100">Member opportunity</p>
                  <p className="mt-2 text-2xl font-bold">Project teams open</p>
                  <p className="mt-2 text-sm text-sky-100">Apply for hands-on DataDev tracks and mentorship.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Our pillars"
          title="A club built around learning, doing, and connecting"
          description="UMDAC learners grow from the fundamentals into real projects, career opportunities, and meaningful community experiences."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-lg font-bold text-sky-700">
                {pillar.title.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Recommended for you"
          title="Suggestions based on your interests"
          description="This section is designed to accept future recommendation data while remaining clear when personalization is not yet available."
        />
        <RecommendationPanel state="available" items={recommendations} />
      </section>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Featured events"
          title="Opportunities to learn, build, and connect"
          description="From beginner-friendly workshops to expert panels and project nights, members can find the right next step for their growth."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[2rem] border border-slate-200 bg-slate-900 px-6 py-10 text-white md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">For members</p>
            <h2 className="mt-2 text-3xl font-bold">New to UMDAC? Start with the right onboarding.</h2>
          </div>
          <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900">
            Join UMDAC
          </Link>
        </div>
      </section>
    </main>
  )
}
