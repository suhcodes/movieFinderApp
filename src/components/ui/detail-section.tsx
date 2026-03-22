import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const sectionStyles = {
  layout: 'flex flex-col gap-3',
}

const titleStyles = {
  typography: 'text-sm font-medium',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface DetailSectionProps {
  title: string
  children: ReactNode
  className?: string
}

export function DetailSection({ title, children, className }: DetailSectionProps) {
  return (
    <>
      <Separator />
      <div className={cn(join(sectionStyles), className)}>
        <span className={join(titleStyles)}>{title}</span>
        {children}
      </div>
    </>
  )
}
