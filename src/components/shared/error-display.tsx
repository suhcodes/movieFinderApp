import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

interface ErrorDisplayProps {
  code?: number
  title?: string
  message?: string
  className?: string
}

const containerStyles = {
  layout: 'flex flex-1 flex-col items-center justify-center',
}

const contentStyles = {
  layout: 'flex flex-col items-center',
  gap: 'gap-6',
}

const textGroupStyles = {
  layout: 'flex flex-col items-center',
  gap: 'gap-2',
}

const codeStyles = {
  typography: 'text-5xl font-bold',
  color: 'text-foreground',
  alignment: 'text-center',
}

const titleStyles = {
  typography: 'text-xl font-semibold',
  color: 'text-foreground',
  alignment: 'text-center',
}

const messageStyles = {
  typography: 'text-sm',
  color: 'text-muted-foreground',
  alignment: 'text-center',
  sizing: 'max-w-[360px]',
}

const buttonRowStyles = {
  layout: 'flex',
  gap: 'gap-3',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

export function ErrorDisplay({ code, title, message, className }: ErrorDisplayProps) {
  const navigate = useNavigate()

  return (
    <div className={cn(join(containerStyles), className)}>
      <div className={join(contentStyles)}>
        <div className={join(textGroupStyles)}>
          {code !== undefined && <span className={join(codeStyles)}>{code}</span>}
          {title && <p className={join(titleStyles)}>{title}</p>}
          {message && <p className={join(messageStyles)}>{message}</p>}
        </div>
        {code !== 401 && (
          <div className={join(buttonRowStyles)}>
            <Button onClick={() => navigate('/')}>Go Home</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
