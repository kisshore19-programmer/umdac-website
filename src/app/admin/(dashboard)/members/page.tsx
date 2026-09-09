import { createClient } from '@/lib/supabase/server'
import { getAdminMembers } from '@/lib/supabase/queries/members'
import MemberTable from '@/components/admin/MemberTable'

export default async function MembersPage() {
  const supabase = await createClient()
  const members = await getAdminMembers(supabase)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
          Club Members
        </h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          Directory of all registered UMDAC members and their details.
        </p>
      </div>

      <MemberTable initialMembers={members} />
    </div>
  )
}
