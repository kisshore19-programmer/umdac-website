'use client'

import { useState, useEffect } from 'react'
import {
  AdminEventRecord,
  ApplicantRecord,
  fetchEventApplicantsAction,
  updateApplicantStatusAction,
} from '@/app/actions/adminActions'

type EventRegistrationsViewProps = {
  event: AdminEventRecord | null
  onRefreshEvent?: () => void
}

export function EventRegistrationsView({
  event,
  onRefreshEvent,
}: EventRegistrationsViewProps) {
  const [applicants, setApplicants] = useState<ApplicantRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!event) {
      setApplicants([])
      return
    }

    const currentEventId = event.event_id
    let isMounted = true
    async function loadApplicants() {
      setIsLoading(true)
      setErrorMsg('')
      try {
        const data = await fetchEventApplicantsAction(currentEventId)
        if (isMounted) {
          setApplicants(data)
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMsg(err.message || 'Failed to load registrants.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadApplicants()
    return () => {
      isMounted = false
    }
  }, [event?.event_id])

  if (!event) {
    return (
      <div className="h-full min-h-[450px] flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] rounded-2xl text-center">
        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-2xl text-slate-400 mb-3">
          📋
        </div>
        <h3 className="text-lg font-black uppercase text-slate-800">No Event Selected</h3>
        <p className="text-sm font-medium text-slate-500 max-w-sm mt-1">
          Select an event from the list on the left to view registered members, application answers, and manage attendance status.
        </p>
      </div>
    )
  }

  const handleStatusChange = async (applicationId: number, nextStatus: string) => {
    setUpdatingId(applicationId)
    try {
      const res = await updateApplicantStatusAction(applicationId, nextStatus)
      if (res.success) {
        setApplicants((prev) =>
          prev.map((app) =>
            app.application_id === applicationId ? { ...app, status: nextStatus } : app
          )
        )
        onRefreshEvent?.()
      } else {
        alert('Failed to update status')
      }
    } catch (err) {
      console.error(err)
      alert('Error updating status')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleExportCSV = () => {
    if (applicants.length === 0) return

    const headers = ['Application ID', 'Name', 'Email', 'Status', 'Registered At', 'Motivation', 'Availability']
    const rows = applicants.map((app) => [
      app.application_id,
      `"${(app.profiles?.name || 'N/A').replace(/"/g, '""')}"`,
      `"${(app.profiles?.email || 'N/A').replace(/"/g, '""')}"`,
      app.status,
      new Date(app.created_at).toLocaleString(),
      `"${(app.answers?.motivation || '').replace(/"/g, '""')}"`,
      `"${(app.answers?.availability || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${event.slug || 'event'}-registrations.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredApplicants = applicants.filter((app) => {
    const name = (app.profiles?.name || '').toLowerCase()
    const email = (app.profiles?.email || '').toLowerCase()
    const q = searchQuery.toLowerCase()
    const matchesSearch = name.includes(q) || email.includes(q)
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-6 flex flex-col min-h-[600px]">
      {/* Event Header Banner */}
      <div className="border-b-2 border-slate-900 pb-5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-300">
              {event.type}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                event.is_past
                  ? 'bg-slate-100 text-slate-700 border-slate-300'
                  : event.status === 'active'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
            >
              {event.is_past ? 'Past Event' : event.status}
            </span>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={applicants.length === 0}
            className="px-3 py-1.5 border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>📥</span> Export CSV
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {event.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-bold text-slate-600">
          <span>📅 {event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}</span>
          <span>⏰ {event.time_label || 'TBA'}</span>
          <span>📍 {event.location || 'TBA'}</span>
          <span className="text-purple-700 font-black">
            👥 {applicants.length} registered {event.capacity ? `/ ${event.capacity} cap` : ''}
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by member name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border-2 border-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['all', 'pending', 'accepted', 'rejected'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors border-2 ${
                statusFilter === filter
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Registrations List */}
      <div className="flex-1 overflow-y-auto max-h-[500px] border-2 border-slate-100 rounded-xl">
        {isLoading ? (
          <div className="p-8 text-center text-sm font-bold text-slate-500 animate-pulse">
            Loading registered members...
          </div>
        ) : errorMsg ? (
          <div className="p-4 bg-red-50 text-red-700 text-xs font-bold border-b border-red-200">
            {errorMsg}
          </div>
        ) : filteredApplicants.length === 0 ? (
          <div className="p-8 text-center text-sm font-bold text-slate-400">
            {applicants.length === 0
              ? 'No members have registered for this event yet.'
              : 'No registrations match your search filter.'}
          </div>
        ) : (
          <div className="divide-y-2 divide-slate-100">
            {filteredApplicants.map((applicant) => (
              <div
                key={applicant.application_id}
                className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Member Info */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-purple-100 border border-purple-300 text-purple-800 font-black text-xs flex items-center justify-center shrink-0">
                      {(applicant.profiles?.name || 'U').charAt(0).toUpperCase()}
                    </span>
                    <span className="font-bold text-slate-900 text-sm truncate">
                      {applicant.profiles?.name || 'Anonymous User'}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                        applicant.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : applicant.status === 'rejected'
                          ? 'bg-red-50 text-red-700 border-red-300'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-slate-500 truncate pl-9">
                    {applicant.profiles?.email || 'No email provided'} • Applied {new Date(applicant.created_at).toLocaleDateString()}
                  </div>

                  {/* Answers if present */}
                  {applicant.answers && (
                    <div className="pl-9 pt-1.5 space-y-1 text-xs">
                      {applicant.answers.motivation && (
                        <div className="bg-slate-100/70 p-2 rounded-lg text-slate-700 border border-slate-200">
                          <span className="font-bold text-slate-800">Motivation:</span> {applicant.answers.motivation}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    disabled={updatingId === applicant.application_id || applicant.status === 'accepted'}
                    onClick={() => handleStatusChange(applicant.application_id, 'accepted')}
                    className="px-2.5 py-1 text-xs font-black uppercase rounded-lg border border-slate-900 bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-40 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === applicant.application_id || applicant.status === 'rejected'}
                    onClick={() => handleStatusChange(applicant.application_id, 'rejected')}
                    className="px-2.5 py-1 text-xs font-black uppercase rounded-lg border border-slate-900 bg-red-500 hover:bg-red-600 text-white disabled:opacity-40 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === applicant.application_id || applicant.status === 'pending'}
                    onClick={() => handleStatusChange(applicant.application_id, 'pending')}
                    className="px-2 py-1 text-xs font-bold uppercase rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-all"
                  >
                    Pending
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
