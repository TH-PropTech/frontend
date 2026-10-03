import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderResult } from '@testing-library/react'

/** Renders with an isolated TanStack Query client (no retries, no cache sharing between tests). */
export function renderWithQuery(ui: React.ReactElement): RenderResult & {
  queryClient: QueryClient
} {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  })
  const result = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
  return Object.assign(result, { queryClient })
}
