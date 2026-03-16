'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSession from '../hooks/useSession'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Checking your session...
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
