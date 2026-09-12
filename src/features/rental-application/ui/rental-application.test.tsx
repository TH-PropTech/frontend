import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApplyDialog } from './apply-dialog'
import { ApplicationList } from './application-list'
import { ApplicationStatusBadge } from './application-status-badge'

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  getMine: vi.fn(),
  getContext: vi.fn(),
}))

vi.mock('../api/rental-application-api', () => ({
  createRentalApplication: mocks.create,
  getMyRentalApplications: mocks.getMine,
  getRentalApplicationContext: mocks.getContext,
}))

const context = {
  enabled: true,
  eligible: true,
  reasonCode: null,
  listing: {
    id: 'apartment-1',
    title: 'Căn hộ',
    address: 'Địa chỉ',
    area: 68,
    status: 'available',
    landlordDisplayName: 'Owner',
  },
  pricingRevision: 1,
  packages: [
    {
      packageId: 'pkg-12',
      version: 3,
      durationMonths: 12,
      monthlyRent: 12000000,
      depositPolicy: { type: 'MONTHS_OF_RENT' as const, months: 2 },
      resolvedDepositAmount: 24000000,
      status: 'active' as const,
      currency: 'VND' as const,
    },
  ],
  disclosure: {
    version: 'rental-review-v1',
    hash: 'hash',
    items: [
      {
        id: 'listing-terms',
        title: 'Điều kiện tin đăng',
        body: 'Đã kiểm tra.',
        required: true,
      },
      {
        id: 'pre-contract-request',
        title: 'Yêu cầu tiền hợp đồng',
        body: 'Chưa phải hợp đồng.',
        required: true,
      },
      {
        id: 'future-payment-and-signing',
        title: 'Thanh toán và ký',
        body: 'Thực hiện sau.',
        required: true,
      },
    ],
  },
}

describe('rental application UI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getContext.mockResolvedValue(context)
  })

  it('requires review acknowledgements before submitting', async () => {
    mocks.create.mockResolvedValue({ _id: 'application-1' })
    render(<ApplyDialog apartmentId="apartment-1" />)
    fireEvent.click(screen.getByTestId('rental-application-trigger'))
    await screen.findByLabelText('Số người ở')
    fireEvent.change(screen.getByLabelText('Ngày dự kiến vào ở'), {
      target: { value: '2030-01-01' },
    })
    fireEvent.change(screen.getByLabelText('Nghề nghiệp'), {
      target: { value: 'Engineer' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục chọn gói' }))
    fireEvent.click(screen.getByRole('button', { name: 'Xem điều khoản' }))
    expect(screen.getByTestId('rental-application-submit')).toBeDisabled()
    for (const checkbox of screen.getAllByRole('checkbox'))
      fireEvent.click(checkbox)
    fireEvent.click(screen.getByTestId('rental-application-submit'))
    await waitFor(() => expect(mocks.create).toHaveBeenCalled())
    expect(mocks.create).toHaveBeenCalledWith(
      expect.objectContaining({
        packageId: 'pkg-12',
        packageVersion: 3,
        disclosureVersion: 'rental-review-v1',
        acknowledgedDisclosureIds: expect.arrayContaining(['listing-terms']),
      })
    )
  })

  it('renders status and an empty application list', async () => {
    mocks.getMine.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    })
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    render(
      <QueryClientProvider client={client}>
        <ApplicationStatusBadge status="accepted" />
        <ApplicationList />
      </QueryClientProvider>
    )
    expect(screen.getByText(/Đã chấp nhận/i)).toBeTruthy()
    expect(await screen.findByText(/Chưa có hồ sơ ứng tuyển/i)).toBeTruthy()
  })
})
