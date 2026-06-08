# TH PropTech Frontend

Next.js App Router application for the TH PropTech platform.

## Requirements

- Node.js >= 22.11.0
- pnpm >= 10.0.0

## Getting Started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The app runs at http://localhost:3000 and expects the backend API at
`NEXT_PUBLIC_API_URL`.

If `pnpm` is not available globally, use Corepack:

```bash
corepack pnpm install
corepack pnpm dev
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable                   | Purpose                                                                         |
| -------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`      | Backend API base URL, default `http://localhost:3001/api/v1`                    |
| `NEXT_PUBLIC_APP_ENV`      | Public app environment: `local`, `development`, `staging`, `production`, `test` |
| `NEXT_PUBLIC_ENABLE_MOCKS` | Enables frontend mock behavior when supported                                   |

## Scripts

- `pnpm dev` - start local development server
- `pnpm build` - build production app
- `pnpm start` - run production build
- `pnpm typecheck` - run TypeScript checks
- `pnpm lint` - run ESLint
- `pnpm format:check` - verify Prettier formatting
- `pnpm test` - run unit/component tests
- `pnpm test:e2e` - run Playwright smoke tests

## Architecture

The frontend uses Feature-Sliced Design:

- `src/app` - App Router only: routes, layouts, loading, error boundaries
- `src/widgets` - composed page-level UI
- `src/features` - user-facing business capabilities
- `src/entities` - reusable domain entities when shared by multiple features
- `src/shared` - API client, config, base UI, utilities

Route files stay thin and import from widgets/features only.

## Folder Map

```text
src/
  app/                       # Next.js routes and route states
  widgets/home-dashboard/    # Composed page-level UI
  features/                  # Business feature slices
  entities/                  # Shared domain entities when reuse is proven
  shared/api/                # Typed API client and response contracts
  shared/config/             # Runtime env validation
  shared/lib/                # Cross-cutting utilities and test setup
  shared/ui/                 # Reusable base UI
tests/e2e/                   # Playwright smoke tests
scripts/run-e2e.mjs          # Starts Next.js and runs Playwright on Windows/CI
```

## API Boundary

Use `src/shared/api` for HTTP calls. Avoid direct `fetch` calls in route files,
widgets, or feature UI unless a feature explicitly owns a new API adapter.

The expected backend envelope is:

```ts
type ApiResponse<TData> = {
  success: boolean
  data: TData
  error: ApiErrorBody | null
  meta: ApiMeta | null
}
```

## CI Checklist

Run these before opening a PR:

```bash
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm test:e2e
```

Playwright browsers are installed with:

```bash
corepack pnpm exec playwright install chromium
```
