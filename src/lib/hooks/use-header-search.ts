import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryState } from 'nuqs'

export function useHeaderSearch() {
  const navigate = useNavigate()
  const [q, setQ] = useQueryState('q', { defaultValue: '' })
  const [inputValue, setInputValue] = useState(q)

  useEffect(() => {
    setInputValue(q)
  }, [q])

  function handleSearch() {
    if (inputValue.trim()) {
      setQ(inputValue.trim())
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`)
    }
  }

  return { inputValue, setInputValue, handleSearch }
}
