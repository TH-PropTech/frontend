import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LocationRiskPanel } from './location-risk-panel'

const api = vi.hoisted(() => ({ getLocationRiskScore: vi.fn() }))

vi.mock('../api/location-risk-api', () => api)

function renderPanel(): void {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <LocationRiskPanel apartmentId="507f1f77bcf86cd799439011" />
    </QueryClientProvider>
  )
}

describe('LocationRiskPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders sourced layers and the insufficient-data state', async () => {
    api.getLocationRiskScore.mockResolvedValue({
      status: 'insufficient_data',
      score: null,
      district: 'District 1',
      layers: [],
    })
    renderPanel()

    expect(
      await screen.findByText(/Chưa đủ dữ liệu để tính điểm/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/không dùng để loại căn hộ/i)).toBeInTheDocument()
  })

  it('renders an explicit recoverable error state', async () => {
    api.getLocationRiskScore.mockRejectedValue(new Error('network'))
    renderPanel()

    expect(
      await screen.findByText(/Không tải được dữ liệu rủi ro khu vực/i)
    ).toBeInTheDocument()
  })
})
