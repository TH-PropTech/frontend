import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApplicationList } from './application-list'
import { getMyRentalApplications } from '../api/rental-application-api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('../api/rental-application-api', () => ({
  getMyRentalApplications: vi.fn(),
}))

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('ApplicationList Component', () => {
  afterEach(() => cleanup())

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading skeleton while query is fetching', () => {
    vi.mocked(getMyRentalApplications).mockReturnValue(new Promise(() => {}))
    renderWithClient(<ApplicationList />)
    expect(screen.getByTestId('application-list-loading')).toBeInTheDocument()
  })

  it('renders error state and allows refetching on click', async () => {
    vi.mocked(getMyRentalApplications).mockRejectedValue(
      new Error('Network error')
    )
    renderWithClient(<ApplicationList />)

    const errorEl = await screen.findByTestId('application-list-error')
    expect(errorEl).toBeInTheDocument()
    expect(
      screen.getByText('Không tải được danh sách hồ sơ đặt thuê.')
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Thử lại/i }))
    expect(getMyRentalApplications).toHaveBeenCalledTimes(2)
  })

  it('renders empty state when tenant has zero applications', async () => {
    vi.mocked(getMyRentalApplications).mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })
    renderWithClient(<ApplicationList />)

    const emptyEl = await screen.findByTestId('application-list-empty')
    expect(emptyEl).toBeInTheDocument()
    expect(screen.getByText('Chưa có hồ sơ ứng tuyển nào')).toBeInTheDocument()

    const exploreLink = screen.getByRole('link', {
      name: /Khám phá căn hộ cho thuê/i,
    })
    expect(exploreLink).toHaveAttribute('href', '/properties')
  })

  it('shows a Vietnamese rejection reason without leaking raw codes', async () => {
    const base = {
      apartmentId: 'apt-1',
      tenantId: 'tenant-1',
      landlordId: 'landlord-1',
      status: 'rejected' as const,
      actorId: null,
      actorTimestamp: null,
      createdAt: '2026-09-13T00:00:00Z',
      updatedAt: '2026-09-13T00:00:00Z',
      occupants: 2,
      moveInDate: '2026-10-01',
      occupation: 'Designer',
      hasPets: false,
    }
    vi.mocked(getMyRentalApplications).mockResolvedValue({
      items: [
        { ...base, _id: 'r1', reasonCode: 'PROPERTY_UNAVAILABLE' },
        { ...base, _id: 'r2', reasonCode: 'OTHER' },
        { ...base, _id: 'r3', reasonCode: 'SOME_NEW_REASON' },
      ],
      total: 3,
      page: 1,
      limit: 20,
      totalPages: 1,
    })

    renderWithClient(<ApplicationList />)
    const list = await screen.findByTestId('application-list')

    expect(
      screen.getByText('Lý do từ chối: Căn hộ đã có người thuê/giữ chỗ')
    ).toBeInTheDocument()
    expect(screen.getByText('Lý do từ chối: Lý do khác')).toBeInTheDocument()
    expect(
      screen.getByText('Lý do từ chối: Some new reason')
    ).toBeInTheDocument()
    expect(list.textContent).not.toMatch(/[A-Z]{3,}(_[A-Z0-9]+){1,}/)
    expect(list.textContent).not.toContain('OTHER')
  })

  it('renders applications list with pending item and accepted item linking to contract', async () => {
    const mockItems = [
      {
        _id: 'app-pending-111',
        apartmentId: 'apt-1',
        tenantId: 'tenant-1',
        landlordId: 'landlord-1',
        status: 'pending' as const,
        reasonCode: null,
        actorId: null,
        actorTimestamp: null,
        createdAt: '2026-09-13T00:00:00Z',
        updatedAt: '2026-09-13T00:00:00Z',
        occupants: 2,
        moveInDate: '2026-10-01',
        occupation: 'Designer',
        hasPets: false,
        packageSnapshot: {
          packageId: 'pkg-6',
          version: 1,
          durationMonths: 6 as const,
          monthlyRent: 15000000,
          resolvedDepositAmount: 15000000,
        },
      },
      {
        _id: 'app-accepted-222',
        apartmentId: 'apt-2',
        tenantId: 'tenant-1',
        landlordId: 'landlord-2',
        status: 'accepted' as const,
        contractId: 'contract-xyz-999',
        reasonCode: null,
        actorId: null,
        actorTimestamp: null,
        createdAt: '2026-09-12T00:00:00Z',
        updatedAt: '2026-09-12T00:00:00Z',
        occupants: 1,
        moveInDate: '2026-09-20',
        occupation: 'Engineer',
        hasPets: true,
        packageSnapshot: {
          packageId: 'pkg-12',
          version: 1,
          durationMonths: 12 as const,
          monthlyRent: 20000000,
          resolvedDepositAmount: 40000000,
        },
      },
      {
        _id: 'app-provisioning-333',
        apartmentId: 'apt-3',
        tenantId: 'tenant-1',
        landlordId: 'landlord-3',
        status: 'accepted' as const,
        contractId: null,
        provisioningStatus: 'failed' as const,
        reasonCode: null,
        actorId: null,
        actorTimestamp: null,
        createdAt: '2026-09-11T00:00:00Z',
        updatedAt: '2026-09-11T00:00:00Z',
        occupants: 3,
        moveInDate: '2026-10-15',
        occupation: 'Doctor',
        hasPets: false,
      },
    ]

    vi.mocked(getMyRentalApplications).mockResolvedValue({
      items: mockItems,
      total: 3,
      page: 1,
      limit: 20,
      totalPages: 1,
    })

    renderWithClient(<ApplicationList />)

    await screen.findByTestId('application-list')

    // App 1: pending
    const app1 = screen.getByTestId('application-item-app-pending-111')
    expect(app1).toBeInTheDocument()
    const detailLink = within(app1).getByRole('link', {
      name: /Căn hộ/i,
    })
    expect(detailLink).toHaveAttribute('href', '/properties/apt-1')

    // App 2: accepted with contract link
    expect(
      screen.getByTestId('application-item-app-accepted-222')
    ).toBeInTheDocument()
    const contractLink = screen.getByRole('link', {
      name: /Xem & Ký hợp đồng/i,
    })
    expect(contractLink).toHaveAttribute(
      'href',
      '/rental-applications/app-accepted-222/contract-invite'
    )

    // App 3: accepted with provisioning failed
    expect(
      screen.getByTestId('application-item-app-provisioning-333')
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Chuẩn bị hợp đồng số thất bại/i)
    ).toBeInTheDocument()
  })
})
