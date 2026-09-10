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
  it('submits the observed package id and version instead of trusting a custom duration', async () => {
    mocks.create.mockResolvedValue({ _id: 'application-package-1' })
    render(
      <ApplyDialog
        apartmentId="apartment-1"
        packages={[
          {
            packageId: 'pkg-12',
            version: 3,
            durationMonths: 12,
            monthlyRent: 12000000,
            depositPolicy: { type: 'MONTHS_OF_RENT', months: 2 },
            resolvedDepositAmount: 24000000,
            status: 'active',
          },
        ]}
      />
    )
    fireEvent.click(screen.getByTestId('rental-application-trigger'))
    fireEvent.click(screen.getByTestId('rental-package-pkg-12'))
    const [occupantCount] = screen.getAllByRole('spinbutton')
    if (!occupantCount) {
      throw new Error('Expected occupant count input')
    }
    fireEvent.change(occupantCount, {
      target: { value: '1' },
    })
    const [moveInDate, occupation] = screen.getAllByRole('textbox')
    if (!moveInDate || !occupation) {
      throw new Error('Expected move-in date and occupation inputs')
    }
    fireEvent.change(moveInDate, {
      target: { value: '2030-01-01' },
    })
    fireEvent.change(occupation, {
      target: { value: 'Engineer' },
    })
    const submitButton = screen.getByTestId('rental-application-submit')
    const form = submitButton.closest('form')
    if (!form) {
      throw new Error('Expected rental application form')
    }
    fireEvent.submit(form)
    await waitFor(() =>
      expect(mocks.create).toHaveBeenCalledWith(
        expect.objectContaining({
          apartmentId: 'apartment-1',
          packageId: 'pkg-12',
          packageVersion: 3,
          leaseDurationMonths: 12,
        })
      )
    )
  })
})
