import { SupabaseClient } from '@supabase/supabase-js'

export interface EventRecord {
  event_id: number
  title: string
  slug: string | null
  description: string | null
  type: string | null
  date: string
  time_label: string | null
  location: string | null
  seats_label: string | null
  capacity: number | null
  status: string
  checklist: string[]
  notice: string | null
  cta_label: string | null
  is_past: boolean
  writeup: string | null
  image_urls: string[]
}

/**
 * Fetch a single event by its slug for the /events/[id] detail page.
 * Returns null if not found.
 */
export async function getEventBySlug(
  supabase: SupabaseClient,
  slug: string
): Promise<EventRecord | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return {
    ...data,
    checklist: Array.isArray(data.checklist) ? data.checklist : [],
    image_urls: Array.isArray(data.image_urls) ? data.image_urls : [],
    is_past: data.is_past ?? false,
  }
}

/**
 * Fetch all upcoming events for the events listing and home page cards.
 */
export async function getUpcomingEvents(supabase: SupabaseClient): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_past', false)
    .order('date', { ascending: true })

  if (error) {
    console.error('Failed to fetch upcoming events:', error.message)
    return []
  }

  return (data ?? []).map((row) => ({
    ...row,
    checklist: Array.isArray(row.checklist) ? row.checklist : [],
    image_urls: Array.isArray(row.image_urls) ? row.image_urls : [],
    is_past: row.is_past ?? false,
  }))
}

/**
 * Fetch all past events for the events listing and home page.
 */
export async function getPastEvents(supabase: SupabaseClient): Promise<EventRecord[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_past', true)
    .order('date', { ascending: false })

  if (error) {
    console.error('Failed to fetch past events:', error.message)
    return []
  }

  return (data ?? []).map((row) => ({
    ...row,
    checklist: Array.isArray(row.checklist) ? row.checklist : [],
    image_urls: Array.isArray(row.image_urls) ? row.image_urls : [],
    is_past: row.is_past ?? false,
  }))
}
