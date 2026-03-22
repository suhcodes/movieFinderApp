import { Award, Flame, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, Separator, DetailSection } from '@/components/ui'
import { MovieInfoRow } from '@/features/movie/components/movie-info-row'
import { MovieRatingCard } from '@/features/movie/components/movie-rating-card'
import { MovieMetaRow } from '@/features/movie/components/movie-meta-row'
import { MovieGenreBadges } from '@/features/movie/components/movie-genre-badges'
import { MovieImdbRating } from '@/features/movie/components/movie-imdb-rating'
import { MovieVotesAwards } from '@/features/movie/components/movie-votes-awards'
import type { Movie } from '@/features/movie/types'

const containerStyles = {
  layout: 'flex flex-col gap-4',
}

const titleStyles = {
  typography: 'text-2xl font-bold leading-tight',
  color: 'text-foreground',
}

const overviewStyles = {
  typography: 'text-sm leading-relaxed',
  color: 'text-muted-foreground',
}

const ratingCardsStyles = {
  layout: 'flex sm:flex-row flex-col gap-4',
}

const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

interface MovieDetailInfoProps {
  movie: Movie
  className?: string
}

export function MovieDetailInfo({ movie, className }: MovieDetailInfoProps) {
  const {
    title,
    year,
    runtime,
    language,
    country,
    genres,
    rated,
    voteAverage,
    votes,
    awards,
    overview,
    director,
    writers,
    actors,
    released,
    boxOffice,
    dvd,
    rottenTomatoes,
    metacritic,
  } = movie

  const metaParts = [year, runtime, language, country].filter(Boolean) as string[]

  const hasCast = director || writers || actors
  const hasRatings = (voteAverage && voteAverage > 0) || rottenTomatoes || metacritic
  const hasAdditionalInfo = released || boxOffice || dvd

  return (
    <div className={cn(join(containerStyles), className)}>
      {/* Title */}
      <h1 className={join(titleStyles)}>{title}</h1>

      <div className="flex md:flex-row flex-col gap-2">
        {/* Rated badge */}
        {rated && <Badge variant="outline">{rated}</Badge>}

        {/* Metadata row: year · runtime · language · country */}
        <MovieMetaRow parts={metaParts} />
      </div>

      {/* Genre badges */}
      {genres && genres.length > 0 && <MovieGenreBadges genres={genres} />}

      {/* IMDb rating + vote count */}
      {voteAverage !== undefined && voteAverage > 0 && (
        <MovieImdbRating voteAverage={voteAverage} votes={votes} />
      )}

      {/* Awards */}
      {awards && <MovieVotesAwards awards={awards} />}

      <Separator />

      {/* Overview */}
      {overview && <p className={join(overviewStyles)}>{overview}</p>}

      {/* Cast & Crew */}
      {hasCast && (
        <DetailSection title="Cast &amp; Crew">
          {director && <MovieInfoRow label="Director" value={director} />}
          {writers && <MovieInfoRow label="Writers" value={writers} />}
          {actors && <MovieInfoRow label="Actors" value={actors} />}
        </DetailSection>
      )}

      {/* Ratings */}
      {hasRatings && (
        <DetailSection title="Ratings">
          <div className={join(ratingCardsStyles)}>
            {voteAverage !== undefined && voteAverage > 0 && (
              <MovieRatingCard
                icon={<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
                source="IMDb"
                score={`${voteAverage.toFixed(1)} / 10`}
                sub={votes ? `${votes} votes` : 'IMDb rating'}
              />
            )}
            {rottenTomatoes && (
              <MovieRatingCard
                icon={<Flame className="h-5 w-5 text-red-500" />}
                source="Rotten Tomatoes"
                score={rottenTomatoes}
                sub="Tomatometer"
              />
            )}
            {metacritic && (
              <MovieRatingCard
                icon={<Award className="h-5 w-5 text-green-500" />}
                source="Metacritic"
                score={`${metacritic} / 100`}
                sub="Metascore"
              />
            )}
          </div>
        </DetailSection>
      )}

      {/* Additional Info */}
      {hasAdditionalInfo && (
        <DetailSection title="Additional Info">
          {released && <MovieInfoRow label="Released" value={released} />}
          {boxOffice && <MovieInfoRow label="Box Office" value={boxOffice} />}
          {dvd && <MovieInfoRow label="DVD" value={dvd} />}
        </DetailSection>
      )}
    </div>
  )
}
