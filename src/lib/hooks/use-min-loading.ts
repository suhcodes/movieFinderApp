import { useState, useEffect, useRef } from 'react'

export function useMinLoading(isLoading: boolean, minMs = 1000): boolean {
  const [showLoading, setShowLoading] = useState(isLoading)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (isLoading) {
      startRef.current = Date.now()
      setShowLoading(true)
    } else {
      const elapsed = startRef.current ? Date.now() - startRef.current : minMs
      const remaining = Math.max(0, minMs - elapsed)
      const id = setTimeout(() => {
        setShowLoading(false)
        startRef.current = null
      }, remaining)
      return () => clearTimeout(id)
    }
  }, [isLoading, minMs])

  return showLoading
}
