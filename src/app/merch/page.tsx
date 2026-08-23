import { EmptyState, MerchCard, SectionHeading } from '@/components/umdac-ui'

const merchItems = [
  {
    name: 'UMDAC Standard Tee',
    price: 'RM 45',
    status: 'Available' as const,
    description: 'Premium cotton tee with the club logo and data-inspired details for everyday wear.',
  },
  {
    name: 'Data Debut Hoodie',
    price: 'RM 85',
    status: 'Limited' as const,
    description: 'A lightweight fleece hoodie designed for campus life, workshops, and project nights.',
  },
  {
    name: 'UMDAC Notebook',
    price: 'RM 25',
    status: 'Out of stock' as const,
    description: 'A compact field notebook for notes, sketches, and ideas during events and study sessions.',
  },
]

export default function MerchPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <SectionHeading
          eyebrow="Merch"
          title="Club essentials for members and supporters"
          description="Support the club and take home a keepsake that reflects UMDAC’s identity, community, and technical energy."
        />
      </section>

      <section className="mt-20 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Member interest</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Keep an eye out for the next restock.</h2>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Get restock updates
          </button>
        </div>
      </section>

      <section className="mt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {merchItems.map((item) => (
            <MerchCard key={item.name} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <EmptyState
          title="No additional drops announced yet"
          description="New merch drops will appear here as they are released. Follow the club socials to stay updated on stock and restocks."
        />
      </section>
    </main>
  )
}
