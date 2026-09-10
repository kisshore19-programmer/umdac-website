import { createClient } from '@/lib/supabase/server'
import { MerchOrderList } from '@/components/admin/MerchOrderList'

export default async function MerchOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('merch_orders')
    .select('order_id, quantity, status, created_at, merch!inner(name), profiles!inner(name, email)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1>Merch Orders</h1>
      <MerchOrderList orders={orders as any ?? []} />
    </div>
  )
}