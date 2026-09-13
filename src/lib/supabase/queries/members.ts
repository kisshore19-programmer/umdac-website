import { SupabaseClient } from '@supabase/supabase-js'

export interface MemberRecord {
  user_id: string
  name: string
  email: string
  role: string | null
  university: string | null
  faculty: string | null
  major: string | null
  year_of_study: number | null
  semester: number | null
  created_at: string
  last_login: string | null
}

/**
 * Fetches all registered members from profiles ordered by join date.
 */
export async function getAdminMembers(
  supabase: SupabaseClient
): Promise<MemberRecord[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      user_id,
      name,
      email,
      role,
      university,
      faculty,
      major,
      year_of_study,
      semester,
      created_at,
      last_login
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch members:', error.message)
    throw new Error(error.message)
  }

  return (data as MemberRecord[]) || []
}
