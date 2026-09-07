'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MerchModal, type MerchItem } from './merch-modal'

function MerchCard({
  item,
  onHaveALook,
}: {
  item: MerchItem
  onHaveALook: () => void
}) {
  const formattedPrice = `RM ${Number(item.price).toFixed(2)}`

  return (
    <div className="group relative">
      <article className="overflow-hidden rounded-2xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
        {/* Image area */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-slate-950 px-5 py-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
              {item.description}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-black tracking-tight text-white">
              {formattedPrice}
            </span>
            <button
              id={`merch-have-a-look-${item.merch_id}`}
              type="button"
              onClick={onHaveALook}
              className="rounded-lg border-2 border-purple-500 bg-transparent px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-purple-400 transition hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Have a Look →
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

function EmptyMerchState() {
  return (
    <div className="col-span-full">
      <div className="rounded-2xl border-4 border-dashed border-slate-300 bg-white p-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-black uppercase tracking-tight text-slate-900">
          No merch yet
        </h3>
        <p className="mt-3 mx-auto max-w-sm text-sm leading-relaxed text-slate-500">
          We&apos;re cooking up something special. Check back soon for exclusive UMDAC merchandise!
        </p>
      </div>
    </div>
  )
}

export function MerchGrid({ items }: { items: MerchItem[] }) {
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null)

  return (
    <>
      <div className="grid gap-10 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <EmptyMerchState />
        ) : (
          items.map((item) => (
            <MerchCard
              key={item.merch_id}
              item={item}
              onHaveALook={() => setSelectedItem(item)}
            />
          ))
        )}
      </div>

      {selectedItem && (
        <MerchModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  )
}
