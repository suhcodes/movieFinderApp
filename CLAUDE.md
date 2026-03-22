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
│   └── shared/          # Layouts, nav, reusable cross-feature components
├── features/            # Feature slices — each self-contained
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── schemas/
│       └── types.ts
├── lib/
│   ├── api/             # Axios instance + interceptors (client.ts, omdb-error.ts)
│   ├── hooks/           # Shared custom hooks (use-debounce, use-min-loading, etc.)
│   ├── queries/         # TanStack Query key factories + hooks
│   ├── stores/          # Zustand stores (add here when needed)
│   ├── env.ts           # Runtime environment variable validation
│   └── utils.ts         # cn() utility (clsx + tailwind-merge)
└── pages/               # Route-level components (orchestration only)
```

## Component Patterns

- **Container/Presenter**: data-fetching logic in a container hook or page; presentational components receive props only
- **Custom hooks**: extract all stateful logic out of JSX (`useNotifications`, `useAuth`) — components should read, not compute
- **Single responsibility**: each component does one thing — UI, state, or orchestration, never all three
- **Co-locate types**: for small components, keep the type in the same file; move to `types.ts` when shared

### Named Layout Regions (Rule 5)

Header, footer, sidebar, and other named regions must be their own files in `src/components/shared/`. The layout wrapper only decides when and where to render regions — it never contains their markup inline.

```tsx
// ❌
function RootLayout() {
  return (
    <div>
      <header className="flex h-16 ...">
        <Logo /><SearchBar />
      </header>
      <Outlet />
      <footer className="flex justify-center ...">
        <p>© 2026 Moovle</p>
      </footer>
    </div>
  )
}

// ✅
// src/components/shared/app-header.tsx  →  export function AppHeader() { ... }
// src/components/shared/app-footer.tsx  →  export function AppFooter() { ... }

function RootLayout() {
  return (
    <div>
      {isSearch && <AppHeader />}
      <Outlet />
      <AppFooter />
    </div>
  )
}
```

### Feature Component Decomposition (Rule 6)

When a feature component contains two or more visually distinct, independently meaningful sections, each section must be its own component.

**A section should be extracted when it:**
- Has its own internal logic (date formatting, conditional rendering)
- Maps to a clear UI concept ("the poster", "the description", "the metadata row")
- Could be replaced or reused independently

```tsx
// ❌ — poster + description + metadata all in one component
function MovieResultItem({ movie }) {
  const year = new Date(movie.releaseDate).getFullYear()
  const rating = movie.voteAverage.toFixed(1)
  return (
    <div>
      <div className="h-[170px] w-[120px]">
        {movie.posterPath ? <img ... /> : <div>No image</div>}
      </div>
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <span><Star />{rating} · {year}</span>
      </div>
    </div>
  )
}

// ✅ — each visual section extracted
function MovieResultItem({ movie }) {
  return (
    <div className="flex gap-5 ...">
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />
      <MovieDescription
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.voteAverage}
        releaseDate={movie.releaseDate}
      />
    </div>
  )
}
```

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

### Component Style Objects (Rules 1 – 4)

#### Rule 1 — Style objects are mandatory for all `src/components/ui/` components

Every component in `src/components/ui/` must define its Tailwind classes as a named style object with semantic keys, flattened via `join`. A monolithic class string is never acceptable in this directory.

```ts
// ✅
const inputBaseStyles = {
  layout: 'h-8 w-full min-w-0',
  shape: 'rounded-lg',
  border: 'border border-input',
  // ...
}
const join = (styles: Record<string, string>) => Object.values(styles).join(' ')

function Input({ className, ...props }) {
  return <InputPrimitive className={cn(join(inputBaseStyles), className)} {...props} />
}

// ❌
function Input({ className, ...props }) {
  return <InputPrimitive className={cn('h-8 w-full min-w-0 rounded-lg border border-input ...', className)} {...props} />
}
```

#### Rule 2 — Use this exact set of semantic key names

Never invent new names for these concerns. Only include keys that are needed — omit empty ones.

| Key | Covers |
|-----|--------|
| `layout` | display, sizing, flex/grid |
| `shape` | border-radius |
| `border` | border width and color |
| `background` | `bg-*` |
| `spacing` | padding, gap |
| `typography` | font size, weight, line-height |
| `interaction` | transitions, outline, cursor, select |
| `placeholder` | `placeholder:*` |
| `focus` | `focus-visible:*` |
| `disabled` | `disabled:*` |
| `invalid` | `aria-invalid:*` |
| `file` | `file:*` (file input only) |
| `dark` | ALL `dark:*` overrides — including `dark:hover:`, `dark:disabled:`, `dark:aria-invalid:` — never scatter dark variants into other keys |

#### Rule 3 — Every `src/components/ui/` component must accept a `className` prop

Pass it to `cn()` as the last argument so consumers can override defaults. A UI primitive without `className` is rigid and will require a retrofit the first time it's used in a different layout context.

```ts
// ✅
function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <InputPrimitive className={cn(join(inputBaseStyles), className)} {...props} />
}

// ❌
function Input(props: React.ComponentProps<'input'>) {
  return <InputPrimitive className={join(inputBaseStyles)} {...props} />
}
```

#### Rule 4 — Two or more elements that always appear together become one compound primitive

If two or more UI elements are always rendered together as a unit, extract them into a single compound component in `src/components/ui/`. Never assemble the same combination inline in feature components.

**Trigger:** you write the same element grouping more than once outside `src/components/ui/`.

```tsx
// ❌ — pairing assembled inline inside a feature component
function SearchBar() {
  return (
    <div>
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input ... />
    </div>
  )
}

// ✅ — compound primitive owns the combination
// src/components/ui/search-input.tsx
function SearchInput({ className, ...props }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
      <InputPrimitive ... {...props} />
    </div>
  )
}

// Feature component only uses SearchInput
function SearchBar() {
  return <form><SearchInput ... /></form>
}
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
