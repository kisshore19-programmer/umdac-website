'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logoutAction } from '@/app/actions/auth'

const navItems = [
  { label: 'Overview', href: '/admin' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Merch', href: '/admin/merch' },
  { label: 'Members', href: '/admin/members' },
]

interface AdminSidebarProps {
  adminName?: string
}

export default function AdminSidebar({
  adminName: initialAdminName = 'Administrator',
}: AdminSidebarProps) {
  const pathname = usePathname()
  const [adminName, setAdminName] = useState<string>(initialAdminName)

  useEffect(() => {
    setAdminName(initialAdminName)
  }, [initialAdminName])

  useEffect(() => {
    if (initialAdminName && initialAdminName !== 'Administrator') return

    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const metaName =
          data.user.user_metadata?.full_name || data.user.user_metadata?.name
        if (metaName) {
          setAdminName(metaName)
          return
        }
        supabase
          .from('profiles')
          .select('name')
          .eq('user_id', data.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.name) {
              setAdminName(profile.name)
            } else {
              setAdminName(data.user?.email?.split('@')[0] ?? 'Admin')
            }
          })
      }
    })
  }, [initialAdminName])

  return (
    <aside className="w-64 bg-slate-900 text-white sticky top-[73px] h-[calc(100vh-73px)] p-6 flex flex-col justify-between border-r border-slate-800 shrink-0 overflow-y-auto">
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">UMDAC Admin</h2>
            <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-300 border border-purple-500/30">
              Admin
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Management Portal</p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-6 space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-400">Signed in as</p>
          <p className="text-sm font-bold text-white truncate">
            {adminName}
          </p>
        </div>

        <div className="space-y-2">
          <Link
            href="/"
            className="block w-full text-center rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            ← View Public Site
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 transition hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}