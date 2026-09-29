import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Events',
}

export default function AdminEventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
