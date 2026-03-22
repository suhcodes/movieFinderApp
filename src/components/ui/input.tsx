import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/utils'

const inputBaseStyles = {
  layout: 'h-8 w-full min-w-0',
  shape: 'rounded-lg',
  border: 'border border-input',
  background: 'bg-transparent',
  spacing: 'px-2.5 py-1',
  typography: 'text-base md:text-sm',
  interaction: 'transition-colors outline-none',
  file: 'file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
  placeholder: 'placeholder:text-muted-foreground',
  focus: 'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  disabled:
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
  invalid: 'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  dark: 'dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(join(inputBaseStyles), className)}
      {...props}
    />
  )
}

export { Input }
