import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Find Your Next Movie</CardTitle>
          <CardDescription>
            Discover films by title, genre, or mood. Search from thousands of movies and build your
            personal watchlist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Browse trending releases, explore top-rated classics, or search for something specific.
            Your perfect movie is just a search away.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Browse Movies</Button>
          <Button variant="outline">View Watchlist</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
