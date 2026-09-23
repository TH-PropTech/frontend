import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  PublicServiceDetailModal,
  PROCEDURES_DATA,
  type PublicServiceProcedureKey,
} from './public-service-detail-modal'

describe('PublicServiceDetailModal', () => {
  it('renders nothing when procedureKey is null', () => {
    const { container } = render(
      <PublicServiceDetailModal procedureKey={null} onClose={vi.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders full modal details for TTHC 1.004194 (Đăng ký tạm trú)', () => {
    const handleClose = vi.fn()
    render(
      <PublicServiceDetailModal
        procedureKey="1.004194"
        onClose={handleClose}
        contractCode="HD-2026-TEST"
      />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('TTHC 1.004194')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Đăng ký tạm trú / Thường trú tại chỗ ở hợp pháp do thuê'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('HD-2026-TEST')).toBeInTheDocument()

    // Overview fields
    expect(
      screen.getByText('Công an Xã / Phường / Thị trấn nơi có căn hộ cho thuê')
    ).toBeInTheDocument()
    expect(screen.getAllByText(/03 ngày làm việc/).length).toBeGreaterThan(0)

    // Dossier items
    expect(
      screen.getByText('Tờ khai thay đổi thông tin cư trú (Mẫu CT01)')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Hợp đồng thuê nhà điện tử đã khóa SHA-256')
    ).toBeInTheDocument()
    expect(screen.getByText('Có sẵn từ TH-PropTech')).toBeInTheDocument()

    // Steps
    expect(
      screen.getByText('Trích xuất Hợp đồng & Mã hash từ TH-PropTech')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Nộp hồ sơ trực tuyến TTHC 1.004194')
    ).toBeInTheDocument()

    // Legal grounds
    expect(screen.getByText('Luật Cư trú số 68/2020/QH14')).toBeInTheDocument()

    // External link
    const externalLink = screen.getByRole('link', {
      name: /Mở Cổng DVC Quốc gia \(Link gốc\)/i,
    })
    expect(externalLink).toHaveAttribute(
      'href',
      PROCEDURES_DATA['1.004194'].externalUrl
    )
    expect(externalLink).toHaveAttribute('target', '_blank')

    // Close button
    const closeBtn = screen.getByRole('button', { name: 'Đóng' })
    fireEvent.click(closeBtn)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders modal details for TTHC 1.007689 (Khai thuế)', () => {
    render(
      <PublicServiceDetailModal procedureKey="1.007689" onClose={vi.fn()} />
    )

    expect(screen.getByText('TTHC 1.007689')).toBeInTheDocument()
    expect(
      screen.getByText('Khai thuế đối với cá nhân cho thuê tài sản')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Tờ khai thuế đối với hoạt động cho thuê tài sản (Mẫu 01/TTS)'
      )
    ).toBeInTheDocument()
  })

  it('renders statutory legal references when selecting decree/law', () => {
    const keys: PublicServiceProcedureKey[] = [
      'nd96-2024',
      'housing-law-2023',
      'civil-code-2015',
    ]

    for (const key of keys) {
      const { unmount } = render(
        <PublicServiceDetailModal procedureKey={key} onClose={vi.fn()} />
      )
      expect(screen.getByText(PROCEDURES_DATA[key].code)).toBeInTheDocument()
      expect(
        screen.getAllByText(PROCEDURES_DATA[key].title).length
      ).toBeGreaterThan(0)
      unmount()
    }
  })
})
