import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The page you are looking for may have moved or is not available yet. Head back to the UMDAC home page to continue exploring.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
