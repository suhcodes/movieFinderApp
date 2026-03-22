import { cn } from '@/lib/utils'

const loaderStyles = {
  layout: 'flex flex-1 items-center justify-center',
}

const logoStyles = {
  layout: 'flex items-center',
  spacing: 'gap-1.5',
}

const iconStyles = {
  layout: 'flex items-center justify-center shrink-0',
  shape: 'rounded-lg',
  background: 'bg-foreground',
  sizing: 'w-8 h-8',
  animation: 'animate-logo-pulse',
}

const letterStyles = {
  display: 'inline-block',
  color: 'text-foreground',
  animation: 'animate-logo-pulse',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface LoaderProps {
  className?: string
}

const LETTERS = ['m', 'o', 'o', 'v', 'l', 'e']

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cn(join(loaderStyles), className)}>
      <div className={join(logoStyles)}>
        <div className={join(iconStyles)} style={{ animationDelay: '0s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="9,6 9,18 19,12" style={{ fill: 'var(--background)' }} />
          </svg>
        </div>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className={join(letterStyles)}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '-1px',
              animationDelay: `${(i + 1) * 0.15}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
