'use client'

import { useState, useEffect } from 'react'
import { MerchRecord } from '@/lib/supabase/queries/merch'
import { CreateMerchInput } from '@/app/actions/adminActions'

type MerchModalProps = {
  isOpen: boolean
  initialData: MerchRecord | null
  onClose: () => void
  onSave: (formData: CreateMerchInput) => Promise<void>
  onDelete: (merchId: number) => Promise<void>
}

export function MerchModal({
  isOpen,
  initialData,
  onClose,
  onSave,
  onDelete,
}: MerchModalProps) {
  const [formData, setFormData] = useState<CreateMerchInput>({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    is_active: true,
  })

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form based on whether we are editing or creating
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || '',
        price: initialData.price,
        image_url: initialData.image_url || '',
        is_active: initialData.is_active,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        image_url: '',
        is_active: true,
      })
    }
    setIsConfirmDeleteOpen(false)
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSave(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteConfirmed = async () => {
    if (!initialData?.merch_id) return
    setIsSubmitting(true)
    try {
      await onDelete(initialData.merch_id)
    } finally {
      setIsSubmitting(false)
      setIsConfirmDeleteOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-800 bg-[#0F172A] p-6 shadow-2xl">
        <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Close modal"
        >
        <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
            </svg>
        </button>
        <h2 className="mb-5 text-xl font-bold text-white">
          {initialData ? 'Merch Details' : 'Add New Merch'}
        </h2>

        <form onSubmit={handleSaveSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400">Description</label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400">Price (RM)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                }
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">Image URL</label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActiveToggle"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="h-4 w-4 rounded accent-blue-600"
            />
            <label htmlFor="isActiveToggle" className="text-xs text-gray-300">
              Active in storefront
            </label>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-5">
            {initialData ? (
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(true)}
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-6 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? 'Processing...'
                : initialData
                ? 'Save Changes'
                : 'Create Merch'}
            </button>
          </div>
        </form>

        {/* Delete Confirmation Sub-Popup */}
        {isConfirmDeleteOpen && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-[#0F172A]/95 p-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-white">Are you sure?</h3>
            <p className="mb-6 max-w-xs text-xs text-gray-400">
              This action cannot be undone. This merchandise will be permanently removed from the database.
            </p>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="rounded-lg bg-gray-800 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDeleteConfirmed}
                className="rounded-lg bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}