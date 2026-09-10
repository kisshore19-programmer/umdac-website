'use server'

import { createClient } from '@/lib/supabase/server'
import { merchOrderSchema, type MerchOrderInput } from '@/lib/schemas/merchOrder'

type ActionResponse = {
  success: boolean
  error?: string
}

export async function placeMerchOrderAction(input: MerchOrderInput): Promise<ActionResponse> {
  const parsed = merchOrderSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: 'Please check your order and try again.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'You must be logged in to order.' }
  }

  const { data: item } = await supabase
    .from('merch')
    .select('is_active')
    .eq('merch_id', parsed.data.merchId)
    .single()

  if (!item || !item.is_active) {
    return { success: false, error: 'This item is no longer available.' }
  }

  const { error: insertError } = await supabase
    .from('merch_orders')
    .insert({
      merch_id: parsed.data.merchId,
      user_id: user.id,
      quantity: parsed.data.quantity,
    })

  if (insertError) {
    return { success: false, error: insertError.message }
  }

  return { success: true }
}

export async function updateOrderStatusAction(
  orderId: number,
  status: 'pending' | 'fulfilled'
): Promise<ActionResponse> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('merch_orders')
    .update({ status })
    .eq('order_id', orderId)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}