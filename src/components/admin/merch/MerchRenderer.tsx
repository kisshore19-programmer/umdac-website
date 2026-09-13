import React from 'react'
import { MerchRecord } from '@/lib/supabase/queries/merch'
import { MerchCard } from '@/components/admin/merch/MerchCard'

/**
 * Creates a single MerchCard component for a given merch record.
 */
export function createMerchCard(
  item: MerchRecord,
  onDetailsClick: (merchId: number) => void
): React.ReactElement {
  return (
    <MerchCard
      key={item.merch_id}
      item={item}
      onDetailsClick={() => onDetailsClick(item.merch_id)}
    />
  )
}

/**
 * Generates an array of MerchCards from a list of records.
 */
export function renderMerchCards(
  items: MerchRecord[],
  onDetailsClick: (merchId: number) => void
): React.ReactElement[] {
  return items.map((item) => createMerchCard(item, onDetailsClick))
}