import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Explore upcoming workshops, bootcamps, datathons, and past events at UMDAC.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
