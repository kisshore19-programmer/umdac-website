import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { createClient } from '@/lib/supabase/server'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'UMDAC | Decode. Transform. Excel.',
  description: 'University Malaya Data Analytics Club community website for events, learning, and opportunities.',
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/merch', label: 'Merch' },
]

const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('umdac-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark) || (stored === 'system' && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let initialUserName: string | null = null
  let isAdmin = false

  if (user) {
    const metaName =
      user.user_metadata?.full_name || user.user_metadata?.name
    if (metaName) {
      initialUserName = metaName
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('user_id', user.id)
      .single()

    if (!initialUserName && profile?.name) {
      initialUserName = profile.name
    }
    if (!initialUserName) {
      initialUserName = user.email?.split('@')[0] || 'Member'
    }
    isAdmin = profile?.role === 'admin'
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased font-sans transition-colors duration-200">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <div>
              <SiteHeader
                initialUser={user ? { id: user.id, email: user.email } : null}
                initialUserName={initialUserName}
                isAdmin={isAdmin}
              />
              {children}
            </div>

            <footer className="border-t border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
                <div>
                  <Image
                    src="/umdac_logo.png"
                    alt="UMDAC Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain dark:brightness-110"
                  />
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Faculty of Computer Science and Information Technology<br/>Universiti Malaya<br/>50603 Kuala Lumpur, Malaysia
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Explore</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="transition hover:text-sky-700 dark:hover:text-sky-400">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Connect</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <li>
                      <a
                        href="https://www.instagram.com/um_dac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/umdac/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:umdac@um.edu.my"
                        className="inline-flex items-center gap-2 transition hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                      >
                        <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.25 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        umdac@um.edu.my
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
