'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

export type MerchItem = {
  merch_id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
}

const WHATSAPP_NUMBER = '60123456789' // TODO: Replace with actual UMDAC WhatsApp number

export function MerchModal({
  item,
  onClose,
}: {
  item: MerchItem
  onClose: () => void
}) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [handleEscape])

  const formattedPrice = `RM ${Number(item.price).toFixed(2)}`

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in purchasing the ${item.name} (${formattedPrice}). Could you share more details?`
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${item.name}`}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-2xl" style={{ animation: 'merch-modal-in 0.18s ease-out both' }}>
        <div className="max-h-[90vh] overflow-y-auto overflow-hidden rounded-2xl border-4 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">

          {/* Image area */}
          <div className="relative h-72 w-full bg-slate-100 sm:h-80">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            ) : (
              /* Gradient placeholder */
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">No image yet</p>
                </div>
              </div>
            )}

            {/* Close button */}
            <button
              id="merch-modal-close"
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition hover:bg-slate-100 active:translate-y-px"
              aria-label="Close modal"
            >
              <svg className="h-4 w-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content area */}
          <div className="p-6 sm:p-8">
            {/* Price */}
            <span className="text-3xl font-black tracking-tight text-slate-900">
              {formattedPrice}
            </span>

            {/* Name */}
            <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-3xl">
              {item.name}
            </h2>

            {/* Description */}
            {item.description && (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            )}

            {/* Divider */}
            <div className="my-6 h-px w-full bg-slate-200" />

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                id={`merch-whatsapp-${item.merch_id}`}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-px"
              >
                <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Continue on WhatsApp
              </a>
              <button
                id="merch-modal-back"
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-900 bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-px sm:flex-initial"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
