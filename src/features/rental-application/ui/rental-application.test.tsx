import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApplyDialog } from './apply-dialog'
import { ApplicationList } from './application-list'
import { ApplicationStatusBadge } from './application-status-badge'

const mocks = vi.hoisted(() => ({ create: vi.fn(), getMine: vi.fn() }))
vi.mock('../api/rental-application-api', () => ({
  createRentalApplication: mocks.create,
  getMyRentalApplications: mocks.getMine,
}))
describe('rental application UI', () => {
  beforeEach(() => vi.clearAllMocks())
  it('requires complete terms and submits them', async () => {
    mocks.create.mockResolvedValue({ _id: 'application-1' })
    render(<ApplyDialog apartmentId="apartment-1" />)
    fireEvent.click(screen.getByRole('button', { name: /ứng tuyển thuê căn/i }))
    fireEvent.change(screen.getByLabelText(/số người ở/i), {
      target: { value: '2' },
    })
    fireEvent.change(screen.getByLabelText(/ngày dự kiến vào ở/i), {
      target: { value: '2030-01-01' },
    })
    fireEvent.change(screen.getByLabelText(/thời hạn thuê/i), {
      target: { value: '12' },
    })
    fireEvent.change(screen.getByLabelText(/nghề nghiệp/i), {
      target: { value: 'Engineer' },
    })
    fireEvent.click(screen.getByRole('button', { name: /gửi ứng tuyển/i }))
    await waitFor(() => expect(mocks.create).toHaveBeenCalled())
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
    expect(screen.getByText(/đã chấp nhận/i)).toBeTruthy()
    expect(await screen.findByText(/chưa có hồ sơ ứng tuyển/i)).toBeTruthy()
  })
})
