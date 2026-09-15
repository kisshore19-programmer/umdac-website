'use client'

import { useState, useEffect } from 'react'
import {
  AdminEventRecord,
  CreateEventInput,
  UpdateEventInput,
  fetchAdminEventsAction,
  createEventAction,
  updateEventAction,
  deleteEventAction,
} from '@/app/actions/adminActions'
import { EventModal } from '@/components/admin/events/EventModal'
import { EventRegistrationsView } from '@/components/admin/events/EventRegistrationsView'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEventRecord[]>([])
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<AdminEventRecord | null>(null)
  const [searchFilter, setSearchFilter] = useState('')
  const [tabFilter, setTabFilter] = useState<'all' | 'upcoming' | 'past'>('all')

  const loadEvents = async () => {
    try {
      const data = await fetchAdminEventsAction()
      setEvents(data)
      if (data.length > 0 && selectedEventId === null) {
        setSelectedEventId(data[0].event_id)
      } else if (selectedEventId !== null && !data.some((e) => e.event_id === selectedEventId)) {
        setSelectedEventId(data[0]?.event_id ?? null)
      }
    } catch (err) {
      console.error('Failed to load admin events:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const selectedEvent = events.find((e) => e.event_id === selectedEventId) || null

  const handleOpenCreate = () => {
    setEditingEvent(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (event: AdminEventRecord, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingEvent(event)
    setModalOpen(true)
  }

  const handleSaveEvent = async (payload: CreateEventInput | UpdateEventInput) => {
    if (editingEvent) {
      const res = await updateEventAction(editingEvent.event_id, payload as UpdateEventInput)
      if (!res.success) throw new Error(res.error || 'Failed to update event')
    } else {
      const res = await createEventAction(payload as CreateEventInput)
      if (!res.success) throw new Error(res.error || 'Failed to create event')
    }
    await loadEvents()
  }

  const handleDeleteEvent = async (eventId: number) => {
    const res = await deleteEventAction(eventId)
    if (!res.success) throw new Error(res.error || 'Failed to delete event')
    await loadEvents()
  }

  const filteredEvents = events.filter((ev) => {
    const q = searchFilter.toLowerCase()
    const matchesQuery =
      ev.title.toLowerCase().includes(q) ||
      (ev.type && ev.type.toLowerCase().includes(q)) ||
      (ev.location && ev.location.toLowerCase().includes(q))

    const matchesTab =
      tabFilter === 'all'
        ? true
        : tabFilter === 'past'
        ? Boolean(ev.is_past)
        : !ev.is_past

    return matchesQuery && matchesTab
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900/10 pb-5">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-purple-600">
            Control Center
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">
            Events Management
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            Manage workshops, hackathons, past event galleries, and inspect registered member applications.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-slate-900 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all shrink-0"
        >
          <span className="text-base leading-none">+</span>
          Create New Event
        </button>
      </div>

      {/* Main Vertical Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Events Vertical Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search and Tabs */}
          <div className="bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-xl p-3 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events by title or type..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>

            <div className="flex items-center gap-2">
              {(['all', 'upcoming', 'past'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTabFilter(tab)}
                  className={`flex-1 py-1.5 text-xs font-black uppercase rounded-lg border-2 transition-all ${
                    tabFilter === tab
                      ? 'border-slate-900 bg-purple-600 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Events Feed */}
          <div className="space-y-3 overflow-y-auto max-h-[750px] pr-1">
            {isLoading ? (
              <div className="p-8 text-center bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-400 text-sm animate-pulse">
                Loading events list...
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="p-8 text-center bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-400 text-sm">
                No events found matching your filter.
              </div>
            ) : (
              filteredEvents.map((event) => {
                const isSelected = event.event_id === selectedEventId
                return (
                  <div
                    key={event.event_id}
                    onClick={() => setSelectedEventId(event.event_id)}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/60 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] ring-2 ring-purple-600/20'
                        : 'border-slate-900 bg-white hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                          {event.type || 'Event'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                            event.is_past
                              ? 'bg-slate-100 text-slate-600 border-slate-300'
                              : event.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {event.is_past ? 'Past' : event.status}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleOpenEdit(event, e)}
                        className="px-2 py-0.5 text-xs font-black uppercase text-purple-700 hover:text-purple-900 border border-purple-300 hover:border-purple-600 bg-white rounded-md transition-colors"
                      >
                        Edit ⚙️
                      </button>
                    </div>

                    <h3 className="font-black text-slate-900 text-base mt-2 line-clamp-1">
                      {event.title}
                    </h3>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 text-xs font-semibold text-slate-500">
                      <span>
                        📅 {event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}
                      </span>
                      <span className="font-black text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md border border-purple-200">
                        👥 {event.registrations_count} Registrations
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Event & Registrations Management (7 cols) */}
        <div className="lg:col-span-7 sticky top-6">
          <EventRegistrationsView
            event={selectedEvent}
            onRefreshEvent={loadEvents}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <EventModal
        isOpen={modalOpen}
        initialData={editingEvent}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
}
