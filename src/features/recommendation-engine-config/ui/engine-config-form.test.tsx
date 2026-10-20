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
      screen.getByText('Đang tải cấu hình gợi ý căn hộ...')
    ).toBeInTheDocument()
  })

  it('renders strategy options and hyperparameters once loaded', async () => {
    render(<EngineConfigForm />)

    await waitFor(() => {
      expect(
        screen.getByText('Chọn cách hệ thống gợi ý căn hộ')
      ).toBeInTheDocument()
    })

    // Tên "Cân bằng" xuất hiện ở thanh trạng thái và ở thẻ chiến lược
    expect(screen.getAllByText(/^Cân bằng$/)).toHaveLength(2)
    expect(screen.getByText(/Thận trọng khi ít dữ liệu$/)).toBeInTheDocument()
    expect(screen.getByText(/Ưu tiên tiêu chí quan trọng$/)).toBeInTheDocument()
    expect(screen.getByText(/Nâng cao \(gộp cả hai\)$/)).toBeInTheDocument()
    expect(
      screen.getByText('Mức thận trọng khi ít dữ liệu (α)')
    ).toBeInTheDocument()
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
      name: /Lưu & áp dụng/i,
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

  it('opens the explainer dialog without changing the selected strategy', async () => {
    render(<EngineConfigForm />)

    const infoBtn = await screen.findByRole('button', {
      name: 'Giải thích cách gợi ý Thận trọng khi ít dữ liệu',
    })
    fireEvent.click(infoBtn)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveTextContent('Nói đơn giản')
    expect(dialog).toHaveTextContent('Nguồn tham khảo')
    expect(dialog).toHaveTextContent('Murphy, K. P. (2012)')

    // Click bên trong hộp thoại không được chọn chiến lược MAP
    fireEvent.click(dialog)
    expect(
      (
        screen.getByRole('radio', {
          name: /Cân bằng/,
          hidden: true,
        }) as HTMLInputElement
      ).checked
    ).toBe(true)
  })

  it('handles reset to default configuration', async () => {
    render(<EngineConfigForm />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Về mặc định/i })
      ).toBeInTheDocument()
    })

    const resetBtn = screen.getByRole('button', {
      name: /Về mặc định/i,
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
