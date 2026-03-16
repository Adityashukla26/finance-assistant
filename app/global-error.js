'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="bg-slate-950">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md rounded-lg border border-red-500/20 bg-red-950/10 p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-red-400">Critical Error</h2>
            <p className="mb-6 text-sm text-red-300">{error?.message || 'A critical error occurred'}</p>
            <button
              onClick={() => reset()}
              className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
            >
              Reload page
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
