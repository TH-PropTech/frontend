import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeApartment } from '../lib/__tests__/apartment-fixture'
import { FavoritesDashboard } from './favorites-dashboard'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  favorites: ['apt-1'],
  clearFavorites: vi.fn(),
}))

vi.mock('@/shared/api/api-client', () => ({ apiClient: { get: mocks.get } }))
vi.mock('@/shared/lib/use-favorites', () => ({
  useFavorites: () => ({
    favorites: mocks.favorites,
    isLoading: false,
    isFavorite: (id: string) => mocks.favorites.includes(id),
    toggleFavorite: () => true,
    clearFavorites: mocks.clearFavorites,
    syncGuestFavorites: vi.fn(),
  }),
}))
vi.mock('@/widgets/home-dashboard/ui/home-header', () => ({
  HomeHeader: () => null,
}))
vi.mock('@/shared/ui/footer', () => ({ Footer: () => null }))
vi.mock('@/widgets/properties-dashboard/ui/components/apartment-card', () => ({
  ApartmentCard: ({
    apt,
  }: {
    apt: { title: string; rentalAvailabilityLabel?: string }
  }) => (
    <div data-testid="apartment-card">
      <span className="card-title">{apt.title}</span>
      {apt.rentalAvailabilityLabel && (
        <span role="status">{apt.rentalAvailabilityLabel}</span>
      )}
    </div>
  ),
}))
vi.mock('@/widgets/properties-dashboard/ui/components/compare-modal', () => ({
  CompareModal: () => null,
}))

describe('FavoritesDashboard', () => {
  beforeEach(() => {
    mocks.get.mockReset()
    mocks.clearFavorites.mockReset()
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

  it('displays live availability status badge on property cards', async () => {
    mocks.get.mockResolvedValue([
      makeApartment({
        id: 'apt-1',
        title: 'Căn hộ Landmark 81',
        rentalAvailabilityStatus: 'deposit-paid',
        rentalAvailabilityLabel: 'ĐÃ ĐẶT CỌC',
      }),
    ])
    render(<FavoritesDashboard />)
    await waitFor(() =>
      expect(screen.getByText('Căn hộ Landmark 81')).toBeTruthy()
    )
    expect(screen.getByRole('status')).toHaveTextContent('ĐÃ ĐẶT CỌC')
  })

  it('sorts apartments by price ascending and descending', async () => {
    mocks.favorites = ['apt-1', 'apt-2', 'apt-3']
    mocks.get.mockResolvedValue([
      makeApartment({ id: 'apt-1', title: 'Căn Vừa', priceNum: 15 }),
      makeApartment({ id: 'apt-2', title: 'Căn Rẻ', priceNum: 8 }),
      makeApartment({ id: 'apt-3', title: 'Căn Đắt', priceNum: 25 }),
    ])

    render(<FavoritesDashboard />)
    await waitFor(() =>
      expect(screen.getAllByTestId('apartment-card')).toHaveLength(3)
    )

    const sortSelect = screen.getByLabelText(/sắp xếp/i)

    // Sort price-asc
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } })
    let titles = screen
      .getAllByTestId('apartment-card')
      .map(card => card.querySelector('.card-title')?.textContent)
    expect(titles).toEqual(['Căn Rẻ', 'Căn Vừa', 'Căn Đắt'])

    // Sort price-desc
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } })
    titles = screen
      .getAllByTestId('apartment-card')
      .map(card => card.querySelector('.card-title')?.textContent)
    expect(titles).toEqual(['Căn Đắt', 'Căn Vừa', 'Căn Rẻ'])
  })

  it('handles batch "Xóa tất cả" flow with confirmation modal', async () => {
    mocks.favorites = ['apt-1', 'apt-2']
    mocks.get.mockResolvedValue([
      makeApartment({ id: 'apt-1', title: 'Căn 1' }),
      makeApartment({ id: 'apt-2', title: 'Căn 2' }),
    ])
    mocks.clearFavorites.mockResolvedValue(undefined)

    render(<FavoritesDashboard />)
    await waitFor(() =>
      expect(screen.getAllByTestId('apartment-card')).toHaveLength(2)
    )

    // Click "Xóa tất cả"
    const clearAllButton = screen.getByRole('button', { name: /xóa tất cả/i })
    fireEvent.click(clearAllButton)

    // Modal opens
    expect(screen.getByText('Xác nhận xóa tất cả yêu thích')).toBeTruthy()

    // Test cancel
    const cancelButton = screen.getByRole('button', { name: 'Hủy' })
    fireEvent.click(cancelButton)
    expect(screen.queryByText('Xác nhận xóa tất cả yêu thích')).toBeNull()
    expect(mocks.clearFavorites).not.toHaveBeenCalled()

    // Open modal again and confirm
    fireEvent.click(clearAllButton)
    const confirmButton = screen.getByTestId('confirm-clear-all')
    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(mocks.clearFavorites).toHaveBeenCalledTimes(1)
    })
  })
})
