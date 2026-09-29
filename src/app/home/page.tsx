import { fetchAdminEventsAction } from '@/app/actions/adminActions'
import { HomeView } from './home-view'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const events = await fetchAdminEventsAction()
  return <HomeView initialEvents={events} />
}
