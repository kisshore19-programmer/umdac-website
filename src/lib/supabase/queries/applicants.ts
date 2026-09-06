import { SupabaseClient } from '@supabase/supabase-js'

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected'

export interface ApplicantProfile {
  name: string | null
  email: string | null
  university: string | null
  faculty: string | null
  major: string | null
  year_of_study: number | null
}

export interface ApplicantRecord {
  application_id: number
  user_id: string
  event_id: number
  status: ApplicationStatus
  answers: Record<string, any> | null
  created_at: string
  updated_at: string
  profiles: ApplicantProfile | null
}

interface GetApplicantsOptions {
  eventId?: number
  status?: ApplicationStatus
}

/**
 * Fetches applications joined with the applicant's profile data
 */
export async function getAdminApplicants(
  supabase: SupabaseClient,
  options?: GetApplicantsOptions
): Promise<ApplicantRecord[]> {
  let query = supabase
    .from('applications')
    .select(`
      application_id,
      user_id,
      event_id,
      status,
      answers,
      created_at,
      updated_at,
      profiles (
        name,
        email,
        university,
        faculty,
        major,
        year_of_study
      )
    `)
    .order('created_at', { ascending: false })

  if (options?.eventId) {
    query = query.eq('event_id', options.eventId)
  }

  if (options?.status) {
    query = query.eq('status', options.status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Failed to fetch applicants:', error.message)
    throw new Error(error.message)
  }

  return (data as unknown as ApplicantRecord[]) || []
}