import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'

const badgeBaseStyles = {
  group: 'group/badge',
  layout: 'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden',
  shape: 'rounded-4xl',
  border: 'border border-transparent',
  spacing: 'px-2 py-0.5',
  typography: 'text-xs font-medium whitespace-nowrap',
  interaction: 'transition-all',
  focus: 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  invalid: 'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
  dark: 'dark:aria-invalid:ring-destructive/40',
  icon: 'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!',
}

const badgeVariantStyles: Record<BadgeVariant, Record<string, string>> = {
  default: {
    background: 'bg-primary',
    color: 'text-primary-foreground',
    hover: '[a]:hover:bg-primary/80',
  },
  secondary: {
    background: 'bg-secondary',
    color: 'text-secondary-foreground',
    hover: '[a]:hover:bg-secondary/80',
  },
  destructive: {
    background: 'bg-destructive/10',
    color: 'text-destructive',
    focus: 'focus-visible:ring-destructive/20',
    hover: '[a]:hover:bg-destructive/20',
    dark: 'dark:bg-destructive/20 dark:focus-visible:ring-destructive/40',
  },
  outline: {
    border: 'border-border',
    color: 'text-foreground',
    hover: '[a]:hover:bg-muted [a]:hover:text-muted-foreground',
  },
  ghost: {
    hover: 'hover:bg-muted hover:text-muted-foreground',
    dark: 'dark:hover:bg-muted/50',
  },
  link: {
    color: 'text-primary',
    typography: 'underline-offset-4',
    hover: 'hover:underline',
  },
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

const badgeVariants = cva(join(badgeBaseStyles), {
  variants: {
    variant: Object.fromEntries(
      Object.entries(badgeVariantStyles).map(([k, v]) => [k, join(v)]),
    ) as Record<BadgeVariant, string>,
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  })
}

export { Badge, badgeVariants }
