'use client'

import { useState, useEffect } from 'react'
import {
  AdminEventRecord,
  ApplicantRecord,
  fetchEventApplicantsAction,
} from '@/app/actions/adminActions'
import { parseEventDateTime } from '@/lib/utils'

type EventRegistrationsViewProps = {
  event: AdminEventRecord | null
  onRefreshEvent?: () => void
}

export function EventRegistrationsView({
  event,
}: EventRegistrationsViewProps) {
  const [applicants, setApplicants] = useState<ApplicantRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
          Select an event from the list on the left to view registered members and export participant lists.
        </p>
      </div>
    )
  }

  const handleExportCSV = () => {
    if (applicants.length === 0) return

    const headers = ['Registration ID', 'Name', 'Email', 'Status', 'Registered At', 'Motivation', 'Availability']
    const rows = applicants.map((app) => [
      app.application_id,
      `"${(app.profiles?.name || 'N/A').replace(/"/g, '""')}"`,
      `"${(app.profiles?.email || 'N/A').replace(/"/g, '""')}"`,
      'Registered',
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
    return name.includes(q) || email.includes(q)
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
            className="px-3 py-1.5 border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>📥</span> Export CSV
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {event.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-bold text-slate-600">
          <span>📅 {parseEventDateTime(event.date, event.time_label).displayDate}</span>
          <span>⏰ {parseEventDateTime(event.date, event.time_label).displayTime}</span>
          <span>📍 {event.location || 'TBA'}</span>
          <span className="text-purple-700 font-black">
            👥 {applicants.length} registered
          </span>
        </div>
      </div>

      {/* If Event uses an External Registration Link */}
      {event.registration_link ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-purple-50/50 border-2 border-dashed border-purple-300 rounded-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-purple-400 bg-white flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_rgba(147,51,234,0.3)]">
            🔗
          </div>
          <div className="max-w-md space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-300">
              External Registration Link
            </span>
            <h3 className="text-lg font-black text-slate-900">
              Registrations Managed Externally
            </h3>
            <p className="text-xs font-medium text-slate-600">
              This event is configured with an external registration form (e.g. Google Form, Luma, Typeform). Participants sign up directly via the link below:
            </p>
          </div>

          <div className="w-full max-w-lg p-3.5 bg-white border-2 border-slate-900 rounded-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-purple-700 truncate select-all">
              {event.registration_link}
            </span>
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase rounded-lg border border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] shrink-0 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Open Form ↗
            </a>
          </div>

          <p className="text-[11px] text-slate-400 font-medium">
            To view participants or submissions, please check your external form / dashboard.
          </p>
        </div>
      ) : (
        <>
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

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-purple-50 text-purple-700 border-2 border-purple-200">
                {filteredApplicants.length} Registered Participant{filteredApplicants.length === 1 ? '' : 's'}
              </span>
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
                      </div>

                      <div className="text-xs font-medium text-slate-500 truncate pl-9">
                        {applicant.profiles?.email || 'No email provided'} • Registered {new Date(applicant.created_at).toLocaleDateString()}
                      </div>

                      {/* Answers if present */}
                      {applicant.answers && (applicant.answers.motivation || applicant.answers.availability) && (
                        <div className="pl-9 pt-1.5 space-y-1 text-xs">
                          {applicant.answers.motivation && (
                            <div className="bg-slate-100/70 p-2 rounded-lg text-slate-700 border border-slate-200">
                              <span className="font-bold text-slate-800">Motivation:</span> {applicant.answers.motivation}
                            </div>
                          )}
                          {applicant.answers.availability && (
                            <div className="bg-slate-100/70 p-2 rounded-lg text-slate-700 border border-slate-200">
                              <span className="font-bold text-slate-800">Availability:</span> {applicant.answers.availability}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Auto-Registered Status Badge */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-[2px_2px_0px_0px_rgba(5,150,105,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Registered
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
