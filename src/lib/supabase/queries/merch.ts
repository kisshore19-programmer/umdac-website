import { SupabaseClient } from '@supabase/supabase-js'

export interface MerchRecord {
  merch_id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

/**
 * Fetches all merchandise items for admin management (both active and inactive).
 */
export async function getAdminMerch(
  supabase: SupabaseClient
): Promise<MerchRecord[]> {
  const { data, error } = await supabase
    .from('merch')
    .select(`
      merch_id,
      name,
      description,
      price,
      image_url,
      is_active,
      created_at,
      updated_at
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch admin merch:', error.message)
    throw new Error(error.message)
  }

  return (data as MerchRecord[]) || []
}

/**
 * Fetches only active merchandise items available for store users.
 */
export async function getUserMerch(
  supabase: SupabaseClient
): Promise<MerchRecord[]> {
  const { data, error } = await supabase
    .from('merch')
    .select(`
      merch_id,
      name,
      description,
      price,
      image_url,
      is_active,
      created_at,
      updated_at
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch user merch:', error.message)
    throw new Error(error.message)
  }

  return (data as MerchRecord[]) || []
}

/**
 * Fetches a single merchandise item by its ID.
 */
export async function getMerchById(
  supabase: SupabaseClient,
  merchId: number
): Promise<MerchRecord | null> {
  const { data, error } = await supabase
    .from('merch')
    .select(`
      merch_id,
      name,
      description,
      price,
      image_url,
      is_active,
      created_at,
      updated_at
    `)
    .eq('merch_id', merchId)
    .single()

  if (error) {
    console.error(`Failed to fetch merch item ${merchId}:`, error.message)
    throw new Error(error.message)
  }

  return (data as MerchRecord) || null
}