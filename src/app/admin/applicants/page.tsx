import { createClient } from '@/lib/supabase/server'
import { getAdminApplicants } from '@/lib/supabase/queries/applicants'
import ApplicantTable from '@/components/admin/ApplicantTable'

export default async function ApplicantsPage() {
  const supabase = await createClient()
  const applicants = await getAdminApplicants(supabase)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Applicant Viewer
        </h1>
        <p className="text-sm text-slate-500">
          Review, filter, and export applicant submissions.
        </p>
      </div>

      <ApplicantTable initialApplicants={applicants} />
    </div>
  )
}