import type { Metadata } from 'next'
import { MerchCard } from '@/components/umdac-ui'

export const metadata: Metadata = {
  title: 'Merch | UMDAC',
  description: "Support the club and take home a keepsake that reflects UMDAC's identity & community.",
}

const merchItems = [
  {
    name: 'UMDAC Standard Tee',
    price: 'RM 45',
    status: 'Available' as const,
    description: 'Premium cotton tee with the club logo and data-inspired details for everyday wear.',
  },
  {
    name: 'UMDAC Hoodie',
    price: 'RM 85',
    status: 'Limited' as const,
    description: 'A lightweight fleece hoodie for campus life and project nights.',
  },
  {
    name: 'UMDAC Notebook',
    price: 'RM 25',
    status: 'Out of stock' as const,
    description: 'A compact field notebook for notes during events and study sessions.',
  },
  {
    name: 'UMDAC Enamel Pin',
    price: 'RM 15',
    status: 'Available' as const,
    description: 'A compact enamel pin that lets you rep UMDAC wherever you go.',
  },
  {
    name: 'UMDAC Laptop Bag',
    price: 'RM 115',
    status: 'Out of stock' as const,
    description: 'Keep your laptop protected in style with its sleek design for daily campus carry.',
  },
]

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-pink-300 to-purple-700 px-4 py-16">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-black tracking-tight text-purple-900 md:text-6xl">
            Our Merchandise
          </h1>
          {/* Decorative divider */}
          <div className="mx-auto mt-4 h-px w-48 bg-purple-400/50" />
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-700">
            Support the club and take home a keepsake that reflects UMDAC&apos;s identity &amp; community.
          </p>
        </div>

        {/* Merch grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {merchItems.map((item) => (
            <MerchCard key={item.name} {...item} />
          ))}
        </div>

      </div>
    </div>
  )
}
