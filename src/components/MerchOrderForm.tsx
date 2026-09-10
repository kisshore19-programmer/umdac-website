'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { merchOrderSchema, type MerchOrderInput } from '@/lib/schemas/merchOrder'
import { placeMerchOrderAction } from '@/app/actions/merchOrders'

export function MerchOrderForm({ merchId }: { merchId: number }) {
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<MerchOrderInput>({
    resolver: zodResolver(merchOrderSchema),
    defaultValues: { merchId, quantity: 1 },
  })

  async function onSubmit(data: MerchOrderInput) {
    const result = await placeMerchOrderAction(data)
    if (!result.success) {
      setError('root', { message: result.error ?? 'Something went wrong.' })
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8 rounded-xl border border-slate-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">Your order has been placed.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" {...register('merchId', { valueAsNumber: true })} />

      <div>
        <label htmlFor="quantity" className="mb-1 block text-sm font-medium text-slate-700">
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={10}
          {...register('quantity', { valueAsNumber: true })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Placing order...' : 'Reserve'}
      </button>
    </form>
  )
}