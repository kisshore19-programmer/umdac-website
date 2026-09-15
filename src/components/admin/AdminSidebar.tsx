'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Overview', href: '/admin' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Merch', href: '/admin/merch' },
  { label: 'Applicants', href: '/admin/applicants' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight">UMDAC Admin</h2>
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
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-8">
        <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
            MA
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-white">Maddy Admin</p>
            <p className="truncate text-xs text-slate-400">Committee</p>
          </div>
        </div>
      </div>
    </aside>
  )
}