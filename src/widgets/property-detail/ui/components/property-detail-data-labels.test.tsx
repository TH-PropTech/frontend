import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'
import type { ApartmentItem } from '@/entities/properties'
import { PriceTrendPanel } from './price-trend-panel'
import { PropertyReviews } from './property-reviews'

vi.mock('@/features/apartment-insights', async importOriginal => ({
  ...(await importOriginal<typeof import('@/features/apartment-insights')>()),
  getApartmentInsights: vi.fn().mockResolvedValue({
    priceTrend: {
      months: ['2026-06', '2026-07'],
      apartment: [12_000_000, 13_000_000],
      project: [12_500_000, 12_800_000],
      district: null,
      projectName: 'Dự án thử nghiệm',
      districtName: 'Quận 1',
      projectSampleCount: 4,
      districtSampleCount: 0,
    },
    trust: {
      score: 65,
      items: [
        {
          key: 'landlord-kyc',
          label: 'Chủ hộ đã xác minh định danh (KYC Landlord)',
          ok: true,
          points: 30,
          maxPoints: 30,
        },
        {
          key: 'ledger',
          label: 'Có hợp đồng đã ghi nhận trên Blockchain',
          ok: false,
          points: 0,
          maxPoints: 15,
        },
      ],
    },
  }),
}))

const property = {
  id: 'property-1',
  title: 'Căn hộ thử nghiệm',
  priceNum: 13,
  areaNum: 65,
  bedrooms: 2,
  bathrooms: 1,
  price: '13 triệu/tháng',
  area: '65 m2',
  projectName: 'Dự án thử nghiệm',
  isVerified: true,
} as ApartmentItem

describe('property detail data sources', () => {
  it('renders trust score and trend legend from the API response', async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    render(
      <QueryClientProvider client={client}>
        <PriceTrendPanel property={property} onExplain={vi.fn()} />
      </QueryClientProvider>
    )

    expect(await screen.findByText('65% Điểm Tín nhiệm')).toBeTruthy()
    expect(screen.getByText('Căn hộ này')).toBeTruthy()
    expect(screen.getByText('Dự án trung bình')).toBeTruthy()
    expect(screen.queryByText('Khu vực lân cận')).toBeNull()
    expect(screen.queryByText('Dữ liệu minh hoạ')).toBeNull()
  })

  it('still labels the static reviews panel as illustrative data', () => {
    render(<PropertyReviews />)
    expect(screen.getAllByText('Dữ liệu minh hoạ')).toHaveLength(1)
  })
})
