interface MoviePosterProps {
  posterPath: string | null
  title: string
}

export function MoviePoster({ posterPath, title }: MoviePosterProps) {
  return (
    <div className="h-[170px] w-[120px] shrink-0 overflow-hidden rounded-md bg-muted">
      {posterPath ? (
        <img src={posterPath} alt={title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          No image
        </div>
      )}
    </div>
  )
}
