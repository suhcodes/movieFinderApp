<div align="center">

# moovle

A movie search and detail app built with React 19, TypeScript, and Vite. Powered by the [OMDB API](https://www.omdbapi.com/).

<img src="public/app.png" alt="moovle app screenshot" width="500" style="border-radius: 10px" />
</div>

## Features

- **Search movies** with debounced input — results update as you type
- **Movie detail page** with full metadata: plot, cast, genre badges, ratings (IMDB, Rotten Tomatoes, Metacritic)
- **Paginated results** for search queries
- **Error handling** with a dedicated error display component
- **Dark mode** by default

## Tech Stack

| Layer        | Tool                                   |
| ------------ | -------------------------------------- |
| UI           | React 19 + shadcn/ui + Tailwind CSS v4 |
| Routing      | react-router-dom v7                    |
| Server state | TanStack Query v5                      |
| HTTP         | Axios                                  |
| Validation   | Zod                                    |
| URL state    | nuqs v2                                |
| Build        | Vite + React Compiler                  |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/suhcodes/movieFinderApp.git
cd movieFinderApp
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Add your OMDB API key to `.env`:

```
VITE_OMDB_API_KEY=your_api_key_here
```

Get a free key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx).

### 3. Run

```bash
pnpm dev
```

## Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Type-check + production build
pnpm lint     # Run ESLint
pnpm format   # Format all src files with Prettier
pnpm preview  # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn primitives
│   └── shared/       # Layout, header, footer, shared components
├── features/
│   ├── movie/        # Movie detail — types, services, schemas, components
│   └── search/       # Movie search — types, services, schemas, components
├── lib/
│   ├── api/          # Axios instance + error handling
│   ├── hooks/        # Shared custom hooks
│   └── queries/      # TanStack Query hooks + key factories
└── pages/            # Route-level components
```
