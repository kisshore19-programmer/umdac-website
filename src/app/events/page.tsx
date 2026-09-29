import type { Metadata } from 'next'
import { fetchAdminEventsAction } from '@/app/actions/adminActions'
import { EventsView } from './events-view'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Events',
  description: 'Explore upcoming workshops, bootcamps, datathons, and past events at UMDAC.',
}

export default async function EventsPage() {
  const events = await fetchAdminEventsAction()
  return <EventsView initialEvents={events} />
}
