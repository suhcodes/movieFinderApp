import { cn } from '@/lib/utils'

const rowStyles = {
  layout: 'flex flex-wrap items-center gap-x-2 gap-y-1',
  typography: 'text-sm',
  color: 'text-muted-foreground',
}

const dotStyles = {
  color: 'text-muted-foreground/50',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieMetaRowProps {
  parts: string[]
  className?: string
}

export function MovieMetaRow({ parts, className }: MovieMetaRowProps) {
  if (parts.length === 0) return null

  return (
    <div className={cn(join(rowStyles), className)}>
      {parts.map((part, i) => (
        <span key={part} className="flex items-center gap-2">
          {i > 0 && <span className={join(dotStyles)}>·</span>}
          {part}
        </span>
      ))}
    </div>
  )
}
