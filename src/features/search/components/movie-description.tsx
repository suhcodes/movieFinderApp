import { Button } from '@/components/ui'

const descriptionStyles = {
  layout: 'flex flex-col gap-4',
}

const titleStyles = {
  layout: 'truncate',
  typography: 'text-lg font-semibold leading-tight',
  color: 'text-foreground',
}

const footerStyles = {
  layout: 'flex items-center justify-between',
}

const metaStyles = {
  layout: 'flex flex-col gap-0.5',
}

const metaTextStyles = {
  typography: 'text-xs',
  color: 'text-muted-foreground',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieDescriptionProps {
  title: string
  type?: string
  year?: string
  onMoreInfo?: () => void
}

export function MovieDescription({ title, type, year, onMoreInfo }: MovieDescriptionProps) {
  return (
    <div className={join(descriptionStyles)}>
      <h2 className={join(titleStyles)}>{title}</h2>
      <div className={join(footerStyles)}>
        <div className={join(metaStyles)}>
          {type && <span className={join(metaTextStyles)}>{type}</span>}
          {year && <span className={join(metaTextStyles)}>{year}</span>}
        </div>
        <Button variant="outline" size="sm" onClick={onMoreInfo}>
          More Info
        </Button>
      </div>
    </div>
  )
}
