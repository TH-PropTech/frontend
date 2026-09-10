import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PublicServiceChecklistPanel } from './public-service-checklist-panel'

const { getChecklist } = vi.hoisted(() => ({
  getChecklist: vi.fn(),
}))

vi.mock('../api/contracts-api', () => ({
  getPublicServiceChecklist: getChecklist,
}))

describe('PublicServiceChecklistPanel', () => {
  beforeEach(() => vi.clearAllMocks())

  it('shows the disclaimer and keeps the external procedure incomplete', async () => {
    getChecklist.mockResolvedValue({
      purpose: 'permanent-residence',
      externalProcedureCompleted: false,
      executionMethod: 'POC_ECONSENT',
      notarizationStatus: 'not-requested',
      officialSourceUrl:
        'https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=6007',
      disclaimer:
        'POC_ECONSENT không phải chữ ký số có chứng thư và không thay thế công chứng/chứng thực.',
      items: [
        {
          id: 'notarization-or-authentication',
          status: 'required-before-submission',
          required: true,
        },
      ],
    })

    render(<PublicServiceChecklistPanel contractId="contract-1" />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Xem checklist đăng ký thường trú' })
    )

    await waitFor(() =>
      expect(
        screen.getByText(
          'POC_ECONSENT không phải chữ ký số có chứng thư và không thay thế công chứng/chứng thực.'
        )
      ).toBeTruthy()
    )
    expect(screen.getByText('Thủ tục bên ngoài chưa hoàn tất')).toBeTruthy()
    expect(getChecklist).toHaveBeenCalledWith(
      'contract-1',
      'permanent-residence'
    )
    expect(
      screen.getByRole('link', { name: /hướng dẫn chính thức/ })
    ).toHaveAttribute(
      'href',
      'https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=6007'
    )
  })

  it('renders a recoverable error state', async () => {
    getChecklist.mockRejectedValue(new Error('network unavailable'))

    render(<PublicServiceChecklistPanel contractId="contract-1" />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Xem checklist đăng ký thường trú' })
    )

    await waitFor(() =>
      expect(screen.getByText('network unavailable')).toBeTruthy()
    )
  })
})
