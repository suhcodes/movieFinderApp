import { cn } from '@/lib/utils'

const rowStyles = {
  layout: 'flex gap-2',
}

const labelStyles = {
  layout: 'w-28 shrink-0',
  typography: 'text-sm font-medium',
  color: 'text-muted-foreground',
}

const valueStyles = {
  typography: 'text-sm',
  color: 'text-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieInfoRowProps {
  label: string
  value: string
  className?: string
}

export function MovieInfoRow({ label, value, className }: MovieInfoRowProps) {
  return (
    <div className={cn(join(rowStyles), className)}>
      <span className={join(labelStyles)}>{label}</span>
      <span className={join(valueStyles)}>{value}</span>
    </div>
  )
}
