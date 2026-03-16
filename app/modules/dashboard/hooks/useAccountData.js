'use client'

import { useEffect, useState } from 'react'

export default function useAccountData() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchAccountData() {
      try {
        const response = await fetch('/api/dashboard/account')
        if (!response.ok) {
          throw new Error('Failed to load account data')
        }
        const json = await response.json()
        if (isMounted) {
          setData(json)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchAccountData()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, isLoading, error }
}
