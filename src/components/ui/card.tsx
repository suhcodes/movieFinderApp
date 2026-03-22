import * as React from 'react'

import { cn } from '@/lib/utils'

const cardStyles = {
  group: 'group/card',
  layout: 'flex flex-col overflow-hidden',
  shape: 'rounded-xl',
  spacing: 'gap-4 py-4',
  color: 'bg-card text-card-foreground',
  typography: 'text-sm',
  border: 'ring-1 ring-foreground/10',
  slotStates: 'has-data-[slot=card-footer]:pb-0',
  imageStates:
    'has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
  responsive:
    'data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0',
}

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(...Object.values(cardStyles), className)}
      {...props}
    />
  )
}

const cardHeaderStyles = {
  group: 'group/card-header @container/card-header',
  layout: 'grid auto-rows-min items-start',
  shape: 'rounded-t-xl',
  spacing: 'gap-1 px-4',
  slotStates:
    'has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
  borderStates: '[.border-b]:pb-4',
  responsive: 'group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:[.border-b]:pb-3',
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(...Object.values(cardHeaderStyles), className)}
      {...props}
    />
  )
}

const cardTitleStyles = {
  typography: 'text-base leading-snug font-medium',
  responsive: 'group-data-[size=sm]/card:text-sm',
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(...Object.values(cardTitleStyles), className)}
      {...props}
    />
  )
}

const cardDescriptionStyles = {
  typography: 'text-sm',
  color: 'text-muted-foreground',
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(...Object.values(cardDescriptionStyles), className)}
      {...props}
    />
  )
}

const cardActionStyles = {
  position: 'col-start-2 row-span-2 row-start-1',
  alignment: 'self-start justify-self-end',
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(...Object.values(cardActionStyles), className)}
      {...props}
    />
  )
}

const cardContentStyles = {
  spacing: 'px-4',
  responsive: 'group-data-[size=sm]/card:px-3',
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(...Object.values(cardContentStyles), className)}
      {...props}
    />
  )
}

const cardFooterStyles = {
  layout: 'flex items-center',
  shape: 'rounded-b-xl',
  border: 'border-t',
  color: 'bg-muted/50',
  spacing: 'p-4',
  responsive: 'group-data-[size=sm]/card:p-3',
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(...Object.values(cardFooterStyles), className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
