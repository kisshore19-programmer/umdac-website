'use client'

import { MerchRecord } from '@/lib/supabase/queries/merch'

type MerchCardProps = {
  item: MerchRecord
  onDetailsClick: () => void
}

export function MerchCard({ item, onDetailsClick }: MerchCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-[#0B0F19] shadow-xl">
      {/* Top Banner / Image Area */}
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
            {/* Shopping bag icon */}
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        )}

        {!item.is_active && (
          <span className="absolute right-3 top-3 rounded-md bg-red-500/90 px-2 py-0.5 text-xs font-medium text-white shadow">
            Inactive
          </span>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col gap-4 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
          {item.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-white">
            RM {Number(item.price).toFixed(2)}
          </span>

          <button
            type="button"
            onClick={onDetailsClick}
            className="rounded-lg border border-purple-500 px-4 py-2 text-xs font-semibold text-purple-400 transition-colors hover:bg-purple-600 hover:text-white"
          >
            HAVE A LOOK &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}