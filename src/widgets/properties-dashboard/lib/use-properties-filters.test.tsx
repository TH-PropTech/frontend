import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockApartments } from '@/entities/properties'
import { usePropertiesFilters } from './use-properties-filters'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  env: { enableMocks: false },
}))

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => null }),
}))
vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: mocks.get },
}))
vi.mock('@/shared/config/env', () => ({ env: mocks.env }))

describe('usePropertiesFilters runtime data source', () => {
  beforeEach(() => {
    mocks.env.enableMocks = false
    mocks.get.mockReset()
  })

  it('uses backend apartments when the API succeeds', async () => {
    const backendApartment = { ...mockApartments[0], id: 'backend-apartment-1' }
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

  it('keeps the catalog empty when the API fails and mock mode is disabled', async () => {
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

  it('uses local apartments only when mock mode is explicitly enabled', async () => {
    mocks.env.enableMocks = true
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    mocks.get.mockRejectedValue(new Error('offline'))

    const { result } = renderHook(() => usePropertiesFilters())

    await waitFor(() => {
      expect(result.current.apartmentsError?.message).toBe('offline')
      expect(result.current.filteredApartments.length).toBeGreaterThan(0)
    })
    errorSpy.mockRestore()
  })
})
