'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { logoutAction } from '@/app/actions/auth'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/merch', label: 'Merch' },
]

interface SiteHeaderProps {
  initialUser?: { id: string; email?: string } | null
  initialUserName?: string | null
  isAdmin?: boolean
}

export function SiteHeader({
  initialUser = null,
  initialUserName = null,
  isAdmin = false,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<{ id: string; email?: string } | null>(initialUser)
  const [userName, setUserName] = useState<string | null>(initialUserName)
  const [adminRole, setAdminRole] = useState(isAdmin)
  const pathname = usePathname()

  // Sync state when props change
  useEffect(() => {
    setUser(initialUser)
    setUserName(initialUserName)
    setAdminRole(isAdmin)
  }, [initialUser, initialUserName, isAdmin])

  // Real-time client auth sync
  useEffect(() => {
    const supabase = createClient()

    async function checkUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      if (currentUser) {
        setUser({ id: currentUser.id, email: currentUser.email })
        const metaName =
          currentUser.user_metadata?.full_name || currentUser.user_metadata?.name
        if (metaName) {
          setUserName(metaName)
        } else if (!userName) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, role')
            .eq('user_id', currentUser.id)
            .single()
          setUserName(profile?.name || currentUser.email?.split('@')[0] || 'Member')
          if (profile?.role === 'admin') setAdminRole(true)
        }
      } else {
        setUser(null)
        setUserName(null)
        setAdminRole(false)
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email })
        const metaName =
          session.user.user_metadata?.full_name || session.user.user_metadata?.name
        if (metaName) {
          setUserName(metaName)
        }
      } else {
        setUser(null)
        setUserName(null)
        setAdminRole(false)
      }
    })

    // If initialUser was not supplied from server, run check
    if (!initialUser) {
      checkUser()
    }

    return () => {
      subscription.unsubscribe()
    }
  }, [initialUser, userName])

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
              className={`text-sm font-medium transition ${
                pathname === item.href ? 'text-[#0284c7]' : 'text-slate-600 hover:text-[#0284c7]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-bold text-slate-800 sm:inline-block">
                Hello, <span className="text-indigo-600 font-extrabold">{userName || 'Member'}</span>!
              </span>

              {adminRole && (
                <Link
                  href="/admin"
                  className="hidden rounded-full border border-purple-300 bg-purple-50 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-purple-700 transition hover:bg-purple-100 sm:inline-flex"
                >
                  Admin
                </Link>
              )}

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-sm"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-50 sm:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#111827] px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none"
              >
                Join now
              </Link>
            </>
          )}

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-[#0284c7] hover:text-[#0284c7] md:hidden focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:ring-offset-2"
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
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  pathname === item.href
                    ? 'bg-sky-50 text-[#0284c7]'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#0284c7]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between px-3 py-1">
                  <span className="text-sm font-bold text-slate-800">
                    Hello, <span className="text-indigo-600 font-extrabold">{userName || 'Member'}</span>!
                  </span>
                  {adminRole && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700"
                    >
                      Admin
                    </Link>
                  )}
                </div>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    onClick={() => setMobileOpen(false)}
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-50 hover:text-[#0284c7]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Join now
                </Link>
              </>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
