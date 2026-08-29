import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Rubik, DM_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rubik.variable} ${dmSans.variable} h-full bg-slate-50 text-slate-900`}>
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased font-sans">
        <div className="min-h-screen">
          <SiteHeader />
          {children}

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
              <div>
                <Image
                  src="/umdac_logo.png"
                  alt="UMDAC Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  Faculty of Computer Science and Information Technology<br/>Universiti Malaya<br/>50603 Kuala Lumpur, Malaysia
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Explore</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="transition hover:text-sky-700">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Connect</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>Instagram</li>
                  <li>LinkedIn</li>
                  <li>hello@umdac.org</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
