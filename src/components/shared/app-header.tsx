import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryState } from 'nuqs'
import { Logo } from '@/components/shared/logo'
import { SearchBar } from '@/features/search/components/search-bar'

export function AppHeader() {
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

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border px-8">
      <div
        style={{ viewTransitionName: 'moovle-logo' }}
        className="cursor-pointer"
        onClick={() => navigate('/', { viewTransition: true })}
      >
        <Logo size="sm" inline />
      </div>
      <div style={{ viewTransitionName: 'moovle-searchbar' }} className="flex-1">
        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          onSearch={handleSearch}
          className="h-9 max-w-[580px]"
        />
      </div>
    </header>
  )
}
