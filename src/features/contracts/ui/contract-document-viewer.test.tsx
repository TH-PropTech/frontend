import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  ContractDocumentViewer,
  type ContractDocumentViewerProps,
} from './contract-document-viewer'
import type { ContractDocumentView } from '../api/contracts-api'

describe('ContractDocumentViewer', () => {
  const mockDocument: ContractDocumentView = {
    mode: 'locked',
    revision: 1,
    lockedAt: '2026-03-14T00:00:00Z',
    lockedHash: '0x1234567890abcdef',
    hashSchemaVersion: 1,
    legalProfile: null,
    templateVersion: '1.0',
    sections: [
      {
        id: 'article-1',
        number: 1,
        title: 'Đối tượng hợp đồng và mô tả căn hộ',
        content: 'Bên A đồng ý cho Bên B thuê căn hộ 101 chung cư Sunrise.',
        protected: true,
        hash: 'hash-1',
      },
      {
        id: 'article-2',
        number: 2,
        title: 'Mục đích sử dụng',
        content: 'Căn hộ chỉ được sử dụng cho mục đích để ở.',
        protected: false,
        hash: 'hash-2',
      },
    ],
    annexes: [
      {
        id: 'annex-1',
        title: 'Biên bản bàn giao hiện trạng',
        description: 'Mô tả chi tiết trang thiết bị bàn giao',
        required: true,
      },
      {
        id: 'annex-2',
        title: 'Nội quy nhà chung cư và an toàn PCCC',
        description: 'Quy chuẩn an toàn chung cư',
        required: true,
      },
    ],
    integrity: 'valid',
  }

  const defaultProps: ContractDocumentViewerProps = {
    document: mockDocument,
    contractCode: 'HD-2026-001',
    status: 'awaiting-signature',
    networkMode: 'simulation',
  }

  it('renders National Header, contract code, status and watermark', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    expect(
      screen.getByText(/CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM/i)
    ).toBeInTheDocument()
    expect(screen.getByText('HD-2026-001')).toBeInTheDocument()
    expect(screen.getByText(/awaiting-signature/i)).toBeInTheDocument()
    expect(screen.getByTestId('simulation-banner')).toBeInTheDocument()
    expect(screen.getByTestId('contract-watermark')).toBeInTheDocument()
  })

  it('keeps the A4 paper padding compact beside the workspace sidebar', () => {
    render(<ContractDocumentViewer {...defaultProps} />)

    expect(screen.getByTestId('contract-document-paper')).toHaveClass('md:p-10')
  })

  it('renders articles with protected badges', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    expect(
      screen.getByText('Điều 1. Đối tượng hợp đồng và mô tả căn hộ')
    ).toBeInTheDocument()
    expect(screen.getByText('Điều 2. Mục đích sử dụng')).toBeInTheDocument()
    expect(screen.getByText('Bảo vệ')).toBeInTheDocument()
  })

  it('renders annexes with required badges', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    expect(screen.getByText('Biên bản bàn giao hiện trạng')).toBeInTheDocument()
    expect(
      screen.getByText('Nội quy nhà chung cư và an toàn PCCC')
    ).toBeInTheDocument()
    expect(screen.getAllByText('Bắt buộc')).toHaveLength(2)
  })

  it('filters articles by search input', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    const searchInput = screen.getByLabelText('Tìm kiếm điều khoản')
    fireEvent.change(searchInput, { target: { value: 'mục đích' } })

    expect(
      screen.queryByText('Điều 1. Đối tượng hợp đồng và mô tả căn hộ')
    ).not.toBeInTheDocument()
    expect(screen.getByText('Điều 2. Mục đích sử dụng')).toBeInTheDocument()
  })

  it('shows empty message when search yields no results', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    const searchInput = screen.getByLabelText('Tìm kiếm điều khoản')
    fireEvent.change(searchInput, {
      target: { value: 'từ khóa không tồn tại' },
    })

    expect(
      screen.getByText(/Không tìm thấy điều khoản phù hợp/i)
    ).toBeInTheDocument()
  })

  it('filters articles by section selector', () => {
    render(<ContractDocumentViewer {...defaultProps} />)
    const select = screen.getByLabelText('Lọc theo điều khoản')
    fireEvent.change(select, { target: { value: 'article-1' } })

    expect(
      screen.getByText('Điều 1. Đối tượng hợp đồng và mô tả căn hộ')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Điều 2. Mục đích sử dụng')
    ).not.toBeInTheDocument()
  })

  it('triggers onDownloadPdf and onDownloadDocx when buttons clicked', () => {
    const onDownloadPdf = vi.fn()
    const onDownloadDocx = vi.fn()
    render(
      <ContractDocumentViewer
        {...defaultProps}
        onDownloadPdf={onDownloadPdf}
        onDownloadDocx={onDownloadDocx}
      />
    )

    fireEvent.click(screen.getByLabelText('Tải bản PDF'))
    expect(onDownloadPdf).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByLabelText('Tải bản DOCX'))
    expect(onDownloadDocx).toHaveBeenCalledTimes(1)
  })

  it('triggers window.print when print button clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    render(<ContractDocumentViewer {...defaultProps} />)

    fireEvent.click(screen.getByLabelText('In hợp đồng'))
    expect(printSpy).toHaveBeenCalledTimes(1)
    printSpy.mockRestore()
  })
})
