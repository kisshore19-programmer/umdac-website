'use server'

import { createClient } from '@/lib/supabase/server'
import { applicationSchema, type ApplicationInput } from '@/lib/schemas/application'
import { sendApplicationReceivedEmail } from '@/lib/emails/send'

type ActionResponse = {
  success: boolean
  error?: string
}

export async function applyToEventAction(input: ApplicationInput): Promise<ActionResponse> {
  // Never trust client-side validation alone — re-check here even though
  // the form already validated this with the same schema.
  const parsed = applicationSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: 'Please check your answers and try again.' }
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'You must be logged in to apply.' }
  }

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('title, capacity, status')
    .eq('event_id', parsed.data.eventId)
    .single()

  if (eventError || !event) {
    return { success: false, error: 'This event could not be found.' }
  }

  if (event.status !== 'upcoming') {
    return { success: false, error: 'This event is no longer accepting applications.' }
  }

  if (event.capacity) {
    const { count } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', parsed.data.eventId)

    if (count !== null && count >= event.capacity) {
      return { success: false, error: 'This event is full.' }
    }
  }

  const { error: insertError } = await supabase
    .from('applications')
    .insert({
      event_id: parsed.data.eventId,
      user_id: user.id,
      answers: {
        motivation: parsed.data.motivation,
        availability: parsed.data.availability,
      },
    })

  if (insertError) {
    return { success: false, error: insertError.message }
  }

  const { error: emailError } = await sendApplicationReceivedEmail(
    user.email!,
    user.user_metadata?.full_name ?? 'there',
    event.title ?? 'the event'
  )

  if (emailError) {
    console.error('Application saved, but email failed to send:', emailError)
  }

  return { success: true }
}