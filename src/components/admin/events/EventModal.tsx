'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { AdminEventRecord, CreateEventInput, UpdateEventInput } from '@/app/actions/adminActions'
import { formatMultiDayRange, parseEventDateTime, parseEventNotice, formatEventNotice } from '@/lib/utils'

type EventModalProps = {
  isOpen: boolean
  initialData: AdminEventRecord | null
  onClose: () => void
  onSave: (payload: CreateEventInput | UpdateEventInput) => Promise<void>
  onDelete?: (eventId: number) => Promise<void>
}

export function EventModal({
  isOpen,
  initialData,
  onClose,
  onSave,
  onDelete,
}: EventModalProps) {
  const [formData, setFormData] = useState<CreateEventInput>({
    title: '',
    slug: '',
    type: 'Workshop',
    date: new Date().toISOString().slice(0, 16),
    time_label: '10:00 AM - 1:00 PM MYT',
    location: 'Faculty of Computer Science and Information Technology, UM',
    seats_label: 'Limited to 50 seats',
    capacity: 50,
    status: 'upcoming',
    is_past: false,
    description: '',
    writeup: '',
    notice: 'Registration details and requirements will be confirmed upon RSVP.',
    cta_label: 'Register now',
    checklist: [],
    image_urls: [],
  })

  const [dateMode, setDateMode] = useState<'single' | 'multi' | 'custom'>('single')
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10))
  const [timeText, setTimeText] = useState('10:00 AM - 1:00 PM MYT')
  const [customDateText, setCustomDateText] = useState('')

  const [checklistInput, setChecklistInput] = useState('')
  const [customUrlInput, setCustomUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (initialData) {
      let initialDateStr = ''
      try {
        if (initialData.date && initialData.date !== 'TBA') {
          initialDateStr = new Date(initialData.date).toISOString().slice(0, 10)
        }
      } catch {
        initialDateStr = ''
      }

      if (initialData.time_label && initialData.time_label.includes(' | ')) {
        const parts = initialData.time_label.split(' | ')
        const datePart = parts[0].trim()
        const timePart = parts.slice(1).join(' | ').trim()
        setTimeText(timePart || '10:00 AM - 1:00 PM MYT')
        setStartDate(initialDateStr || new Date().toISOString().slice(0, 10))
        setCustomDateText(datePart)
        if (datePart.includes('&') || datePart.includes('–') || datePart.includes('-') || datePart.includes('and')) {
          setDateMode('multi')
        } else {
          setDateMode('custom')
        }
      } else {
        setStartDate(initialDateStr || new Date().toISOString().slice(0, 10))
        setTimeText(initialData.time_label || '10:00 AM - 1:00 PM MYT')
        setCustomDateText('')
        setDateMode('single')
      }

      const { noticeText, registrationLink } = parseEventNotice(initialData.notice)
      const effectiveLink = initialData.registration_link || registrationLink

      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        type: initialData.type || 'Workshop',
        date: initialData.date || new Date().toISOString(),
        time_label: initialData.time_label || '10:00 AM - 1:00 PM MYT',
        location: initialData.location || '',
        seats_label: initialData.seats_label || '',
        capacity: initialData.capacity ?? undefined,
        status: initialData.status || 'upcoming',
        is_past: Boolean(initialData.is_past),
        description: initialData.description || '',
        writeup: initialData.writeup || '',
        notice: noticeText || '',
        cta_label: initialData.cta_label || 'Register now',
        checklist: Array.isArray(initialData.checklist) ? initialData.checklist : [],
        image_urls: Array.isArray(initialData.image_urls) ? initialData.image_urls : [],
        registration_link: effectiveLink || null,
        registration_type: effectiveLink ? 'external' : (initialData.registration_type || 'internal'),
      })
      setChecklistInput(
        Array.isArray(initialData.checklist) ? initialData.checklist.join('\n') : ''
      )
    } else {
      setStartDate(new Date().toISOString().slice(0, 10))
      setEndDate(new Date(Date.now() + 86400000).toISOString().slice(0, 10))
      setTimeText('10:00 AM - 1:00 PM MYT')
      setCustomDateText('')
      setDateMode('single')
      setFormData({
        title: '',
        slug: '',
        type: 'Workshop',
        date: new Date().toISOString(),
        time_label: '10:00 AM - 1:00 PM MYT',
        location: 'Faculty of Computer Science and Information Technology, UM',
        seats_label: 'Limited to 50 seats',
        capacity: 50,
        status: 'upcoming',
        is_past: false,
        description: '',
        writeup: '',
        notice: 'Registration details and requirements will be confirmed upon RSVP.',
        cta_label: 'Register now',
        checklist: [],
        image_urls: [],
        registration_link: null,
        registration_type: 'internal',
      })
      setChecklistInput('')
    }
    setCustomUrlInput('')
    setShowUrlInput(false)
    setIsConfirmDeleteOpen(false)
    setErrorMsg('')
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      if (!initialData) {
        const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return { ...prev, title: val, slug: autoSlug }
      }
      return { ...prev, title: val }
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setErrorMsg('')

    try {
      const uploadData = new FormData()
      for (let i = 0; i < files.length; i++) {
        uploadData.append('files', files[i])
      }

      const res = await fetch('/api/admin/upload-event-image', {
        method: 'POST',
        body: uploadData,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image(s)')
      }

      if (data.urls && Array.isArray(data.urls)) {
        setFormData((prev) => ({
          ...prev,
          image_urls: [...(prev.image_urls || []), ...data.urls],
        }))
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Image upload failed.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: (prev.image_urls || []).filter((_, idx) => idx !== indexToRemove),
    }))
  }

  const handleAddCustomUrl = () => {
    if (!customUrlInput.trim()) return
    setFormData((prev) => ({
      ...prev,
      image_urls: [...(prev.image_urls || []), customUrlInput.trim()],
    }))
    setCustomUrlInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setErrorMsg('Event title is required.')
      return
    }

    setIsSubmitting(true)
    setErrorMsg('')

    const parsedChecklist = checklistInput
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)

    let finalDate = new Date().toISOString()
    let finalTimeLabel = timeText.trim() || '10:00 AM - 1:00 PM MYT'

    if (dateMode === 'multi') {
      const rangeLabel = formatMultiDayRange(startDate, endDate)
      finalDate = startDate ? new Date(startDate).toISOString() : new Date().toISOString()
      finalTimeLabel = `${rangeLabel} | ${timeText.trim() || '10:00 AM - 1:00 PM MYT'}`
    } else if (dateMode === 'custom') {
      finalDate = startDate ? new Date(startDate).toISOString() : new Date().toISOString()
      const customDateClean = customDateText.trim() || 'TBA'
      if (customDateClean.toUpperCase() === 'TBA') {
        finalTimeLabel = 'TBA | TBA'
      } else {
        finalTimeLabel = `${customDateClean} | ${timeText.trim() || '10:00 AM - 1:00 PM MYT'}`
      }
    } else {
      finalDate = startDate ? new Date(startDate).toISOString() : new Date().toISOString()
      finalTimeLabel = timeText.trim() || '10:00 AM - 1:00 PM MYT'
    }

    const finalNotice = formatEventNotice(
      formData.notice,
      formData.registration_type === 'external' ? formData.registration_link : null
    )

    try {
      await onSave({
        ...formData,
        date: finalDate,
        time_label: finalTimeLabel,
        notice: finalNotice,
        checklist: parsedChecklist,
        image_urls: formData.image_urls || [],
        capacity: formData.capacity ? Number(formData.capacity) : null,
      })
      onClose()
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save event.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!initialData?.event_id || !onDelete) return
    setIsSubmitting(true)
    setErrorMsg('')
    try {
      await onDelete(initialData.event_id)
      onClose()
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete event.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">
              {initialData ? 'Edit Event' : 'Create Event'}
            </span>
            <h2 className="text-2xl font-black uppercase text-slate-900">
              {initialData ? initialData.title : 'New Event'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border-2 border-slate-900 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl border-2 border-red-500 bg-red-50 text-red-700 text-sm font-bold">
            {errorMsg}
          </div>
        )}

        {isConfirmDeleteOpen ? (
          <div className="p-6 border-2 border-red-400 bg-red-50 rounded-xl space-y-4">
            <h3 className="text-lg font-black uppercase text-red-700">Delete this event?</h3>
            <p className="text-sm font-medium text-red-900">
              Are you sure you want to delete <strong>{initialData?.title}</strong>? All registered applicant records for this event will also be deleted. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-2 border-2 border-slate-900 bg-white font-bold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="px-4 py-2 border-2 border-red-700 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
              >
                {isSubmitting ? 'Deleting...' : 'Yes, Delete Event'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Startup Bootcamp 2025"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Slug (URL identifier) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. startup-bootcamp"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>
            </div>

            {/* Type, Status, & Past Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Type / Category
                </label>
                <select
                  value={formData.type || 'General'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Datathon">Datathon</option>
                  <option value="Career Fair">Career Fair</option>
                  <option value="Networking">Networking</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Registration Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                >
                  <option value="active">🟢 Registration Open</option>
                  <option value="closed">🔴 Registration Closed</option>
                  <option value="upcoming">⏳ Upcoming (TBA)</option>
                  <option value="completed">🏁 Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Past Event?
                </label>
                <div className="flex items-center gap-3 pt-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_past}
                      onChange={(e) => setFormData({ ...formData, is_past: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 border-2 border-slate-900"></div>
                  </label>
                  <span className="text-xs font-bold text-slate-700">
                    {formData.is_past ? 'Yes (Past Event)' : 'No (Active/Upcoming)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Date & Schedule */}
            <div className="border-2 border-slate-900 rounded-xl p-4 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="block text-xs font-black uppercase text-slate-800">
                  Event Schedule & Date(s) *
                </label>
                <div className="inline-flex rounded-lg border-2 border-slate-900 p-0.5 bg-white text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setDateMode('single')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      dateMode === 'single'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Single Day
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateMode('multi')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      dateMode === 'multi'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Multi-Day (e.g. 23 & 24 Feb)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDateMode('custom')}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      dateMode === 'custom'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Custom / TBA
                  </button>
                </div>
              </div>

              {dateMode === 'single' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Time Label
                    </label>
                    <input
                      type="text"
                      value={timeText}
                      onChange={(e) => setTimeText(e.target.value)}
                      placeholder="e.g. 10:00 AM - 1:00 PM MYT"
                      className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                    />
                  </div>
                </div>
              )}

              {dateMode === 'multi' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Daily Time / Hours
                      </label>
                      <input
                        type="text"
                        value={timeText}
                        onChange={(e) => setTimeText(e.target.value)}
                        placeholder="e.g. 9:00 AM - 6:00 PM MYT"
                        className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-xs font-bold text-purple-900">
                    <span>📅 Formatted Date Display:</span>
                    <span className="font-black bg-purple-200/80 px-2 py-0.5 rounded text-purple-950">
                      {formatMultiDayRange(startDate, endDate)}
                    </span>
                  </div>
                </div>
              )}

              {dateMode === 'custom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Custom Date Display
                    </label>
                    <input
                      type="text"
                      required
                      value={customDateText}
                      onChange={(e) => setCustomDateText(e.target.value)}
                      placeholder="e.g. 23 and 24 Feb, or TBA"
                      className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Time Label
                    </label>
                    <input
                      type="text"
                      value={timeText}
                      onChange={(e) => setTimeText(e.target.value)}
                      placeholder="e.g. 10:00 AM - 1:00 PM MYT"
                      className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium bg-white"
                    />
                  </div>
                </div>
              )}
            </div>



            {/* Registration Method Selector */}
            <div className="border-2 border-slate-900 rounded-xl p-4 bg-purple-50/40 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-800">
                    Registration Method *
                  </label>
                  <p className="text-[11px] font-medium text-slate-500">
                    Choose whether members register directly on the website or via an external link (Google Form, Luma, etc.)
                  </p>
                </div>
                <div className="inline-flex rounded-lg border-2 border-slate-900 p-0.5 bg-white text-xs font-bold">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        registration_type: 'internal',
                        registration_link: null,
                        cta_label: prev.cta_label === 'Register on External Form' ? 'Register now' : prev.cta_label,
                      }))
                    }
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      (formData.registration_type || 'internal') === 'internal' && !formData.registration_link
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    👥 On Website (Admin Views Participants)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        registration_type: 'external',
                        registration_link: prev.registration_link || '',
                        cta_label: prev.cta_label === 'Register now' ? 'Register on External Form' : prev.cta_label,
                      }))
                    }
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      formData.registration_type === 'external' || Boolean(formData.registration_link)
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🔗 External Registration Link
                  </button>
                </div>
              </div>

              {(formData.registration_type === 'external' || Boolean(formData.registration_link)) && (
                <div className="pt-2 border-t border-purple-200 space-y-2">
                  <label className="block text-xs font-bold text-purple-950">
                    External Registration URL * (Google Form / Luma / Eventbrite / Typeform)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.registration_link || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registration_link: e.target.value,
                        registration_type: 'external',
                      })
                    }
                    placeholder="https://forms.gle/... or https://lu.ma/..."
                    className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono bg-white"
                  />
                  <p className="text-[11px] text-purple-800 font-medium">
                    When set, clicking register on the website redirects users directly to this link. Participant tracking will happen on that external form.
                  </p>
                </div>
              )}
            </div>

            {/* Location & CTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. FSKTM The Cube, UM"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.cta_label || ''}
                  onChange={(e) => setFormData({ ...formData, cta_label: e.target.value })}
                  placeholder="e.g. Register now"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                Short Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief summary of what this event is about..."
                className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            </div>

            {/* Writeup - ONLY for Past Events */}
            {formData.is_past && (
              <div className="p-4 bg-purple-50/50 border-2 border-purple-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase text-purple-900">
                    Event Write-Up (Full article / recap / details)
                  </label>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-purple-200 text-purple-800 px-2 py-0.5 rounded-md">
                    Past Events Only
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.writeup || ''}
                  onChange={(e) => setFormData({ ...formData, writeup: e.target.value })}
                  placeholder="Detailed event write-up, achievements, outcomes, recap story..."
                  className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium font-sans bg-white"
                />
              </div>
            )}

            {/* Checklist items */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                Checklist / What to expect (One line per bullet point)
              </label>
              <textarea
                rows={3}
                value={checklistInput}
                onChange={(e) => setChecklistInput(e.target.value)}
                placeholder="Bring your laptop&#10;Hands-on mentorship sessions&#10;Certificate of participation provided"
                className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium font-mono text-xs"
              />
            </div>

            {/* Gallery Images Upload & Manager */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black uppercase text-slate-700">
                  Gallery Images ({formData.image_urls?.length || 0})
                </label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-xs font-bold text-purple-600 hover:text-purple-800 hover:underline"
                >
                  {showUrlInput ? 'Hide URL input' : '+ Add by external URL'}
                </button>
              </div>

              {/* Upload Dropzone / Button */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100/80 transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="event-image-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="event-image-upload"
                  className={`inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-900 bg-white font-bold rounded-lg cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-50 transition-all text-xs text-slate-800 ${
                    isUploading ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                      Uploading Images...
                    </>
                  ) : (
                    <>
                      <span>📸</span>
                      <span>Upload / Choose Images</span>
                    </>
                  )}
                </label>
                <p className="text-[11px] text-slate-500 mt-2 font-medium">
                  Supports multiple PNG, JPG, WebP. Images will be stored in <code>/public/events/</code>
                </p>
              </div>

              {/* Manual URL input fallback */}
              {showUrlInput && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/... or /events/my-pic.jpg"
                    className="flex-1 px-3 py-2 text-xs border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomUrl}
                    className="px-3 py-2 border-2 border-slate-900 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Gallery Image Previews */}
              {formData.image_urls && formData.image_urls.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
                  {formData.image_urls.map((url, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-lg border-2 border-slate-900 overflow-hidden bg-slate-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    >
                      <img
                        src={url}
                        alt={`Event gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback on broken image
                          ;(e.target as HTMLElement).setAttribute('src', '/umdac_isometric_logo.jpg')
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        title="Remove image"
                        className="absolute top-1 right-1 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full border border-slate-900 flex items-center justify-center text-xs font-black shadow transition-transform group-hover:scale-110"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-slate-950/75 px-1 py-0.5 text-[9px] text-white font-mono truncate text-center">
                        {url.split('/').pop()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notice / Footer message */}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                Notice / Requirements message
              </label>
              <input
                type="text"
                value={formData.notice || ''}
                onChange={(e) => setFormData({ ...formData, notice: e.target.value })}
                placeholder="e.g. Registration closes 24 hours prior to the session."
                className="w-full px-3 py-2 text-sm border-2 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between border-t-2 border-slate-100 pt-5 mt-6">
              {initialData && onDelete ? (
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border-2 border-red-600 bg-red-50 text-red-700 font-bold rounded-xl hover:bg-red-100 transition-colors text-sm"
                >
                  Delete Event
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 border-2 border-slate-900 bg-white font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 border-2 border-slate-900 bg-purple-600 text-white font-black uppercase tracking-wider rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:bg-purple-700 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all text-sm"
                >
                  {isSubmitting ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
