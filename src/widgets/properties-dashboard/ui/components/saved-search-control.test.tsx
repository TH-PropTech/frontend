import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SavedSearchControl } from './saved-search-control'

vi.mock('@/features/saved-searches', () => ({
  SaveSearchDialog: ({
    currentFilters,
  }: {
    currentFilters: { city?: string; maxPrice?: number }
  }) => <div>{`${currentFilters.city}-${currentFilters.maxPrice}`}</div>,
}))

describe('SavedSearchControl', () => {
  it('passes the active property filters to the save dialog', () => {
    render(<SavedSearchControl filters={{ city: 'Hà Nội', maxPrice: 18 }} />)

    expect(screen.getByText('Hà Nội-18')).toBeInTheDocument()
  })
})
