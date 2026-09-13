'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema, type ApplicationInput } from '@/lib/schemas/application'
import { applyToEventAction } from '@/app/actions/applications'

export function ApplicationForm({ eventId }: { eventId: number }) {
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { eventId },
  })

  async function onSubmit(data: ApplicationInput) {
    const result = await applyToEventAction(data)
    if (!result.success) {
      setError('root', { message: result.error ?? 'Something went wrong.' })
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-8 rounded-xl border border-slate-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">
          Your application has been submitted. Check your email for confirmation.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" {...register('eventId', { valueAsNumber: true })} />

      <div>
        <label htmlFor="motivation" className="mb-1 block text-sm font-medium text-slate-700">
          Why do you want to join?
        </label>
        <textarea
          id="motivation"
          rows={4}
          {...register('motivation')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
        />
        {errors.motivation && (
          <p className="mt-1 text-sm text-red-600">{errors.motivation.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="availability" className="mb-1 block text-sm font-medium text-slate-700">
          Your availability
        </label>
        <input
          id="availability"
          {...register('availability')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none"
        />
        {errors.availability && (
          <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
        )}
      </div>

      {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : 'Submit application'}
      </button>
    </form>
  )
}