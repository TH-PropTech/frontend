import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { ApiClientError } from '@/shared/api/api-client'
import { ContractPdfPreview } from './contract-pdf-preview'

const mocks = vi.hoisted(() => ({ download: vi.fn(), downloadSigned: vi.fn() }))
vi.mock('../api/contracts-api', () => ({
  downloadContractArtifact: mocks.download,
  downloadSignedContractArtifact: mocks.downloadSigned,
}))

describe('ContractPdfPreview', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:pdf-1')
    URL.revokeObjectURL = vi.fn()
  })
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('shows the locked PDF inline and releases the object URL on unmount', async () => {
    mocks.download.mockResolvedValue(
      new Blob(['%PDF-1.7'], { type: 'application/pdf' })
    )
    const { unmount } = render(
      <ContractPdfPreview contractId="c-1" contractCode="HD-1" />
    )

    const frame = await screen.findByTitle('Bản PDF hợp đồng HD-1')
    expect(frame.getAttribute('src')).toContain('blob:pdf-1')
    expect(mocks.download).toHaveBeenCalledWith('c-1', 'pdf')

    unmount()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:pdf-1')
  })

  it('shows an error with a retry action when the PDF cannot be loaded', async () => {
    mocks.download.mockRejectedValueOnce(
      new Error('CONTRACT_ARTIFACT_NOT_LOCKED')
    )
    mocks.download.mockResolvedValueOnce(new Blob(['%PDF-1.7']))
    render(<ContractPdfPreview contractId="c-1" contractCode="HD-1" />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'CONTRACT_ARTIFACT_NOT_LOCKED'
    )
    screen.getByRole('button', { name: /Thử lại/ }).click()
    await waitFor(() =>
      expect(screen.getByTitle('Bản PDF hợp đồng HD-1')).toBeTruthy()
    )
  })

  it('loads the signed PAdES copy when the signed variant is requested', async () => {
    mocks.downloadSigned.mockResolvedValue(
      new Blob(['%PDF-1.7'], { type: 'application/pdf' })
    )
    render(
      <ContractPdfPreview
        contractId="c-1"
        contractCode="HD-1"
        variant="signed"
      />
    )

    expect(await screen.findByTitle('Bản PDF đã ký HD-1')).toBeInTheDocument()
    expect(mocks.downloadSigned).toHaveBeenCalledWith('c-1')
    expect(mocks.download).not.toHaveBeenCalled()
  })

  it('explains a missing signed copy instead of showing a generic error', async () => {
    mocks.downloadSigned.mockRejectedValue(
      new ApiClientError('Không thể tải nội dung được bảo vệ', 404, null)
    )
    render(
      <ContractPdfPreview
        contractId="c-1"
        contractCode="HD-1"
        variant="signed"
      />
    )

    expect(await screen.findByTestId('signed-pdf-missing')).toHaveTextContent(
      'Chưa có bản PDF đã ký'
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('clears the previous error when switching variants', async () => {
    mocks.downloadSigned.mockRejectedValue(new Error('boom'))
    mocks.download.mockResolvedValue(
      new Blob(['%PDF-1.7'], { type: 'application/pdf' })
    )
    const { rerender } = render(
      <ContractPdfPreview
        contractId="c-1"
        contractCode="HD-1"
        variant="signed"
      />
    )
    expect(await screen.findByRole('alert')).toHaveTextContent('boom')

    rerender(
      <ContractPdfPreview
        contractId="c-1"
        contractCode="HD-1"
        variant="canonical"
      />
    )

    expect(
      await screen.findByTitle('Bản PDF hợp đồng HD-1')
    ).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
