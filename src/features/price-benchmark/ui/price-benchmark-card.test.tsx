import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PriceBenchmarkCard } from './price-benchmark-card'

const getBenchmark = vi.hoisted(() => vi.fn())
vi.mock('../api/price-benchmark-api', () => ({
  getPriceBenchmark: getBenchmark,
}))

function renderCard(): void {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <PriceBenchmarkCard
        criteria={{
          district: 'Quận 7',
          bedrooms: 2,
          priceMonthly: 15_000_000,
          area: 70,
        }}
      />
    </QueryClientProvider>
  )
}

describe('PriceBenchmarkCard', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders the insufficient-data state truthfully', async () => {
    getBenchmark.mockResolvedValue({
      median: null,
      p25: null,
      p75: null,
      range: null,
      sampleCount: 3,
      excludedOutliers: 0,
      confidence: 'insufficient',
      classification: 'not_enough_data',
      calculatedAt: '2026-08-11T00:00:00.000Z',
      criteria: { district: 'Quận 7', bedrooms: 2, area: 70, furniture: null },
    })
    renderCard()
    expect(await screen.findByText(/chưa đủ dữ liệu so sánh/i)).toBeTruthy()
    expect(screen.getByText(/3 tin phù hợp/i)).toBeTruthy()
  })

  it('renders a fair-range classification with confidence', async () => {
    getBenchmark.mockResolvedValue({
      median: 15_000_000,
      p25: 14_000_000,
      p75: 16_000_000,
      range: { min: 14_000_000, max: 16_000_000 },
      sampleCount: 12,
      excludedOutliers: 1,
      confidence: 'medium',
      classification: 'fair_range',
      calculatedAt: '2026-08-11T00:00:00.000Z',
      criteria: { district: 'Quận 7', bedrooms: 2, area: 70, furniture: null },
    })
    renderCard()
    expect(await screen.findByText(/trong khoảng thị trường/i)).toBeTruthy()
    expect(screen.getByText(/độ tin cậy trung bình/i)).toBeTruthy()
  })
})
