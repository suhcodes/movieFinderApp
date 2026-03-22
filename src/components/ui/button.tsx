import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'

const buttonBaseStyles = {
  group: 'group/button',
  layout: 'inline-flex shrink-0 items-center justify-center',
  shape: 'rounded-lg',
  border: 'border border-transparent bg-clip-padding',
  typography: 'text-sm font-medium whitespace-nowrap',
  interaction: 'transition-all outline-none select-none active:translate-y-px',
  focus: 'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  disabled: 'disabled:pointer-events-none disabled:opacity-50',
  invalid:
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  icon: "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  cursor: 'cursor-pointer aria-invalid:cursor-not-allowed',
}

const buttonVariantStyles: Record<ButtonVariant, Record<string, string>> = {
  default: {
    color: 'bg-primary text-primary-foreground',
    hover: 'hover:bg-primary/90',
    active: 'active:bg-primary/80',
  },
  outline: {
    border: 'border-border',
    color: 'bg-transparent',
    hover:
      'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
    active: 'active:bg-muted/80',
    dark: 'dark:border-input dark:bg-input/30 dark:hover:bg-input/50 dark:active:bg-input/70',
  },
  secondary: {
    color: 'bg-secondary text-secondary-foreground',
    hover:
      'hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
    active: 'active:bg-secondary/60',
  },
  ghost: {
    hover:
      'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
    active: 'active:bg-muted/80',
    dark: 'dark:hover:bg-muted/50 dark:active:bg-muted/40',
  },
  destructive: {
    color: 'bg-destructive/10 text-destructive',
    hover: 'hover:bg-destructive/20',
    active: 'active:bg-destructive/30',
    focus: 'focus-visible:border-destructive/40 focus-visible:ring-destructive/20',
    dark: 'dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:active:bg-destructive/40 dark:focus-visible:ring-destructive/40',
  },
  link: {
    color: 'text-primary',
    typography: 'underline-offset-4',
    hover: 'hover:underline',
    active: 'active:opacity-80',
  },
}

const buttonSizeStyles: Record<ButtonSize, Record<string, string>> = {
  default: {
    size: 'h-8',
    spacing: 'gap-1.5 px-2.5',
    states: 'has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
  },
  xs: {
    size: 'h-6',
    shape: 'rounded-[min(var(--radius-md),10px)]',
    spacing: 'gap-1 px-2',
    typography: 'text-xs',
    states:
      "in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
  },
  sm: {
    size: 'h-7',
    shape: 'rounded-[min(var(--radius-md),12px)]',
    spacing: 'gap-1 px-2.5',
    typography: 'text-[0.8rem]',
    states:
      "in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
  },
  lg: {
    size: 'h-9',
    spacing: 'gap-1.5 px-2.5',
    states: 'has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
  },
  icon: {
    size: 'size-8',
  },
  'icon-xs': {
    size: 'size-6',
    shape: 'rounded-[min(var(--radius-md),10px)]',
    states: "[&_svg:not([class*='size-'])]:size-3 in-data-[slot=button-group]:rounded-lg",
  },
  'icon-sm': {
    size: 'size-7',
    shape: 'rounded-[min(var(--radius-md),12px)]',
    states: 'in-data-[slot=button-group]:rounded-lg',
  },
  'icon-lg': {
    size: 'size-9',
  },
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

const buttonCva = cva(join(buttonBaseStyles), {
  variants: {
    variant: Object.fromEntries(
      Object.entries(buttonVariantStyles).map(([k, v]) => [k, join(v)]),
    ) as Record<ButtonVariant, string>,
    size: Object.fromEntries(
      Object.entries(buttonSizeStyles).map(([k, v]) => [k, join(v)]),
    ) as Record<ButtonSize, string>,
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ButtonProps extends ButtonPrimitive.Props {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonCva({ variant, size, className }))}
      {...props}
    />
  )
}
