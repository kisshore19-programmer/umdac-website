'use server'

import { createClient } from '@/lib/supabase/server'
import { sendApplicationReceivedEmail } from '@/lib/emails/send'
import { revalidatePath } from 'next/cache'

type ActionResponse = {
  success: boolean
  error?: string
  isRegistered?: boolean
}

// 1-Click RSVP Action for logged-in users (no extra forms needed)
export async function registerForEventAction(eventId: number): Promise<ActionResponse> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'You must be logged in to register for events.' }
  }

  // Fetch event details
  const { data: event } = await supabase
    .from('events')
    .select('event_id, title, capacity, status, is_past')
    .eq('event_id', eventId)
    .maybeSingle()

  // Check if event is closed or past
  if (event && (event.is_past || event.status === 'closed' || event.status === 'completed')) {
    return { success: false, error: 'This event is no longer accepting registrations.' }
  }

  // Check if already registered to prevent duplicates
  const { data: existingApps } = await supabase
    .from('applications')
    .select('application_id')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .limit(1)

  if (existingApps && existingApps.length > 0) {
    return { success: true, isRegistered: true }
  }

  // Check capacity if set
  if (event?.capacity) {
    const { count } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)

    if (count !== null && count >= event.capacity) {
      return { success: false, error: 'This event has reached full capacity.' }
    }
  }

  // Insert registration record with immediate 'registered' status
  const { error: insertError } = await supabase
    .from('applications')
    .insert({
      event_id: eventId,
      user_id: user.id,
      status: 'registered',
      answers: {
        registered_via: '1-click registration',
      },
    })

  if (insertError) {
    // If duplicate insert error code
    if (insertError.code === '23505') {
      return { success: true, isRegistered: true }
    }
    return { success: false, error: insertError.message }
  }

  // Attempt sending confirmation email if configured
  if (user.email) {
    try {
      await sendApplicationReceivedEmail(
        user.email,
        user.user_metadata?.full_name ?? user.user_metadata?.name ?? 'Member',
        event?.title ?? 'the event'
      )
    } catch (err) {
      console.warn('Confirmation email could not be delivered:', err)
    }
  }

  revalidatePath('/events')
  revalidatePath(`/events/${eventId}`)
  revalidatePath('/admin/events')
  revalidatePath('/home')
  return { success: true, isRegistered: true }
}

// Check registration status of the current user
export async function checkUserRegistrationAction(eventId: number): Promise<{ isRegistered: boolean; status?: string }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { isRegistered: false }
  }

  const { data } = await supabase
    .from('applications')
    .select('status')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .limit(1)

  if (data && data.length > 0) {
    return { isRegistered: true, status: data[0].status || 'registered' }
  }

  return { isRegistered: false }
}

// Backward-compatibility wrapper for any legacy forms
export async function applyToEventAction(input: { eventId: number; motivation?: string; availability?: string }) {
  return await registerForEventAction(input.eventId)
}
