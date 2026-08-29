'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/merch', label: 'Merch' },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="UMDAC home">
          <Image
            src="/umdac_logo.png"
            alt="UMDAC Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Join now
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-sky-300 hover:text-sky-700 md:hidden focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            {mobileOpen ? '×' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav aria-label="Mobile navigation" className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-sky-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-700"
            >
              Login
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
