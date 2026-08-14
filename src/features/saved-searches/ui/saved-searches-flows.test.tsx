import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SavedSearchesList } from './saved-searches-list'

const mocks = vi.hoisted(() => ({
  getSavedSearches: vi.fn(),
  errorToast: vi.fn(),
}))

vi.mock('../api/saved-search-api', () => ({
  getSavedSearches: mocks.getSavedSearches,
  deleteSavedSearch: vi.fn(),
  toggleSearchAlert: vi.fn(),
}))

vi.mock('@/shared/ui/app-toast', () => ({
  appToast: {
    success: vi.fn(),
    error: mocks.errorToast,
    info: vi.fn(),
  },
}))

describe('SavedSearchesList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows the shared custom error toast when loading fails', async () => {
    mocks.getSavedSearches.mockRejectedValue(new Error('Network unavailable'))

    render(<SavedSearchesList />)

    await waitFor(() => {
      expect(mocks.errorToast).toHaveBeenCalledWith('Network unavailable')
    })
  })
})
