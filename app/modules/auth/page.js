'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSession from './hooks/useSession'

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || 'Login failed.')
        return
      }

      router.replace('/dashboard')
    } catch {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-xl">
        <h1 className="text-2xl font-bold">Login to FinTrack Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">Use your email and password to continue.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-400">
          Back to home?{' '}
          <Link href="/" className="text-cyan-300 hover:text-cyan-200">
            Visit landing page
          </Link>
        </p>
      </div>
    </main>
  )
}
