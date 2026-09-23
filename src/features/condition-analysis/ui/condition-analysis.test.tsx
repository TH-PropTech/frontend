import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConditionAnalysisPanel } from './condition-analysis-panel'

const api = vi.hoisted(() => ({
  getMyConditionAnalyses: vi.fn(),
  analyzeConditionImage: vi.fn(),
  getConditionAnalysisImage: vi.fn(),
}))

vi.mock('../api/condition-analysis-api', () => api)

function renderPanel(): void {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <ConditionAnalysisPanel apartmentId="apt-1" />
    </QueryClientProvider>
  )
}

describe('ConditionAnalysisPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders explicit empty and advisory states', async () => {
    api.getMyConditionAnalyses.mockResolvedValue([])
    renderPanel()

    expect(
      await screen.findByText('Chưa có lần phân tích nào.')
    ).toBeInTheDocument()
    expect(
      screen.getByText(/không thay thế kiểm định kỹ thuật/i)
    ).toBeInTheDocument()
  })

  it('renders a safe error state without fabricated analysis data', async () => {
    api.getMyConditionAnalyses.mockRejectedValue(new Error('network'))
    renderPanel()

    expect(
      await screen.findByText(/Không thể phân tích hoặc tải kết quả/i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/Kết quả gần nhất/)).not.toBeInTheDocument()
  })
})
