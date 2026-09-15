export default function AdminEventsPage() {
  const events = [
    { name: 'Startup Bootcamp', status: 'Open', date: 'TBA' },
    { name: 'Datathon', status: 'Open', date: 'TBA' },
    { name: 'DataFair', status: 'Open', date: 'TBA' },
    { name: 'Data Debut 2025', status: 'Past Event', date: '12 Oct 2025' },
    { name: 'UMDAC Datathon 2025', status: 'Past Event', date: '5 Dec 2025' },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Events</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search events by name..."
          className="w-full max-w-md rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <select className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500">
          <option>Status : All</option>
          <option>Status : Open</option>
          <option>Status : Past Event</option>
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#e9d5ff]">
              <tr className="border-b border-slate-200 text-purple-900">
                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 font-semibold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{event.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                      event.status === 'Open' ? 'bg-white border-green-500 text-green-600' :
                      event.status === 'Closing Soon' ? 'bg-white border-amber-500 text-amber-600' :
                      event.status === 'Past Event' ? 'bg-white border-slate-400 text-slate-500' :
                      'bg-white border-slate-400 text-slate-500'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{event.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="font-medium text-purple-400 hover:text-purple-600">Edit</button>
                      <button className="font-medium text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-white">
          <span className="text-xs text-slate-500">Showing 5 of 5 events</span>
          <div className="flex gap-2">
            <button className="rounded-full border border-slate-300 px-4 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">Prev</button>
            <button className="rounded-full border border-slate-300 px-4 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}