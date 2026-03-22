import { cn } from '@/lib/utils'
import { Button } from './button'

const paginationStyles = {
  layout: 'flex items-center justify-center gap-4',
  spacing: 'pt-4',
}

const labelStyles = {
  typography: 'text-sm',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className={cn(join(paginationStyles), className)}>
      <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <span className={join(labelStyles)}>
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
