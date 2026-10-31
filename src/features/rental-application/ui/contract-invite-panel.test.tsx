import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { ContractInvitePanel } from './contract-invite-panel'
import * as api from '../api/rental-application-api'

vi.mock('../api/rental-application-api', () => ({
  getMyRentalApplicationById: vi.fn(),
}))

const BANNED = /eKYC|SmartCA|Hyperledger|bất biến|blockchain|sổ cái/i

function renderPanel() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={client}>
      <ContractInvitePanel applicationId="abc123456789" />
    </QueryClientProvider>
  )
}

describe('ContractInvitePanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('hiện đề nghị ký bằng từ vựng thân thiện, không rò rỉ từ kỹ thuật', async () => {
    vi.mocked(api.getMyRentalApplicationById).mockResolvedValue({
      moveInDate: '2026-12-01',
      occupants: 2,
      contractId: 'c1',
      packageSnapshot: {
        durationMonths: 12,
        monthlyRent: 5000000,
        resolvedDepositAmount: 5000000,
      },
    } as unknown as Awaited<ReturnType<typeof api.getMyRentalApplicationById>>)
    renderPanel()

    const panel = await screen.findByTestId('contract-invite-panel')
    expect(panel.textContent).not.toMatch(BANNED)
    expect(panel.textContent).toContain('lưu vết chống sửa đổi')
    expect(screen.getByTestId('go-to-contract-btn')).toBeDefined()
  })

  it('hiện trạng thái chờ khi chưa có hợp đồng', async () => {
    vi.mocked(api.getMyRentalApplicationById).mockResolvedValue({
      moveInDate: '2026-12-01',
      occupants: 1,
    } as unknown as Awaited<ReturnType<typeof api.getMyRentalApplicationById>>)
    renderPanel()
    expect(await screen.findByText(/đang chuẩn bị hợp đồng/i)).toBeDefined()
    expect(screen.queryByTestId('go-to-contract-btn')).toBeNull()
  })

  it('hiện lỗi khi tải hồ sơ thất bại', async () => {
    vi.mocked(api.getMyRentalApplicationById).mockRejectedValue(new Error('x'))
    renderPanel()
    expect(await screen.findByTestId('contract-invite-error')).toBeDefined()
  })
})
