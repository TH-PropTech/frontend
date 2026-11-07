import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ApartmentItem } from '@/entities/properties'
import { PropertyDetail } from './property-detail'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  useParams: vi.fn(),
}))

vi.mock('next/navigation', () => ({ useParams: mocks.useParams }))
vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: mocks.get },
}))
vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ isLoading: false, isError: false, data: null }),
}))
vi.mock('@/widgets/home-dashboard/ui/home-header', () => ({
  HomeHeader: () => null,
}))
vi.mock('@/shared/ui/footer', () => ({ Footer: () => null }))
vi.mock('./components/property-detail-hero', () => ({
  PropertyDetailHero: () => null,
}))
vi.mock('./components/booking-widget', () => ({
  BookingWidget: ({ propertyId }: { propertyId: string }) => (
    <div data-testid="booking-id">{propertyId}</div>
  ),
}))
vi.mock('./components/property-gallery', () => ({
  PropertyGallery: () => null,
}))
vi.mock('./components/property-360-modal', () => ({
  Property360Modal: () => null,
}))
vi.mock('./components/property-reviews', () => ({
  PropertyReviews: () => null,
}))
vi.mock('./components/landlord-chat-modal', () => ({
  LandlordChatModal: () => null,
}))
vi.mock('./components/property-decision-actions', () => ({
  PropertyDecisionActions: ({ propertyId }: { propertyId: string }) => (
    <div data-testid="decision-id">{propertyId}</div>
  ),
}))
vi.mock('@/features/listing-freshness', () => ({
  FreshnessBadge: ({ listingId }: { listingId: string }) => (
    <div data-testid="freshness-id">{listingId}</div>
  ),
}))
vi.mock('@/features/price-benchmark', () => ({
  PriceBenchmarkCard: () => null,
}))
vi.mock('@/features/viewing-notes', () => ({
  ViewingNoteEditor: ({ apartmentId }: { apartmentId: string }) => (
    <div data-testid="viewing-note-id">{apartmentId}</div>
  ),
}))
vi.mock('@/features/listing-quality', () => ({
  getListingQualityScore: vi.fn(),
  ImprovementChecklist: () => null,
  QualityScoreCard: () => null,
}))

vi.mock('@/features/apartment-floorplan', () => ({
  ApartmentFloorplanSection: () => null,
}))

const property = {
  id: 'PROP-CAR-102',
  title: 'Demo apartment',
  category: 'Apartment',
  tag: 'empty',
  tagText: 'Available',
  description: 'Description',
  location: 'District 1',
  price: '14.5 million/month',
  priceNum: 14.5,
  area: '65 m2',
  areaNum: 65,
  rooms: '2 bedrooms',
  city: 'HCMC',
  district: 'District 1',
  ward: 'Ward 1',
  street: 'Main street',
  projectName: '',
  bedrooms: 2,
  bathrooms: 1,
  direction: 'East',
  balconyDirection: 'East',
  furniture: 'Full',
  moveInTime: 'Now',
  electricityPriceType: 'State rate',
  waterPriceType: 'State rate',
  internetPriceType: 'Included',
  amenities: [],
  isVerified: true,
  hasMedia: false,
  gallery: [],
  images360: [],
  landlord: null,
} satisfies ApartmentItem

describe('PropertyDetail backend resource identity', () => {
  beforeEach(() => {
    window.localStorage.clear()
    mocks.useParams.mockReturnValue({ id: '6a811b784cb8ecf7051f5e8d' })
    mocks.get.mockResolvedValue(property)
  })

  it('uses the route MongoDB id for apartment-scoped API widgets', async () => {
    render(<PropertyDetail />)

    await waitFor(() => {
      expect(screen.getByTestId('freshness-id')).toHaveTextContent(
        '6a811b784cb8ecf7051f5e8d'
      )
    })
    expect(screen.getByTestId('booking-id')).toHaveTextContent(
      '6a811b784cb8ecf7051f5e8d'
    )
    expect(screen.getByTestId('decision-id')).toHaveTextContent(
      '6a811b784cb8ecf7051f5e8d'
    )
    expect(screen.getByTestId('viewing-note-id')).toHaveTextContent(
      '6a811b784cb8ecf7051f5e8d'
    )
  })

  it('renders apply button link to /properties/:id/apply when user is a tenant', async () => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ id: 'tenant-1', roles: ['tenant'] })
    )

    render(<PropertyDetail />)

    const applyLink = await screen.findByRole('link', {
      name: /Đặt thuê căn hộ/i,
    })
    expect(applyLink).toBeInTheDocument()
    expect(applyLink).toHaveAttribute(
      'href',
      '/properties/6a811b784cb8ecf7051f5e8d/apply'
    )
    expect(applyLink).toHaveClass(
      'bg-primary',
      'hover:bg-primary-hover',
      'rounded-2xl'
    )
  })

  it('disables the tenant application action when the availability projection is not available', async () => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ id: 'tenant-1', roles: ['tenant'] })
    )
    mocks.get.mockResolvedValue({
      ...property,
      rentalAvailabilityStatus: 'deposit-paid',
      rentalAvailabilityLabel: 'Đã đặt cọc',
    })

    render(<PropertyDetail />)

    const unavailableAction = await screen.findByRole('button', {
      name: 'Không thể đặt thuê: Đã đặt cọc',
    })
    expect(unavailableAction).toBeDisabled()
    expect(
      screen.queryByRole('link', { name: /Đặt thuê căn hộ/i })
    ).not.toBeInTheDocument()
  })

  it('uses the newest availability projection after the detail fetch refreshes', async () => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ id: 'tenant-1', roles: ['tenant'] })
    )
    mocks.useParams.mockReturnValue({ id: 'apt-1' })
    mocks.get.mockResolvedValueOnce({
      ...property,
      id: 'apt-1',
      rentalAvailabilityStatus: 'reserved',
      rentalAvailabilityLabel: 'Có người giữ chỗ',
    })

    const view = render(<PropertyDetail />)
    expect(
      await screen.findByRole('button', {
        name: 'Không thể đặt thuê: Có người giữ chỗ',
      })
    ).toBeDisabled()

    mocks.useParams.mockReturnValue({ id: 'apt-2' })
    mocks.get.mockResolvedValueOnce({
      ...property,
      id: 'apt-2',
      rentalAvailabilityStatus: 'available',
      rentalAvailabilityLabel: 'Đang trống',
    })
    view.rerender(<PropertyDetail />)

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /Đặt thuê căn hộ/i })
      ).toHaveAttribute('href', '/properties/apt-2/apply')
    })
  })

  describe('listing owner viewing own listing', () => {
    const landlord = {
      id: 'owner-1',
      fullName: 'Owner',
      email: 'owner@example.com',
      phone: '0900000000',
      avatar: '',
      kycStatus: 'verified',
    }
    const ownedProperty: ApartmentItem = { ...property, landlord }

    it.each([
      ['available', {}],
      [
        'unavailable',
        {
          rentalAvailabilityStatus: 'deposit-paid',
          rentalAvailabilityLabel: 'Đã đặt cọc',
        },
      ],
    ])('hides the rent action for the owner (%s)', async (_n, extra) => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ id: 'owner-1', roles: ['tenant'] })
      )
      mocks.get.mockResolvedValue({ ...ownedProperty, ...extra })

      render(<PropertyDetail />)

      await screen.findByTestId('booking-id')
      expect(
        screen.queryByRole('link', { name: /Đặt thuê căn hộ/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('rental-application-unavailable')
      ).not.toBeInTheDocument()
    })

    it('hides the rent action when the owner id comes from _id', async () => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ _id: 'owner-1', roles: ['tenant'] })
      )
      mocks.get.mockResolvedValue(ownedProperty)

      render(<PropertyDetail />)

      await screen.findByTestId('booking-id')
      expect(
        screen.queryByRole('link', { name: /Đặt thuê căn hộ/i })
      ).not.toBeInTheDocument()
    })

    it('still shows the rent action to a different tenant', async () => {
      window.localStorage.setItem(
        'user',
        JSON.stringify({ id: 'tenant-1', roles: ['tenant'] })
      )
      mocks.get.mockResolvedValue(ownedProperty)

      render(<PropertyDetail />)

      expect(
        await screen.findByRole('link', { name: /Đặt thuê căn hộ/i })
      ).toBeInTheDocument()
    })

    it('still shows the rent action when the viewer has no id', async () => {
      window.localStorage.setItem('user', JSON.stringify({ roles: ['tenant'] }))
      mocks.get.mockResolvedValue({
        ...property,
        landlord: { ...landlord, id: undefined },
      })

      render(<PropertyDetail />)

      expect(
        await screen.findByRole('link', { name: /Đặt thuê căn hộ/i })
      ).toBeInTheDocument()
    })
  })

  it('renders the finance and reviews tabs and handles tab switching', async () => {
    render(<PropertyDetail />)

    const financeTab = await screen.findByRole('tab', {
      name: /Tài chính & Chi phí/i,
    })
    const reviewsTab = screen.getByRole('tab', { name: /Đánh giá/i })

    expect(screen.getAllByRole('tab')).toHaveLength(2)
    expect(financeTab).toHaveAttribute('aria-selected', 'true')
    expect(reviewsTab).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(reviewsTab)
    expect(reviewsTab).toHaveAttribute('aria-selected', 'true')
    expect(financeTab).toHaveAttribute('aria-selected', 'false')
  })

  it('renders an explicit error instead of substituting mock data for a missing API property', async () => {
    mocks.useParams.mockReturnValue({ id: 'PROP-CAR-102' })
    mocks.get.mockRejectedValue(new Error('Property not found'))
    const errorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    render(<PropertyDetail />)

    expect(
      await screen.findByText('Không thể tải thông tin căn hộ này từ máy chủ.')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('booking-id')).not.toBeInTheDocument()
    errorSpy.mockRestore()
  })
})
