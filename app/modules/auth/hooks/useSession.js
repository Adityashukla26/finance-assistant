'use client'

import { useEffect, useState } from 'react'

export default function useSession() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchSession() {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        if (isMounted) {
          setUser(data.user || null)
        }
      } catch {
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchSession()

    return () => {
      isMounted = false
    }
  }, [])

  return { user, isAuthenticated: Boolean(user), isLoading }
}
