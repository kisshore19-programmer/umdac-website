'use client'

import { useState } from 'react'
import { updateOrderStatusAction } from '@/app/actions/merchOrders'

type Order = {
  order_id: number
  quantity: number
  status: string
  merch: { name: string } | null
  profiles: { name: string; email: string } | null
}

export function MerchOrderList({ orders }: { orders: Order[] }) {
  const [localOrders, setLocalOrders] = useState(orders)

  async function markFulfilled(orderId: number) {
    const result = await updateOrderStatusAction(orderId, 'fulfilled')
    if (result.success) {
      setLocalOrders(prev =>
        prev.map(o => (o.order_id === orderId ? { ...o, status: 'fulfilled' } : o))
      )
    }
  }

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Item</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Qty</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Buyer</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}></th>
        </tr>
      </thead>
      <tbody>
        {localOrders.map(o => (
          <tr key={o.order_id}>
            <td style={{ padding: '0.5rem' }}>{o.merch?.name}</td>
            <td style={{ padding: '0.5rem' }}>{o.quantity}</td>
            <td style={{ padding: '0.5rem' }}>{o.profiles?.name}</td>
            <td style={{ padding: '0.5rem' }}>{o.status}</td>
            <td style={{ padding: '0.5rem' }}>
              {o.status !== 'fulfilled' && (
                <button onClick={() => markFulfilled(o.order_id)}>Mark fulfilled</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}