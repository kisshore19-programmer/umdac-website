import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { fetchAdminEventsAction, AdminEventRecord } from '@/app/actions/adminActions'
import { getAdminMerch, MerchRecord } from '@/lib/supabase/queries/merch'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  // 1. Fetch current logged-in admin user info
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const metaName = user?.user_metadata?.full_name || user?.user_metadata?.name
  const { data: profile } = user
    ? await supabase.from('profiles').select('name').eq('user_id', user.id).single()
    : { data: null }

  const adminName =
    metaName || profile?.name || user?.email?.split('@')[0] || 'Administrator'

  // 2. Fetch events with registered participant counts
  let events: AdminEventRecord[] = []
  try {
    events = await fetchAdminEventsAction()
  } catch (err) {
    console.error('Failed to load events for overview:', err)
  }

  // 3. Fetch merchandise catalog
  let merchList: MerchRecord[] = []
  try {
    merchList = await getAdminMerch(supabase)
  } catch (err) {
    console.error('Failed to load merch for overview:', err)
  }

  // 4. Fetch total registered club members
  let membersCount = 0
  try {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
    membersCount = count || 0
  } catch (err) {
    console.error('Failed to count members:', err)
  }

  // Metrics calculations
  const upcomingEvents = events.filter((e) => !e.is_past)
  const pastEvents = events.filter((e) => e.is_past)
  const totalRegistrations = events.reduce(
    (sum, e) => sum + (e.registrations_count || 0),
    0
  )
  const upcomingRegistrations = upcomingEvents.reduce(
    (sum, e) => sum + (e.registrations_count || 0),
    0
  )

  const availableMerch = merchList.filter((m) => m.is_active)
  const outOfStockMerchCount = merchList.filter((m) => !m.is_active).length

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            Control Center Overview
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Welcome, {adminName}!
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Summary of upcoming events participant numbers, merchandise availability, and member activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase rounded-lg shadow transition"
          >
            <span>+</span> Manage Events
          </Link>
          <Link
            href="/admin/merch"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-lg shadow transition"
          >
            <span>+</span> Manage Merch
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Upcoming Events */}
        <Link
          href="/admin/events"
          className="group flex flex-col justify-between rounded-2xl bg-[#f3e8ff] p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-800">
                Upcoming Events
              </span>
              <span className="text-lg">📅</span>
            </div>
            <p className="mt-3 text-5xl font-black text-purple-950">
              {upcomingEvents.length}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold">
            <span className="text-purple-700">
              {events.length} total events
            </span>
            <span className="text-purple-600 group-hover:translate-x-0.5 transition-transform">
              View all →
            </span>
          </div>
        </Link>

        {/* Card 2: Upcoming Participants */}
        <Link
          href="/admin/events"
          className="group flex flex-col justify-between rounded-2xl bg-[#f3e8ff] p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-800">
                Participants (Upcoming)
              </span>
              <span className="text-lg">👥</span>
            </div>
            <p className="mt-3 text-5xl font-black text-purple-950">
              {upcomingRegistrations}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold">
            <span className="text-purple-700">
              {totalRegistrations} total registrations
            </span>
            <span className="text-purple-600 group-hover:translate-x-0.5 transition-transform">
              Inspect →
            </span>
          </div>
        </Link>

        {/* Card 3: Merch Available */}
        <Link
          href="/admin/merch"
          className="group flex flex-col justify-between rounded-2xl bg-[#f3e8ff] p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-800">
                Merch Available
              </span>
              <span className="text-lg">👕</span>
            </div>
            <p className="mt-3 text-5xl font-black text-purple-950">
              {availableMerch.length}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold">
            <span className="text-purple-700">
              {outOfStockMerchCount > 0
                ? `${outOfStockMerchCount} out of stock`
                : `${merchList.length} items cataloged`}
            </span>
            <span className="text-purple-600 group-hover:translate-x-0.5 transition-transform">
              Catalog →
            </span>
          </div>
        </Link>

        {/* Card 4: Registered Members */}
        <Link
          href="/admin/members"
          className="group flex flex-col justify-between rounded-2xl bg-[#f3e8ff] p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-800">
                Registered Members
              </span>
              <span className="text-lg">🎓</span>
            </div>
            <p className="mt-3 text-5xl font-black text-purple-950">
              {membersCount}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold">
            <span className="text-purple-700">UMDAC community</span>
            <span className="text-purple-600 group-hover:translate-x-0.5 transition-transform">
              Members →
            </span>
          </div>
        </Link>
      </div>

      {/* Two Column Section: Events Breakdown & Merch Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Upcoming Events with Participant Numbers */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Upcoming Events & Participant Numbers
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Live participant counts from member applications
              </p>
            </div>
            <Link
              href="/admin/events"
              className="text-xs font-bold text-purple-600 hover:text-purple-800"
            >
              View all ({events.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-3">Event</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Participants</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {upcomingEvents.length === 0 && pastEvents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400 font-medium">
                      No events registered yet.
                    </td>
                  </tr>
                ) : (
                  (upcomingEvents.length > 0 ? upcomingEvents : pastEvents.slice(0, 5)).map((ev) => {
                    const displayDate = ev.date
                      ? new Date(ev.date).toLocaleDateString(undefined, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'TBA'

                    return (
                      <tr key={ev.event_id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 line-clamp-1">{ev.title}</p>
                          <span className="inline-block mt-0.5 text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                            {ev.type || 'Event'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600 whitespace-nowrap">
                          {displayDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                            <span>👥</span>
                            <span>{ev.registrations_count}</span>
                            {ev.capacity ? (
                              <span className="text-[11px] text-purple-600 font-normal">
                                / {ev.capacity}
                              </span>
                            ) : null}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                              ev.is_past
                                ? 'bg-slate-100 text-slate-600 border-slate-300'
                                : ev.status === 'active' || ev.status === 'upcoming'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {ev.is_past ? 'Past Event' : ev.status || 'Upcoming'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <Link
                            href="/admin/events"
                            className="text-xs font-bold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-md transition"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Merchandise Available Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Merch Available</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {availableMerch.length} items currently live
              </p>
            </div>
            <Link
              href="/admin/merch"
              className="text-xs font-bold text-purple-600 hover:text-purple-800"
            >
              Manage →
            </Link>
          </div>

          <div className="p-4 space-y-3">
            {merchList.length === 0 ? (
              <p className="text-center py-6 text-xs text-slate-400 font-medium">
                No merchandise listed yet.
              </p>
            ) : (
              merchList.slice(0, 5).map((item) => (
                <div
                  key={item.merch_id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-base shrink-0 border border-purple-200 overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>👕</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-purple-700">
                        RM {Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      item.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {item.is_active ? 'In Stock' : 'Inactive'}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <Link
              href="/admin/merch"
              className="inline-flex items-center justify-center w-full py-2 text-xs font-bold text-purple-700 bg-white border border-purple-200 rounded-lg shadow-sm hover:bg-purple-50 transition"
            >
              View Full Merch Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* Developer Notes (For Team) */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm text-sm text-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="font-bold flex items-center gap-2">
            <span>ℹ️</span> Developer Notes (For Team)
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Admin Login credentials: <code className="bg-blue-100 px-1.5 py-0.5 rounded font-bold text-blue-900">admin@gmail.com</code> | Password: <code className="bg-blue-100 px-1.5 py-0.5 rounded font-bold text-blue-900">Testadmin123</code>
          </p>
        </div>
        <Link
          href="/admin/login"
          className="text-xs font-bold text-blue-900 bg-white border border-blue-200 px-3 py-1.5 rounded-md hover:bg-blue-100 transition whitespace-nowrap self-start sm:self-auto"
        >
          Login Page
        </Link>
      </div>
    </div>
  )
}