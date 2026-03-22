import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MovieVotesAwardsProps {
  votes?: string
  awards?: string
  className?: string
}

const containerStyles = {
  layout: 'flex flex-wrap items-center gap-4',
}

const groupStyles = {
  layout: 'flex items-center gap-4',
}

const textStyles = {
  typography: 'text-sm',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

export function MovieVotesAwards({ awards, className }: MovieVotesAwardsProps) {
  if (!awards) return null

  return (
    <div className={cn(join(containerStyles), className)}>
      {awards && (
        <div className={join(groupStyles)}>
          <Trophy className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className={join(textStyles)}>{awards}</span>
        </div>
      )}
    </div>
  )
}
