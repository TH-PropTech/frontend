import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeApartment } from './__tests__/apartment-fixture'
import { usePropertiesFilters } from './use-properties-filters'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => null }),
}))
vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: mocks.get },
}))

describe('usePropertiesFilters runtime data source', () => {
  beforeEach(() => {
    mocks.get.mockReset()
  })

  it('uses backend apartments when the API succeeds', async () => {
    const backendApartment = makeApartment({ id: 'backend-apartment-1' })
    mocks.get.mockImplementation((path: string) =>
      path.startsWith('/apartments')
        ? Promise.resolve([backendApartment])
        : Promise.resolve([])
    )

    const { result } = renderHook(() => usePropertiesFilters())

    await waitFor(() => {
      expect(result.current.filteredApartments).toEqual([backendApartment])
    })
    expect(result.current.apartmentsError).toBeNull()
  })

  it('keeps the catalog empty when the API fails', async () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    mocks.get.mockRejectedValue(new Error('offline'))

    const { result } = renderHook(() => usePropertiesFilters())

    await waitFor(() => {
      expect(result.current.apartmentsError?.message).toBe('offline')
    })
    expect(result.current.filteredApartments).toEqual([])
    errorSpy.mockRestore()
  })
})
