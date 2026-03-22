import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const cardStyles = {
  layout: 'flex flex-col gap-2',
  shape: 'rounded-lg',
  border: 'border border-border',
  background: 'bg-card',
  spacing: 'p-5',
}

const sourceStyles = {
  typography: 'text-xs font-medium',
  color: 'text-muted-foreground',
}

const scoreStyles = {
  typography: 'text-2xl font-bold',
  color: 'text-foreground',
}

const subStyles = {
  typography: 'text-xs',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieRatingCardProps {
  icon: ReactNode
  source: string
  score: string
  sub: string
  className?: string
}

export function MovieRatingCard({ icon, source, score, sub, className }: MovieRatingCardProps) {
  return (
    <div className={cn(join(cardStyles), className)}>
      {icon}
      <span className={join(sourceStyles)}>{source}</span>
      <span className={join(scoreStyles)}>{score}</span>
      <span className={join(subStyles)}>{sub}</span>
    </div>
  )
}
