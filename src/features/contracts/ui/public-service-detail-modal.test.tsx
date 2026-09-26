import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PublicServiceDetailModal } from './public-service-detail-modal'
import {
  HOUSING_LAW_SOURCE,
  makeLegalSource,
} from '../test-fixtures/legal-sources.fixture'

describe('PublicServiceDetailModal', () => {
  it('renders nothing when source is null', () => {
    const { container } = render(
      <PublicServiceDetailModal source={null} onClose={vi.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders procedure details from the given source', () => {
    const source = makeLegalSource()
    const handleClose = vi.fn()
    render(
      <PublicServiceDetailModal
        source={source}
        onClose={handleClose}
        contractCode="HD-2026-TEST"
      />
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('TTHC 1.004194')).toBeInTheDocument()
    expect(screen.getByText(source.title)).toBeInTheDocument()
    expect(screen.getByText('HD-2026-TEST')).toBeInTheDocument()
    expect(screen.getByText(source.agency)).toBeInTheDocument()
    expect(screen.getByText('Tờ khai CT01')).toBeInTheDocument()
    expect(screen.getByText('Có sẵn từ TH-PropTech')).toBeInTheDocument()
    expect(screen.getByText('Nộp hồ sơ trực tuyến')).toBeInTheDocument()
    expect(screen.getByText('Luật Cư trú số 68/2020/QH14')).toBeInTheDocument()
    expect(screen.getByTestId('link-legal-ground-0')).toHaveAttribute(
      'href',
      source.legalGrounds[0]?.url
    )

    const externalLink = screen.getByRole('link', {
      name: /Mở Cổng DVC Quốc gia \(Link gốc\)/i,
    })
    expect(externalLink).toHaveAttribute('href', source.externalUrl)
    expect(externalLink).toHaveAttribute('target', '_blank')
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.click(screen.getByRole('button', { name: 'Đóng' }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('labels the external link as original text for legal texts', () => {
    render(
      <PublicServiceDetailModal source={HOUSING_LAW_SOURCE} onClose={vi.fn()} />
    )

    expect(
      screen.getByRole('link', { name: /Mở văn bản gốc/i })
    ).toHaveAttribute('href', HOUSING_LAW_SOURCE.externalUrl)
    expect(screen.queryByTestId('link-legal-ground-0')).toBeNull()
  })
})
