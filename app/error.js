'use client'

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-lg border border-red-500/20 bg-red-950/10 p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-red-400">Something went wrong</h2>
        <p className="mb-6 text-sm text-red-300">{error?.message || 'An unexpected error occurred'}</p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
