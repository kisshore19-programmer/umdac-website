import Link from 'next/link'

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Stories' },
  { href: '/merch', label: 'Merch' },
  { href: '/faq', label: 'FAQ' },
]

export type EventStatus = 'Open' | 'Closing Soon' | 'Full' | 'Closed' | 'Past Event'
export type RecommendationState = 'available' | 'empty' | 'logged-out' | 'loading' | 'error'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  )
}

export function StatusBadge({ status }: { status: EventStatus }) {
  const classes: Record<EventStatus, string> = {
    Open: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    'Closing Soon': 'bg-amber-100 text-amber-700 ring-amber-200',
    Full: 'bg-rose-100 text-rose-700 ring-rose-200',
    Closed: 'bg-slate-200 text-slate-700 ring-slate-300',
    'Past Event': 'bg-sky-100 text-sky-700 ring-sky-200',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes[status]}`}>
      {status}
    </span>
  )
}

export function EventCard({
  title,
  date,
  type,
  location,
  status,
  description,
  href,
}: {
  title: string
  date: string
  type: string
  location: string
  status: EventStatus
  description: string
  href: string
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg">
      <div className="h-40 bg-gradient-to-br from-sky-600 via-cyan-500 to-indigo-600 p-5 text-white">
        <div className="flex h-full items-start justify-between gap-3">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-50">
            {type}
          </span>
          <StatusBadge status={status} />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-medium text-sky-700">{date}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="text-sm text-slate-600">{location}</p>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          View details
        </Link>
      </div>
    </article>
  )
}

export function CommitteeCard({
  name,
  role,
  department,
  quote,
  onSelect,
  isSelected = false,
}: {
  name: string
  role: string
  department: string
  quote: string
  onSelect: () => void
  isSelected?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`group w-full rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
        isSelected
          ? 'border-sky-300 bg-sky-50 shadow-md'
          : 'border-slate-200 bg-white hover:border-sky-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold ${isSelected ? 'from-sky-600 to-cyan-500 text-white' : 'from-sky-100 to-indigo-100 text-sky-700'}`}>
          {name
            .split(' ')
            .slice(0, 2)
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">{name}</p>
          <p className="text-sm font-medium text-sky-700">{role}</p>
          <p className="text-sm text-slate-500">{department}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">“{quote}”</p>
    </button>
  )
}

export function MerchCard({
  name,
  price,
  status,
  description,
}: {
  name: string
  price: string
  status: 'Available' | 'Limited' | 'Out of stock'
  description: string
}) {
  return (
    <div className="relative pt-4">
      {/* Floating status badge */}
      {status === 'Limited' && (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <span className="rounded-full bg-orange-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-md">
            Limited Stock
          </span>
        </div>
      )}
      {status === 'Out of stock' && (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
          <span className="rounded-full bg-slate-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-md">
            Out of Stock
          </span>
        </div>
      )}

      <article className="overflow-hidden rounded-2xl shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
        {/* Product image area */}
        <div className="flex h-44 items-center justify-center bg-slate-100">
          <span className="text-base font-medium text-slate-400">product</span>
        </div>

        {/* Info area */}
        <div className="bg-black px-5 py-4">
          <h3 className="text-sm font-bold text-white">{name}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-black text-white">{price}</span>
            <button
              type="button"
              className="text-xs font-semibold text-purple-400 transition hover:text-purple-300 focus:outline-none"
            >
              Reserve →
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-sky-200 open:shadow-md">
      <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900 marker:hidden">
        <span className="flex items-center justify-between gap-4">
          {question}
          <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600 transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>
      <p className="mt-4 text-base leading-7 text-slate-600">{answer}</p>
    </details>
  )
}

export function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

export function RecommendationCard({
  title,
  date,
  type,
  reason,
  href,
}: {
  title: string
  date: string
  type: string
  reason?: string
  href: string
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700">
          {type}
        </span>
        <span className="text-xs font-medium text-slate-500">{date}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      {reason ? <p className="mt-3 text-sm text-sky-700">{reason}</p> : null}
      <Link
        href={href}
        className="mt-5 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        View event
      </Link>
    </article>
  )
}

export function RecommendationPanel({
  state,
  items,
}: {
  state: RecommendationState
  items?: Array<{
    title: string
    date: string
    type: string
    reason?: string
    href: string
  }>
}) {
  if (state === 'loading') {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`loading-${index}`} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-100 p-5">
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="mt-4 h-5 w-2/3 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-full rounded bg-slate-200" />
            <div className="mt-5 h-10 w-28 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    )
  }

  if (state === 'logged-out') {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-900">Log in to see recommendations</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Your personalized event suggestions will appear here once your account is connected.
        </p>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <EmptyState
        title="We’re still learning what you enjoy"
        description="Explore a few events to help us suggest the best next opportunities for you."
      />
    )
  }

  if (state === 'error') {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">Recommendation update</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">We couldn’t load suggestions right now</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Please refresh or browse upcoming events while the recommendation feed reconnects.</p>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="No recommendations yet"
        description="Your activity feed will show upcoming events that match your interests and participation history once available."
      />
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <RecommendationCard key={item.title} {...item} />
      ))}
    </div>
  )
}

export function BlogCard({
  title,
  category,
  date,
  excerpt,
  href,
}: {
  title: string
  category: string
  date: string
  excerpt: string
  href: string
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="h-40 bg-gradient-to-br from-slate-900 via-sky-700 to-cyan-500 p-5 text-white">
        <div className="flex h-full items-end justify-between">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-50">
            {category}
          </span>
          <span className="text-xs text-sky-100">{date}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Read story
        </Link>
      </div>
    </article>
  )
}

export function ProjectCard({
  title,
  description,
  tags,
  href,
}: {
  title: string
  description: string
  tags: string[]
  href: string
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700">
          Featured
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={href}
        className="mt-5 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        View project
      </Link>
    </article>
  )
}
