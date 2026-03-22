import { type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { SearchInput } from '@/components/ui/search-input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search movies...',
  className,
}: SearchBarProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        className={cn(
          'h-12 w-[580px] rounded-full border border-border bg-transparent px-5 dark:bg-input/30',
          className,
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  )
}
