import { createClient } from '@/lib/supabase/server'
import { ApplicantTable } from '@/components/admin/ApplicantTable'

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  // If your Next.js version complains searchParams isn't a Promise,
  // remove the Promise<> type and the `await` above — that's just a
  // version difference, not a mistake.

  const { data: events } = await supabase
    .from('events')
    .select('event_id, title')
    .order('date', { ascending: false })

  const selectedEventId = params.event ? Number(params.event) : events?.[0]?.event_id

  let applicants: any[] = []
  if (selectedEventId) {
    const { data } = await supabase
      .from('applications')
      .select('application_id, status, answers, created_at, profiles(name, email)')
      .eq('event_id', selectedEventId)
    applicants = data ?? []
  }

  return (
    <div>
      <h1>Applicants</h1>

        <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {events?.map(e => (
          <a key={e.event_id} href={`/admin/applicants?event=${e.event_id}`}>
            {e.title}
          </a>
        ))}
      </nav>

      <ApplicantTable applicants={applicants} />
    </div>
  )
}