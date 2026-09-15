'use client'

type NewMerchCardProps = {
  onClick: () => void
}

export function NewMerchCard({ onClick }: NewMerchCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-[290px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-700 bg-transparent transition-all duration-200 hover:border-purple-500/80"
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gray-700 text-gray-500 transition-colors group-hover:border-purple-500 group-hover:text-purple-400">
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors group-hover:text-purple-400">
        Add New Merch
      </span>
    </button>
  )
}