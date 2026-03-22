import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@base-ui/react/input'
import { cn } from '@/lib/utils'

const searchInputStyles = {
  layout: 'h-full w-full min-w-0',
  border: 'border-0',
  background: 'bg-transparent',
  spacing: 'p-0',
  typography: 'text-sm',
  interaction: 'outline-none',
  placeholder: 'placeholder:text-muted-foreground',
  focus: 'focus-visible:ring-0',
  disabled: 'disabled:pointer-events-none disabled:opacity-50',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

function SearchInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
      <Input data-slot="input" className={join(searchInputStyles)} {...props} />
    </div>
  )
}

export { SearchInput }
