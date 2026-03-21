# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Type-check + production build (tsc -b && vite build)
pnpm lint       # Run ESLint
pnpm preview    # Preview production build
pnpm format     # Format all src files with Prettier
```

No test runner is configured yet.

## Code Style

After creating or editing any `.ts` / `.tsx` file, always run Prettier on it before finishing:

```bash
prettier --write <file>
```

Never leave a file unformatted. Single quotes, no semicolons — enforced by `prettier.config.js`.

## Packages

| Package | Purpose |
|---|---|
| react-router-dom v7 | Routing — `createBrowserRouter` + `RouterProvider` in App.tsx |
| @tanstack/react-query v5 | Server state — hooks live in `lib/queries/` |
| @tanstack/react-query-devtools | Dev-only query inspector (mounted in main.tsx) |
| zustand v5 | Global client state — stores in `lib/stores/` |
| axios | HTTP client — singleton in `lib/api/client.ts` |
| nuqs v2 | URL search param state — `useQueryState` hook; `NuqsAdapter` in main.tsx |

QueryClient defaults: `staleTime: 5 min`, `retry: 1`.

## Planning & Task Tracking

When implementing a plan, use `TaskCreate` at the start to create a task list for every step. Update each task status as work progresses:

- `queued` — not yet started (default)
- `in_progress` — currently being worked on (only one task at a time)
- `completed` — done

This gives a live view of what's queued, what's active, and what's finished throughout the session.

## Feature Development Workflow

Build features in this order — each layer only depends on the layers before it:

```
Types → API → Queries → Store → Components → Page → Route
```

### 1. Define Types First

Start with TypeScript interfaces. Everything else depends on knowing the shape of your data.

```ts
// src/features/<feature>/types.ts
export interface Movie { id: string; title: string; poster: string; rating: number }
```

### 2. Build the API Layer

Service that talks to the backend — no UI, just data contracts.

```ts
// src/features/<feature>/services/movies-api.ts
export const moviesApi = {
  getAll: () => apiClient.get<Movie[]>('/movies'),
  getById: (id: string) => apiClient.get<Movie>(`/movies/${id}`),
}
```

### 3. Create Query Hooks (TanStack Query)

Wrap API calls in reusable hooks. This is what components consume.

```ts
// src/lib/queries/use-movies.ts
export const useMovies = () =>
  useQuery({ queryKey: movieKeys.all, queryFn: moviesApi.getAll })
```

### 4. Set Up Store (if needed)

Only when the feature needs shared client-side state (selected item, filters, UI toggles). Skip if TanStack Query server state is enough.

```ts
// src/lib/stores/movies-store.ts
export const useMovieStore = create<MovieStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}))
```

### 5. Build UI Components (smallest → largest)

Bottom-up: primitives first, composed components next, full feature view last. Use shadcn/ui primitives as the base — never re-implement what shadcn already provides.

```
MovieCard       ← single item (shadcn Card)
MovieList       ← renders a list of MovieCards
MovieFilters    ← filter controls (shadcn Input, Select, etc.)
MoviePage       ← assembles everything, connects to hooks
```

Each component only receives props — no direct API calls inside them.

### 6. Connect Data in the Page Component

The page/container is the only place that calls hooks and passes data down.

```tsx
// src/pages/movies-page.tsx
export function MoviesPage() {
  const { data, isLoading } = useMovies()
  if (isLoading) return <Spinner />
  return <MovieList movies={data} />
}
```

### 7. Add the Route

Wire up the page in `App.tsx` last, once the feature works end-to-end.

```tsx
{ path: '/movies', element: <RootLayout><MoviesPage /></RootLayout> }
```

## Architecture

React 19 + TypeScript + Vite app using **shadcn/ui** components and **Tailwind CSS v4**.

Key decisions:
- **Tailwind v4**: configured via `@tailwindcss/vite` plugin (no `tailwind.config.js` — all config lives in `src/index.css` using `@theme` and CSS variables)
- **shadcn/ui (canary)**: components live in `src/components/ui/`, utilities in `src/lib/utils.ts`. Add new components with `pnpm dlx shadcn@canary add <component>`
- **`@` alias**: resolves to `src/` — configured in both `vite.config.ts` (via `path.resolve`) and `tsconfig.app.json` (`paths`)
- **React Compiler**: enabled via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` — avoid manual `useMemo`/`useCallback` as the compiler handles these
- **Strict TypeScript**: `noUnusedLocals`, `noUnusedParameters`, and `erasableSyntaxOnly` are all enabled

## Folder Structure

Feature-based (domain-driven) layout:

```
src/
├── components/
│   ├── ui/              # shadcn primitives (auto-generated, do not edit manually)
│   ├── shared/          # Layouts, nav, error boundaries
│   └── features/        # Feature-scoped presentational components
├── features/            # Feature slices — each self-contained
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── schemas/
│       └── types.ts
├── lib/
│   ├── api/             # Axios instance + interceptors (client.ts)
│   ├── queries/         # TanStack Query key factories + hooks
│   ├── stores/          # Zustand stores
│   └── utils/           # Shared helpers
├── pages/               # Route-level components (orchestration only)
└── types/               # Global TS types
```

## Component Patterns

- **Container/Presenter**: data-fetching logic in a container hook or page; presentational components receive props only
- **Custom hooks**: extract all stateful logic out of JSX (`useNotifications`, `useAuth`) — components should read, not compute
- **Single responsibility**: each component does one thing — UI, state, or orchestration, never all three
- **Co-locate types**: for small components, keep the type in the same file; move to `types.ts` when shared

### Styling

- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for all conditional class merging
- Use `cva` (class-variance-authority) to define component variants instead of inline conditionals:

```tsx
const card = cva("rounded-lg border", {
  variants: {
    intent: { default: "bg-card", ghost: "bg-transparent border-none" },
    size:   { sm: "p-3", md: "p-6" },
  },
  defaultVariants: { intent: "default", size: "md" },
})
```

- Keep Tailwind classes in JSX, not in CSS files

## UI and Styling

### Dark Mode

The app defaults to dark mode. The `dark` class is set statically on the `<html>` element in `index.html`. The dark variant is defined as `&:is(.dark *)` in `index.css` — all dark styles depend on this class being present on an ancestor.

### Component Style Objects

UI primitives (e.g. `Button`, `Card`) define their styles as plain objects with semantic keys before passing them to `cva` or `cn`. This makes each style concern explicit and easy to extend:

```ts
const buttonBaseStyles = {
  layout: 'inline-flex items-center justify-center',
  shape: 'rounded-lg',
  interaction: 'transition-all outline-none select-none active:translate-y-px',
  // ...
}
```

Use a `join` helper to flatten the object into a class string:

```ts
const join = (styles: Record<string, string>) => Object.values(styles).join(' ')
```

### Button Variant Keys

Each button variant object must have separate keys for `hover` and `active` states — never mix them in the same key:

```ts
default: {
  color: 'bg-primary text-primary-foreground',
  hover: 'hover:bg-primary/90',
  active: 'active:bg-primary/80',
},
```

This also applies to dark-mode overrides — keep `dark:hover:` and `dark:active:` in the `dark` key, not scattered across `hover` or `active`.

### Card Structure

Use the full shadcn `Card` slot composition for any content card:

```tsx
<Card>
  <CardHeader>
    <CardTitle>...</CardTitle>
    <CardDescription>...</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

`CardFooter` renders with a top border and muted background automatically. Place CTA buttons there.

## State Management

| State type | Tool |
|---|---|
| Local UI state | `useState` / `useReducer` |
| Server/async data | TanStack Query (`useQuery`, `useMutation`) |
| Global client state | Zustand |
| URL-driven state | `useSearchParams` / nuqs |
| Theme / auth / locale | React Context (read-only, low-frequency) |

Never use Context for frequently changing state — use Zustand with selectors instead.

## API Layer

- Axios instance lives in `lib/api/client.ts` with auth interceptors
- All queries/mutations are wrapped in TanStack Query hooks inside `lib/queries/` — never fetch directly in components
- Use query key factories for cache consistency:

```ts
export const movieKeys = {
  all:    ["movies"] as const,
  list:   (filters: Filters) => [...movieKeys.all, "list", filters] as const,
  detail: (id: string)       => [...movieKeys.all, "detail", id] as const,
}
```

- Keep mutations co-located with the related query hooks in the same file
