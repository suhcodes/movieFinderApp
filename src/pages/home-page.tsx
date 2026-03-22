import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/shared'
import { SearchBar } from '@/features/search/components/search-bar'
import { Button } from '@/components/ui'

export function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch() {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`, { viewTransition: true })
    }
  }

  return (
    <>
      <div className="flex-1" />
      <div className="flex flex-col items-center gap-7">
        <div style={{ viewTransitionName: 'moovle-logo' }}>
          <Logo />
        </div>
        <div style={{ viewTransitionName: 'moovle-searchbar' }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            className="h-9 md:h-11"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleSearch}>Moovle Search</Button>
          <Button onClick={handleSearch}>I&apos;m Feeling Lucky</Button>
        </div>
      </div>
      <div className="flex-1" />
    </>
  )
}
