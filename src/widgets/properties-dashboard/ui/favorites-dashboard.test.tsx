import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeApartment } from '../lib/__tests__/apartment-fixture'
import { FavoritesDashboard } from './favorites-dashboard'

const mocks = vi.hoisted(() => ({ get: vi.fn(), favorites: ['apt-1'] }))

vi.mock('@/shared/api/api-client', () => ({ apiClient: { get: mocks.get } }))
vi.mock('@/shared/lib/use-favorites', () => ({
  useFavorites: () => ({
    favorites: mocks.favorites,
    isFavorite: () => true,
    toggleFavorite: () => true,
  }),
}))
vi.mock('@/widgets/home-dashboard/ui/home-header', () => ({
  HomeHeader: () => null,
}))
vi.mock('@/shared/ui/footer', () => ({ Footer: () => null }))
vi.mock('@/widgets/properties-dashboard/ui/components/apartment-card', () => ({
  ApartmentCard: ({ apt }: { apt: { title: string } }) => (
    <div>{apt.title}</div>
  ),
}))
vi.mock('@/widgets/properties-dashboard/ui/components/compare-modal', () => ({
  CompareModal: () => null,
}))

describe('FavoritesDashboard', () => {
  beforeEach(() => {
    mocks.get.mockReset()
    mocks.favorites = ['apt-1']
  })

  it('shows a loading state, never placeholder apartments, before the API answers', () => {
    mocks.get.mockReturnValue(new Promise(() => undefined))
    render(<FavoritesDashboard />)
    expect(screen.getByTestId('favorites-loading')).toBeTruthy()
  })

  it('renders only favorited apartments returned by the API', async () => {
    mocks.get.mockResolvedValue([
      makeApartment({ id: 'apt-1', title: 'Căn yêu thích' }),
      makeApartment({ id: 'apt-2', title: 'Căn khác' }),
    ])
    render(<FavoritesDashboard />)
    await waitFor(() => expect(screen.getByText('Căn yêu thích')).toBeTruthy())
    expect(screen.queryByText('Căn khác')).toBeNull()
  })

  it('shows the empty state when nothing is favorited', async () => {
    mocks.favorites = []
    mocks.get.mockResolvedValue([makeApartment()])
    render(<FavoritesDashboard />)
    await waitFor(() =>
      expect(screen.getByText('Chưa có căn hộ yêu thích')).toBeTruthy()
    )
  })

  it('shows an error alert when the API fails', async () => {
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)
    mocks.get.mockRejectedValue(new Error('offline'))
    render(<FavoritesDashboard />)
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy())
    errorSpy.mockRestore()
  })
})
