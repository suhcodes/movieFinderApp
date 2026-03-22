import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  showIcon?: boolean
  showText?: boolean
  inline?: boolean
  reversed?: boolean
  size?: 'default' | 'sm'
}

export function Logo({
  showIcon = true,
  showText = true,
  inline = false,
  reversed = false,
  size = 'default',
}: LogoProps) {
  const isSmall = size === 'sm'

  const icon = showIcon ? (
    <div
      className={cn(
        'flex items-center justify-center bg-foreground transition-all duration-300 h-8 w-8 rounded-lg',
        !isSmall && 'md:h-16 md:w-16 md:rounded-2xl',
      )}
    >
      <Play
        className={cn(
          'fill-background text-background transition-all duration-300 h-4 w-4',
          !isSmall && 'md:h-7 md:w-7',
        )}
      />
    </div>
  ) : null

  const text = showText ? (
    <span
      className={cn(
        'text-foreground transition-all duration-300',
        'font-extrabold leading-[1.1] font-[Outfit]',
        'text-[24px] tracking-[-1px]',
        isSmall ? 'hidden md:block' : 'md:text-6xl md:tracking-[-2px]',
      )}
    >
      moovle
    </span>
  ) : null

  return (
    <div className={cn('flex items-center gap-2', inline ? 'flex-row' : 'flex-col')}>
      {reversed ? (
        <>
          {text}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </div>
  )
}
