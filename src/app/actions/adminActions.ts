'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  getAdminMerch,
  getMerchById,
  type MerchRecord
} from '@/lib/supabase/queries/merch'

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

// CREATE
export async function createMerchAction(payload: CreateMerchInput) {
  const supabase = await createClient()

  // Clean empty string image_url to null so DB constraints don't break
  const insertPayload = {
    ...payload,
    image_url: payload.image_url?.trim() === '' ? null : payload.image_url,
    description: payload.description?.trim() === '' ? null : payload.description,
    price: Number(payload.price) || 0,
  }

  console.log('[DEBUG] Inserting payload into Supabase:', insertPayload)

  const { data, error } = await supabase
    .from('merch')
    .insert([insertPayload])
    .select()
    .single()

  if (error) {
    console.error('[DB INSERT ERROR]:', error.message, error.details, error.hint)
    return { success: false, error: error.message }
  }

  console.log('[DEBUG] Inserted successfully:', data)
  revalidatePath('/admin/merch')
  return { success: true, data: data as MerchRecord }
}

// UPDATE
export async function updateMerchAction(merchId: number, updates: UpdateMerchInput) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('merch')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('merch_id', merchId)

  if (error) {
    console.error('Update merch error:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/merch')
  return { success: true }
}

// DELETE
export async function deleteMerchAction(merchId: number) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('merch')
    .delete()
    .eq('merch_id', merchId)

  if (error) {
    console.error('Delete merch error:', error.message)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/merch')
  return { success: true }
}