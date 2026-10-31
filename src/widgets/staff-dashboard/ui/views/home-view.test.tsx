import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HomeView } from './home-view'
import { apiClient } from '@/shared/api/api-client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

vi.mock('@/shared/api/api-client', () => ({
  apiClient: { get: vi.fn() },
}))

const mockUseAuditOverview = vi.fn()
vi.mock('@/features/fabric-audit', () => ({
  useAuditOverview: () => mockUseAuditOverview(),
}))

function renderWithClient(ui: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('HomeView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuditOverview.mockReturnValue({
      isError: true,
      data: null,
      isLoading: false,
    })
  })

  it('renders dynamic counts from operations stats and hides hardcoded today progress', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      apartments: { pending: 5, total: 10, available: 5, rejected: 0 },
      kyc: { pending: 1, total: 5, verified: 4, rejected: 0 },
      tickets: { open: 2, total: 2, inProgress: 0, resolved: 0 },
      bookings: { total: 0, pending: 0, confirmed: 0, completed: 0 },
    })

    renderWithClient(<HomeView onNavigateTab={vi.fn()} />)

    expect(
      await screen.findByText('5 tin đang chờ kiểm định pháp lý & VR')
    ).toBeTruthy()
    expect(screen.getByText('1 người dùng chờ đối soát CCCD')).toBeTruthy()

    // Ensure hardcoded 14 / 20 today progress is completely removed
    expect(screen.queryByText(/14 \/ 20/)).toBeNull()
    expect(screen.queryByText('Tiến độ hôm nay')).toBeNull()
  })

  it('displays empty message when no KYC or apartment listings are pending', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      apartments: { pending: 0, total: 10, available: 10, rejected: 0 },
      kyc: { pending: 0, total: 5, verified: 5, rejected: 0 },
      tickets: { open: 0, total: 0, inProgress: 0, resolved: 0 },
      bookings: { total: 0, pending: 0, confirmed: 0, completed: 0 },
    })

    renderWithClient(<HomeView onNavigateTab={vi.fn()} />)

    expect(await screen.findByText('Không có tin chờ duyệt')).toBeTruthy()
    expect(screen.getByText('Không có hồ sơ chờ')).toBeTruthy()
  })

  it('displays non-hardcoded Fabric status and does not show static 100% sync or Server status Online', async () => {
    mockUseAuditOverview.mockReturnValue({
      isError: true,
      data: null,
      isLoading: false,
    })
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      apartments: { pending: 0 },
      kyc: { pending: 0 },
      tickets: { open: 0 },
      bookings: { total: 0 },
    })

    renderWithClient(<HomeView onNavigateTab={vi.fn()} />)

    expect(
      await screen.findByText('Lưu vết chống sửa đổi: không khả dụng')
    ).toBeTruthy()
    expect(screen.queryByText('Server status: Online')).toBeNull()
    expect(screen.queryByText('Blockchain Sync: 100%')).toBeNull()
  })
})
