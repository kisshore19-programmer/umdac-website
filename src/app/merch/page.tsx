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
      <section className="flex min-h-[225px] flex-col justify-center overflow-hidden rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] md:min-h-[255px] md:p-10">
        <div className="max-w-2xl">
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
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">
            Available Items
          </h2>
        </div>

        {/* Grid — client component manages modal state */}
        <MerchGrid items={items} />
      </section>

    </main>
  )
}
