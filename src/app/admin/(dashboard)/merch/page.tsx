'use client'

import { useState, useEffect } from 'react'
import { MerchRecord } from '@/lib/supabase/queries/merch'
import { MerchCard } from '@/components/admin/merch/MerchCard'
import { NewMerchCard } from '@/components/admin/merch/NewMerchCard'
import { MerchModal } from '@/components/admin/merch/MerchModal'
import {
  fetchAdminMerchAction,
  fetchMerchDetailsAction,
  createMerchAction,
  updateMerchAction,
  deleteMerchAction,
  CreateMerchInput,
  UpdateMerchInput,
} from '@/app/actions/adminActions'

export default function AdminMerchPage() {
  const [items, setItems] = useState<MerchRecord[]>([])
  const [selectedItem, setSelectedItem] = useState<MerchRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initial load from the query via Server Action
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAdminMerchAction()
        setItems(data)
      } catch (err) {
        console.error('Failed to load merch:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // 2. READ: Fetch full details on card click
  const handleOpenDetails = async (merchId: number) => {
    try {
      const details = await fetchMerchDetailsAction(merchId)
      setSelectedItem(details)
      setIsModalOpen(true)
    } catch (err) {
      console.error('Failed to load item details:', err)
    }
  }

  // 3. CREATE or UPDATE
  const handleSave = async (formData: CreateMerchInput) => {
    if (selectedItem?.merch_id) {
      // UPDATE
      const res = await updateMerchAction(
        selectedItem.merch_id,
        formData as UpdateMerchInput
      )
      if (res.success) {
        setItems((prev) =>
          prev.map((item) =>
            item.merch_id === selectedItem.merch_id
              ? { ...item, ...formData, updated_at: new Date().toISOString() }
              : item
          )
        )
      }
    } else {
      // CREATE: Inserts into DB and generates a new card
      const res = await createMerchAction(formData)
      if (res.success && res.data) {
        setItems((prev) => [res.data, ...prev])
      }
    }
    setIsModalOpen(false)
  }

  // 4. DELETE
  const handleDelete = async (merchId: number) => {
    const res = await deleteMerchAction(merchId)
    if (res.success) {
      setItems((prev) => prev.filter((item) => item.merch_id !== merchId))
    }
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <main className="p-8 w-full max-w-7xl mx-auto">
        <p className="text-gray-400">Loading merchandise...</p>
      </main>
    )
  }

  return (
    <main className="p-8 w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Merchandise Inventory
        </h1>
        <p className="text-sm text-gray-400">
          Manage catalog items, pricing, and availability
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Dynamic Card rendering for each queried merch_id */}
        {items.map((item) => (
          <MerchCard
            key={item.merch_id}
            item={item}
            onDetailsClick={() => handleOpenDetails(item.merch_id)}
          />
        ))}

        {/* Dotted border placeholder for adding new items */}
        <NewMerchCard
          onClick={() => {
            setSelectedItem(null)
            setIsModalOpen(true)
          }}
        />
      </div>

      {/* Shared details / create modal */}
      <MerchModal
        isOpen={isModalOpen}
        initialData={selectedItem}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </main>
  )
}