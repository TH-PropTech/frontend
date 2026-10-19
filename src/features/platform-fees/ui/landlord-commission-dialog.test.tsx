import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { LandlordCommissionDialog } from './landlord-commission-dialog'

const mocks = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }))
vi.mock('@/shared/api', async importOriginal => {
  const actual = await importOriginal<typeof import('@/shared/api')>()
  return { ...actual, apiClient: { ...actual.apiClient, ...mocks } }
})

const preview = {
  scheduleAvailable: true,
  dueDaysAfterActivation: 7,
  vatRatePercent: 10,
  pricesIncludeVat: false,
  landlordText: 'Phí tính một lần theo hợp đồng.',
  packages: [
    {
      durationMonths: 12,
      monthlyRent: 10_000_000,
      applicable: true,
      amountBeforeVat: 5_000_000,
      vatAmount: 500_000,
      amount: 5_500_000,
    },
    {
      durationMonths: 3,
      monthlyRent: 10_000_000,
      applicable: false,
      amountBeforeVat: null,
      vatAmount: null,
      amount: null,
    },
  ],
}

function renderDialog(
  props: Parameters<typeof LandlordCommissionDialog>[0]
): void {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <LandlordCommissionDialog {...props} />
    </QueryClientProvider>
  )
}

describe('LandlordCommissionDialog', () => {
  afterEach(() => {
    cleanup()
    mocks.get.mockReset()
    mocks.post.mockReset()
  })

  it('does not fetch until opened, then shows the table via GET', async () => {
    mocks.get.mockResolvedValue(preview)
    renderDialog({ apartmentId: 'apt-1' })
    expect(mocks.get).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Xem phí hoa hồng' }))

    expect(await screen.findByText('Phí hoa hồng nền tảng')).toBeTruthy()
    expect(await screen.findByText('12 tháng')).toBeTruthy()
    expect(mocks.get).toHaveBeenCalledWith(
      '/platform-fees/apartments/apt-1/commission'
    )
    expect(screen.getByText(/5\.500\.000/)).toBeTruthy()
    expect(screen.getByText('Không thu phí')).toBeTruthy()
    expect(screen.getByText('Phí tính một lần theo hợp đồng.')).toBeTruthy()
    expect(screen.getByText(/trong vòng 7 ngày/)).toBeTruthy()
  })

  it('posts draft packages for the preview', async () => {
    mocks.post.mockResolvedValue(preview)
    const packages = [{ durationMonths: 12, monthlyRent: 10_000_000 }]
    renderDialog({ packages })
    fireEvent.click(screen.getByRole('button', { name: 'Xem phí hoa hồng' }))
    await screen.findByText('12 tháng')
    expect(mocks.post).toHaveBeenCalledWith(
      '/platform-fees/landlord-commission/preview',
      { packages }
    )
  })

  it('handles unavailable schedule, empty packages and errors', async () => {
    mocks.get.mockResolvedValueOnce({
      ...preview,
      scheduleAvailable: false,
      packages: [],
    })
    renderDialog({ apartmentId: 'a' })
    fireEvent.click(screen.getByRole('button', { name: 'Xem phí hoa hồng' }))
    expect(await screen.findByText('Chưa có biểu phí áp dụng.')).toBeTruthy()
    cleanup()

    mocks.get.mockResolvedValueOnce({ ...preview, packages: [] })
    renderDialog({ apartmentId: 'b' })
    fireEvent.click(screen.getByRole('button', { name: 'Xem phí hoa hồng' }))
    expect(
      await screen.findByText('Căn hộ chưa cấu hình gói thuê.')
    ).toBeTruthy()
    cleanup()

    mocks.get.mockRejectedValueOnce(new Error('boom'))
    renderDialog({ apartmentId: 'c' })
    fireEvent.click(screen.getByRole('button', { name: 'Xem phí hoa hồng' }))
    expect(await screen.findByRole('alert')).toBeTruthy()
  })
})
