import Link from 'next/link'

export default function AdminPage() {
  const recentEvents = [
    { name: 'Startup Bootcamp', status: 'Open', date: 'TBA' },
    { name: 'Datathon', status: 'Open', date: 'TBA' },
    { name: 'DataFair', status: 'Open', date: 'TBA' },
    { name: 'Data Debut 2025', status: 'Past Event', date: '12 Oct 2025' },
    { name: 'UMDAC Datathon 2025', status: 'Past Event', date: '5 Dec 2025' },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, Maddy!</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Events */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f3e8ff] p-8 shadow-sm">
          <p className="text-lg font-semibold text-purple-900">Total Events</p>
          <p className="mt-2 text-6xl font-bold text-purple-950">5</p>
          <div className="mt-4 rounded-full bg-white px-4 py-1 text-xs font-medium text-green-600 border border-green-200">
            + 2 this week
          </div>
        </div>

        {/* Merch Items */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f3e8ff] p-8 shadow-sm">
          <p className="text-lg font-semibold text-purple-900">Merch Items</p>
          <p className="mt-2 text-6xl font-bold text-purple-950">5</p>
          <div className="mt-4 rounded-full bg-white px-4 py-1 text-xs font-medium text-red-600 border border-red-200">
            2 out of stock
          </div>
        </div>

        {/* Applicants */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f3e8ff] p-8 shadow-sm">
          <p className="text-lg font-semibold text-purple-900">Applicants</p>
          <p className="mt-2 text-6xl font-bold text-purple-950">142</p>
          <div className="mt-4 rounded-full bg-white px-4 py-1 text-xs font-medium text-blue-600 border border-blue-200">
            +57 today
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mt-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Recent Events</h2>
          <Link href="/admin/events" className="text-sm font-medium text-slate-500 hover:text-slate-900">
            view all
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-medium uppercase tracking-wider">Name</th>
                <th className="pb-3 font-medium uppercase tracking-wider">Status</th>
                <th className="pb-3 font-medium uppercase tracking-wider">Date</th>
                <th className="pb-3 font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentEvents.map((event, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-medium text-slate-900">{event.name}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      event.status === 'Open' ? 'bg-green-50 text-green-700' :
                      event.status === 'Closing Soon' ? 'bg-amber-50 text-amber-700' :
                      event.status === 'Past Event' ? 'bg-slate-100 text-slate-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600">{event.date}</td>
                  <td className="py-4">
                    <button className="font-medium text-purple-600 hover:text-purple-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm text-sm text-blue-800">
        <p className="font-semibold mb-1">Developer Notes (For Team)</p>
        <p>Admin Login credentials: <span className="font-medium">admin@gmail.com</span> | Password: <span className="font-medium">Testadmin123</span></p>
      </div>
    </div>
  )
}