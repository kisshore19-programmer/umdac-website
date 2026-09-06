import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { MerchGrid } from './merch-grid'
import type { MerchItem } from './merch-modal'

export const metadata: Metadata = {
  title: 'Merch | UMDAC',
  description: "Support the club and take home a keepsake that reflects UMDAC's identity & community.",
}

export default async function MerchPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('merch')
    .select('merch_id, name, description, price, image_url')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  const items: MerchItem[] = (error ? [] : data ?? []).map((row) => ({
    merch_id: row.merch_id,
    name: row.name,
    description: row.description ?? null,
    price: row.price,
    image_url: row.image_url ?? null,
  }))

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Page header — matches home page hero card style */}
      <section className="overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:p-14">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex w-fit items-center rounded bg-white/15 px-2.5 py-1 text-xs font-extrabold uppercase tracking-widest text-white">
            UMDAC Store
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            Our{' '}
            <span className="bg-white bg-clip-text text-transparent drop-shadow">
              Merch.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm font-semibold leading-relaxed text-white/80">
            Support the club and take home a keepsake that reflects UMDAC&apos;s identity &amp; community.
          </p>
        </div>
      </section>

      {/* Section label */}
      <section className="mt-14">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-purple-600">
            AVAILABLE ITEMS
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">
            Rep the club
          </h2>
        </div>

        {/* Grid — client component manages modal state */}
        <MerchGrid items={items} />
      </section>

      {/* Bottom callout */}
      <section className="mt-20 rounded-2xl border-4 border-slate-900 bg-slate-950 px-6 py-10 text-white shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-pink-400">CUSTOM ORDERS</p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Want something bespoke?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Reach out to the committee for bulk orders or custom designs.
            </p>
          </div>
          <a
            id="merch-contact-whatsapp"
            href="https://wa.me/60123456789?text=Hi%20UMDAC%2C%20I%27d%20like%20to%20enquire%20about%20a%20custom%20merch%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition hover:-translate-y-0.5 active:translate-y-px"
          >
            <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contact Us on WhatsApp
          </a>
        </div>
      </section>

    </main>
  )
}
