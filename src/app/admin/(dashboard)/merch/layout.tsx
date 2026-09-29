import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manage Merch',
}

export default function AdminMerchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
