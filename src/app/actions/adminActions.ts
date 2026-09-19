'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  getAdminMerch,
  getMerchById,
  type MerchRecord
} from '@/lib/supabase/queries/merch'
import { type EventRecord } from '@/lib/supabase/queries/events'
import { parseEventNotice } from '@/lib/utils'

export type CreateMerchInput = Omit<MerchRecord, 'merch_id' | 'created_at' | 'updated_at'>
export type UpdateMerchInput = Partial<CreateMerchInput>

// READ: Fetch all for admin
export async function fetchAdminMerchAction() {
  const supabase = await createClient()
  return await getAdminMerch(supabase)
}

// READ: Fetch single by id
export async function fetchMerchDetailsAction(merchId: number) {
  const supabase = await createClient()
  return await getMerchById(supabase, merchId)
}

// CREATE MERCH
export async function createMerchAction(payload: CreateMerchInput) {
  const supabase = await createClient()

  const insertPayload = {
    ...payload,
    image_url: payload.image_url?.trim() === '' ? null : payload.image_url,
    description: payload.description?.trim() === '' ? null : payload.description,
    price: Number(payload.price) || 0,
  }

  let { data, error } = await supabase
    .from('merch')
    .insert([insertPayload])
    .select()
    .single()

  if (error && error.message?.includes('seq')) {
    // Retry with explicit ID fallback if sequence permission is denied
    const { data: maxRow } = await supabase.from('merch').select('merch_id').order('merch_id', { ascending: false }).limit(1)
    const nextId = (maxRow?.[0]?.merch_id || 0) + 1
    const retry = await supabase.from('merch').insert([{ ...insertPayload, merch_id: nextId }]).select().single()
    data = retry.data
    error = retry.error
  }

  if (error) {
    console.error('[DB INSERT ERROR]:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/merch')
  return { success: true, data: data as MerchRecord }
}

// UPDATE MERCH
export async function updateMerchAction(merchId: number, updates: UpdateMerchInput) {
  const supabase = await createClient()

  const updatePayload = {
    ...updates,
    image_url: updates.image_url?.trim() === '' ? null : updates.image_url,
    description: updates.description?.trim() === '' ? null : updates.description,
    price: updates.price !== undefined ? Number(updates.price) : undefined,
  }

  const { data, error } = await supabase
    .from('merch')
    .update(updatePayload)
    .eq('merch_id', merchId)
    .select()
    .single()

  if (error) {
    console.error('Failed to update merch:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/merch')
  return { success: true, data: data as MerchRecord }
}

// DELETE MERCH
export async function deleteMerchAction(merchId: number) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('merch')
    .delete()
    .eq('merch_id', merchId)

  if (error) {
    console.error('Failed to delete merch:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/merch')
  return { success: true }
}

// ==========================================
// EVENTS MANAGEMENT ACTIONS
// ==========================================

export type CreateEventInput = {
  title: string
  slug: string
  description?: string | null
  type?: string | null
  date: string
  time_label?: string | null
  location?: string | null
  seats_label?: string | null
  capacity?: number | null
  status?: string
  checklist?: string[]
  notice?: string | null
  cta_label?: string | null
  is_past?: boolean
  writeup?: string | null
  image_urls?: string[]
  registration_link?: string | null
  registration_type?: string | null
}

export type UpdateEventInput = Partial<CreateEventInput>

export type AdminEventRecord = EventRecord & {
  registrations_count: number
}

export type ApplicantRecord = {
  application_id: number
  event_id: number
  user_id: string
  status: string
  created_at: string
  answers: { motivation?: string; availability?: string } | null
  profiles: { name: string; email: string } | null
}

const DEFAULT_FALLBACK_EVENTS: AdminEventRecord[] = [
  {
    event_id: 1,
    title: 'Startup Bootcamp',
    slug: 'startup-bootcamp',
    description: 'Learn how to build and scale your ideas in our intensive startup bootcamp designed for student founders.',
    type: 'Bootcamp',
    date: '2026-12-31T00:00:00.000Z',
    time_label: '10:00 AM - 1:00 PM MYT',
    location: 'Faculty of Computer Science and Information Technology, UM',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Beginner-friendly session', 'Hands-on exercises', 'Mentorship opportunity', 'Certificate of participation'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
    registrations_count: 0,
  },
  {
    event_id: 2,
    title: 'Datathon',
    slug: 'datathon',
    description: 'A challenge to solve real-world problems using data analytics, machine learning, and storytelling.',
    type: 'Competition',
    date: '2026-12-31T00:00:00.000Z',
    time_label: '9:00 AM - 6:00 PM MYT',
    location: 'Dewan Tunku Canselor',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Team formation', 'Industry speakers', 'Mentorship opportunity', 'Cash prizes'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
    registrations_count: 0,
  },
  {
    event_id: 3,
    title: 'DataFair',
    slug: 'data-fair',
    description: 'Connect with industry professionals, explore career opportunities, and discover the latest in data technology.',
    type: 'Fair',
    date: '2026-12-31T00:00:00.000Z',
    time_label: '10:00 AM - 4:00 PM MYT',
    location: 'FSKTM The Cube, UM',
    seats_label: 'Open',
    capacity: null,
    status: 'upcoming',
    checklist: ['Networking opportunity', 'Career exposure', 'Industry speakers', 'Resume review'],
    notice: 'Registration details will be announced soon. Stay tuned to our social media.',
    cta_label: 'Register now',
    is_past: false,
    writeup: null,
    image_urls: [],
    registrations_count: 0,
  },
  {
    event_id: 10,
    title: 'Data Debut 2025',
    slug: 'data-debut-2025',
    description: 'Our annual introductory workshop introducing 300+ students to data analytics paths and tools.',
    type: 'Workshop',
    date: '2025-10-12T09:00:00.000Z',
    time_label: '9:00 AM – 5:00 PM MYT',
    location: 'Faculty of Computer Science, UM',
    seats_label: 'Event Concluded',
    capacity: null,
    status: 'Past Event',
    checklist: [],
    notice: '',
    cta_label: 'View gallery',
    is_past: true,
    writeup: 'Our annual introductory workshop introduced 300+ students across faculties to core data analytics workflows, spreadsheet fluency, and industry pathways.',
    image_urls: [],
    registrations_count: 0,
  },
  {
    event_id: 11,
    title: 'UMDAC Datathon 2025',
    slug: 'datathon-2025',
    description: 'A 48-hour challenge solving real-world mobility and energy forecasting problems with industry mentors.',
    type: 'Competition',
    date: '2025-12-05T08:00:00.000Z',
    time_label: '8:00 AM – 8:00 PM MYT (48 Hours)',
    location: 'Dewan Tunku Canselor',
    seats_label: 'Event Concluded',
    capacity: null,
    status: 'Past Event',
    checklist: [],
    notice: '',
    cta_label: 'View gallery',
    is_past: true,
    writeup: 'Over 40 teams tackled complex mobility and sustainable energy datasets over a 48-hour sprint, presenting predictive models to panels of academic and enterprise judges.',
    image_urls: [],
    registrations_count: 0,
  },
]

function cleanEventPayload(data: any) {
  const allowed = [
    'title',
    'slug',
    'description',
    'type',
    'date',
    'time_label',
    'location',
    'seats_label',
    'capacity',
    'status',
    'checklist',
    'notice',
    'cta_label',
    'is_past',
    'writeup',
    'image_urls',
  ]
  const clean: Record<string, any> = {}
  for (const key of allowed) {
    if (data[key] !== undefined) {
      clean[key] = data[key]
    }
  }
  if (clean.slug) {
    clean.slug = clean.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '')
  }
  if (clean.capacity !== undefined) {
    clean.capacity = clean.capacity ? Number(clean.capacity) : null
  }
  if (clean.checklist !== undefined && !Array.isArray(clean.checklist)) {
    clean.checklist = []
  }
  if (clean.image_urls !== undefined && !Array.isArray(clean.image_urls)) {
    clean.image_urls = []
  }
  return clean
}

async function getNextEventId(supabase: any): Promise<number> {
  const { data } = await supabase
    .from('events')
    .select('event_id')
    .order('event_id', { ascending: false })
    .limit(1)

  const maxId = data && data.length > 0 ? Number(data[0].event_id) || 0 : 0
  return Math.max(maxId, 20) + 1
}

// READ: Fetch all events with registered member counts (merges DB events with default roster)
export async function fetchAdminEventsAction(): Promise<AdminEventRecord[]> {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  // Count distinct user registrations per event
  const { data: appCounts } = await supabase
    .from('applications')
    .select('event_id, user_id')

  const countMap: Record<number, number> = {}
  const seenUsersPerEvent = new Set<string>()
  appCounts?.forEach((app) => {
    const key = `${app.event_id}_${app.user_id}`
    if (!seenUsersPerEvent.has(key)) {
      seenUsersPerEvent.add(key)
      countMap[app.event_id] = (countMap[app.event_id] || 0) + 1
    }
  })

  const dbEvents: AdminEventRecord[] = (events || []).map((e) => {
    const { noticeText, registrationLink } = parseEventNotice(e.notice)
    return {
      ...e,
      notice: noticeText,
      registration_link: e.registration_link || registrationLink,
      checklist: Array.isArray(e.checklist) ? e.checklist : [],
      image_urls: Array.isArray(e.image_urls) ? e.image_urls : [],
      is_past: Boolean(e.is_past),
      registrations_count: countMap[e.event_id] || 0,
    }
  })

  return dbEvents
}

// READ: Fetch all registered members for a specific event
export async function fetchEventApplicantsAction(eventId: number): Promise<ApplicantRecord[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('applications')
    .select('application_id, event_id, user_id, status, created_at, answers, profiles(name, email)')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch event applicants:', error.message)
    return []
  }

  // Deduplicate by user_id to prevent any duplicate listings in dashboard
  const seen = new Set<string>()
  const uniqueApplicants: ApplicantRecord[] = []
  for (const app of (data as any) || []) {
    const uid = app.user_id || `app_${app.application_id}`
    if (!seen.has(uid)) {
      seen.add(uid)
      uniqueApplicants.push(app)
    }
  }

  return uniqueApplicants
}

// CREATE EVENT
export async function createEventAction(payload: CreateEventInput) {
  const supabase = await createClient()

  const rawSlug = payload.slug?.trim() || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const slug = rawSlug || `event-${Date.now()}`

  const cleaned = cleanEventPayload(payload)
  const insertPayload = {
    ...cleaned,
    title: payload.title.trim(),
    slug,
    description: payload.description?.trim() || null,
    type: payload.type || 'General',
    date: payload.date || new Date().toISOString(),
    time_label: payload.time_label || '10:00 AM - 1:00 PM MYT',
    location: payload.location || 'Faculty of Computer Science and Information Technology, UM',
    seats_label: payload.seats_label || 'Limited seating',
    capacity: payload.capacity ? Number(payload.capacity) : null,
    status: payload.status || 'upcoming',
    checklist: payload.checklist || [],
    notice: payload.notice || 'Registration details and requirements will be confirmed upon RSVP.',
    cta_label: payload.cta_label || 'Register now',
    is_past: Boolean(payload.is_past),
    writeup: payload.writeup || null,
    image_urls: payload.image_urls || [],
  }

  let { data, error } = await supabase
    .from('events')
    .insert([insertPayload])
    .select()
    .single()

  // If permission denied for sequence, retry by providing explicit event_id
  if (error && (error.message?.includes('seq') || error.message?.includes('permission'))) {
    const nextId = await getNextEventId(supabase)
    const retry = await supabase
      .from('events')
      .insert([{ ...insertPayload, event_id: nextId }])
      .select()
      .single()
    data = retry.data
    error = retry.error
  }

  if (error) {
    console.error('Create event error:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/events')
  revalidatePath('/events')
  revalidatePath('/home')
  return { success: true, data: data as EventRecord }
}

// UPDATE EVENT
export async function updateEventAction(eventId: number, updates: UpdateEventInput) {
  const supabase = await createClient()
  const payload = cleanEventPayload(updates)

  // 1. Try to update existing record by event_id
  const { data: updateData, error: updateError } = await supabase
    .from('events')
    .update(payload)
    .eq('event_id', eventId)
    .select()

  if (updateError) {
    console.error('Update event error:', updateError.message)
    return { success: false, error: updateError.message }
  }

  // 2. If no rows were updated (it was a fallback item with mock ID not in DB),
  // insert it into Supabase as a new persistent record!
  if (!updateData || updateData.length === 0) {
    const fallback = DEFAULT_FALLBACK_EVENTS.find((e) => e.event_id === eventId)
    const seedBase = fallback ? cleanEventPayload(fallback) : {}

    const rawSlug = payload.slug || fallback?.slug || updates.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `event-${Date.now()}`
    const insertPayload = {
      ...seedBase,
      ...payload,
      title: payload.title || fallback?.title || 'Event',
      slug: rawSlug,
      date: payload.date || fallback?.date || new Date().toISOString(),
      is_past: payload.is_past !== undefined ? payload.is_past : (fallback?.is_past ?? false),
    }

    let { error: insertError } = await supabase
      .from('events')
      .insert([insertPayload])

    // Fallback if sequence permission denied: provide explicit event_id
    if (insertError && (insertError.message?.includes('seq') || insertError.message?.includes('permission'))) {
      const nextId = await getNextEventId(supabase)
      const retry = await supabase
        .from('events')
        .insert([{ ...insertPayload, event_id: nextId }])
      insertError = retry.error
    }

    if (insertError) {
      console.error('Fallback seed insert error:', insertError.message)
      return { success: false, error: insertError.message }
    }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/events')
  revalidatePath('/events')
  revalidatePath('/home')
  return { success: true }
}

// DELETE EVENT
export async function deleteEventAction(eventId: number, slug?: string) {
  const supabase = await createClient()

  // Clean up applications for this event if any
  await supabase.from('applications').delete().eq('event_id', eventId)

  let deleteQuery = supabase.from('events').delete().eq('event_id', eventId)
  if (slug) {
    deleteQuery = supabase.from('events').delete().or(`event_id.eq.${eventId},slug.eq.${slug}`)
  }

  const { error } = await deleteQuery

  if (error) {
    console.error('Delete event error:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/events')
  revalidatePath('/events')
  revalidatePath('/home')
  return { success: true }
}

// UPDATE APPLICANT STATUS
export async function updateApplicantStatusAction(applicationId: number, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('application_id', applicationId)

  if (error) {
    console.error('Update applicant status error:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/events')
  return { success: true }
}
