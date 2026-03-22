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
        'flex items-center justify-center bg-foreground transition-all duration-300',
        isSmall ? 'h-8 w-8 rounded-lg' : 'h-16 w-16 rounded-2xl',
      )}
    >
      <Play
        className={cn(
          'fill-background text-background transition-all duration-300',
          isSmall ? 'h-4 w-4' : 'h-7 w-7',
        )}
      />
    </div>
  ) : null

  const text = showText ? (
    <span
      className="text-foreground transition-all duration-300"
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: isSmall ? 24 : 64,
        fontWeight: 800,
        letterSpacing: isSmall ? -1 : -2,
        lineHeight: 1.1,
      }}
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
