import AdminSidebar from '@/components/admin/AdminSidebar'
import { createClient } from '@/lib/supabase/server'
import { isUserAdmin } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const isAdmin = await isUserAdmin(user.id)
  if (!isAdmin) {
    redirect('/home')
  }

  const metaName = user.user_metadata?.full_name || user.user_metadata?.name
  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('user_id', user.id)
    .single()

  const adminName =
    metaName || profile?.name || user.email?.split('@')[0] || 'Administrator'

  return (
    <div className="flex min-h-[calc(100vh-73px)] bg-slate-50">
      <AdminSidebar adminName={adminName} />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
