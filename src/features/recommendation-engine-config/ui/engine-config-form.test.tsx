import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { EngineConfigForm } from './engine-config-form'
import { engineConfigApi } from '../api/engine-config-api'
import type { EngineConfig } from '../model/types'

vi.mock('../api/engine-config-api', () => ({
  engineConfigApi: {
    getEngineConfig: vi.fn(),
    updateEngineConfig: vi.fn(),
  },
}))

describe('EngineConfigForm', () => {
  const mockConfig: EngineConfig = {
    strategy: 'hybrid',
    alpha: 1.0,
    nbWeight: 0.5,
    ruleWeight: 0.5,
    updatedAt: '2026-09-24T10:00:00.000Z',
    updatedBy: 'admin@th-proptech.vn',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(engineConfigApi.getEngineConfig).mockResolvedValue(mockConfig)
    vi.mocked(engineConfigApi.updateEngineConfig).mockImplementation(dto =>
      Promise.resolve({
        ...mockConfig,
        ...dto,
        updatedAt: '2026-09-24T11:00:00.000Z',
      })
    )
  })

  it('renders loading state initially', () => {
    vi.mocked(engineConfigApi.getEngineConfig).mockReturnValue(
      new Promise(() => {})
    )
    render(<EngineConfigForm />)
    expect(
      screen.getByText('Đang tải cấu hình AI Recommendation Engine...')
    ).toBeInTheDocument()
  })

  it('renders strategy options and hyperparameters once loaded', async () => {
    render(<EngineConfigForm />)

    await waitFor(() => {
      expect(
        screen.getByText('Chọn Chiến Lược Học Máy (Strategy Selection)')
      ).toBeInTheDocument()
    })

    expect(screen.getAllByText('Hybrid NB + Rule-based')).toHaveLength(2)
    expect(
      screen.getByText('MAP Bayesian (Dirichlet Prior)')
    ).toBeInTheDocument()
    expect(screen.getByText('Feature Weighted Naive Bayes')).toBeInTheDocument()
    expect(
      screen.getByText('MAP + Feature Weighting (Kết hợp)')
    ).toBeInTheDocument()
    expect(screen.getByText('Dirichlet Prior Alpha (α)')).toBeInTheDocument()
  })

  it('allows switching strategies and submitting updated config', async () => {
    render(<EngineConfigForm />)

    await waitFor(() => {
      expect(
        screen.getByText('MAP Bayesian (Dirichlet Prior)')
      ).toBeInTheDocument()
    })

    // Click on MAP strategy
    const mapOption = screen.getByText('MAP Bayesian (Dirichlet Prior)')
    fireEvent.click(mapOption)

    // Click submit
    const submitBtn = screen.getByRole('button', {
      name: /Lưu & Áp dụng Chiến Lược/i,
    })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(engineConfigApi.updateEngineConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          strategy: 'map',
        })
      )
    })
  })

  it('handles reset to default configuration', async () => {
    render(<EngineConfigForm />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Khôi phục mặc định/i })
      ).toBeInTheDocument()
    })

    const resetBtn = screen.getByRole('button', {
      name: /Khôi phục mặc định/i,
    })
    fireEvent.click(resetBtn)

    await waitFor(() => {
      expect(engineConfigApi.updateEngineConfig).toHaveBeenCalledWith(
        expect.objectContaining({
          strategy: 'hybrid',
          alpha: 1.0,
          nbWeight: 0.5,
          ruleWeight: 0.5,
        })
      )
    })
  })
})
