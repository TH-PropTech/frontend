import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiClientError } from '@/shared/api'
import { downloadContractEvidencePackage } from '../api/contracts-api'
import { EvidencePackageDownload } from './evidence-package-download'

vi.mock('../api/contracts-api', () => ({
  downloadContractEvidencePackage: vi.fn(),
}))

const createObjectURL = vi.fn(() => 'blob:package-1')
const revokeObjectURL = vi.fn()
let click: ReturnType<typeof vi.spyOn>

function stubObjectUrls(
  createObjectURL: () => string,
  revokeObjectURL: (url: string) => void
): void {
  Object.defineProperty(URL, 'createObjectURL', {
    value: createObjectURL,
    configurable: true,
    writable: true,
  })
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: revokeObjectURL,
    configurable: true,
    writable: true,
  })
}

function restoreObjectUrls(): void {
  Reflect.deleteProperty(URL, 'createObjectURL')
  Reflect.deleteProperty(URL, 'revokeObjectURL')
}

function domainError(code: string, status: number): ApiClientError {
  return new ApiClientError('raw', status, {
    code: `HTTP_${status}`,
    message: 'raw',
    details: { code },
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  stubObjectUrls(createObjectURL, revokeObjectURL)
  click = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => undefined)
})

afterEach(() => {
  restoreObjectUrls()
  click.mockRestore()
})

describe('EvidencePackageDownload', () => {
  it('downloads the package with the server filename and cleans up the Blob URL', async () => {
    const user = userEvent.setup()
    const blob = new Blob(['zip'], { type: 'application/zip' })
    vi.mocked(downloadContractEvidencePackage).mockResolvedValue({
      blob,
      filename: 'evidence-HD-1.zip',
      contentType: 'application/zip',
    })
    render(<EvidencePackageDownload contractId="contract-1" />)

    await user.click(screen.getByRole('button', { name: /Tải gói bằng chứng/ }))

    expect(downloadContractEvidencePackage).toHaveBeenCalledWith('contract-1')
    await waitFor(() => expect(createObjectURL).toHaveBeenCalledWith(blob))
    const anchor = click.mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe('evidence-HD-1.zip')
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Đã tải evidence-HD-1.zip'
    )
    await waitFor(() =>
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:package-1')
    )
  })

  it('falls back to a deterministic filename when the header is unreadable', async () => {
    const user = userEvent.setup()
    vi.mocked(downloadContractEvidencePackage).mockResolvedValue({
      blob: new Blob(['zip']),
      filename: null,
      contentType: 'application/zip',
    })
    render(<EvidencePackageDownload contractId="contract-1" />)
    await user.click(screen.getByRole('button', { name: /Tải gói bằng chứng/ }))
    await waitFor(() => expect(click).toHaveBeenCalled())
    expect((click.mock.contexts[0] as HTMLAnchorElement).download).toBe(
      'evidence-package-contract-1.zip'
    )
  })

  it('is disabled and busy while the package is being prepared, and ignores repeat clicks', async () => {
    const user = userEvent.setup()
    let finish: (value: {
      blob: Blob
      filename: string | null
      contentType: string | null
    }) => void = () => undefined
    vi.mocked(downloadContractEvidencePackage).mockReturnValue(
      new Promise(resolve => {
        finish = resolve
      })
    )
    render(<EvidencePackageDownload contractId="contract-1" />)

    const button = screen.getByRole('button', { name: /Tải gói bằng chứng/ })
    await user.click(button)
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Đang tạo gói bằng chứng...')).toBeInTheDocument()
    await user.click(button)
    expect(downloadContractEvidencePackage).toHaveBeenCalledTimes(1)

    finish({ blob: new Blob(['zip']), filename: 'a.zip', contentType: null })
    await waitFor(() => expect(button).toBeEnabled())
  })

  it('can be disabled by the caller', () => {
    render(<EvidencePackageDownload contractId="contract-1" disabled />)
    expect(
      screen.getByRole('button', { name: /Tải gói bằng chứng/ })
    ).toBeDisabled()
  })

  it.each([
    [403, 'HTTP_403', /quyền/],
    [404, 'HTTP_404', /Không tìm thấy/],
  ])(
    'maps a %s response to a readable error',
    async (status, _code, pattern) => {
      const user = userEvent.setup()
      vi.mocked(downloadContractEvidencePackage).mockRejectedValue(
        new ApiClientError('raw', status, null)
      )
      render(<EvidencePackageDownload contractId="contract-1" />)
      await user.click(
        screen.getByRole('button', { name: /Tải gói bằng chứng/ })
      )
      expect(await screen.findByRole('alert')).toHaveTextContent(pattern)
      expect(createObjectURL).not.toHaveBeenCalled()
    }
  )

  it.each([
    ['EVIDENCE_PACKAGE_INCOMPLETE', 422, /chưa đầy đủ/],
    ['EVIDENCE_PACKAGE_TOO_LARGE', 413, /quá lớn/],
    ['EVIDENCE_ARTIFACT_MISMATCH', 409, /toàn vẹn/],
  ])('maps the stable code %s', async (code, status, pattern) => {
    const user = userEvent.setup()
    vi.mocked(downloadContractEvidencePackage).mockRejectedValue(
      domainError(code, status)
    )
    render(<EvidencePackageDownload contractId="contract-1" />)
    await user.click(screen.getByRole('button', { name: /Tải gói bằng chứng/ }))
    expect(await screen.findByRole('alert')).toHaveTextContent(pattern)
    expect(
      screen.getByRole('button', { name: /Tải gói bằng chứng/ })
    ).toBeEnabled()
  })

  it('clears the previous error when retrying successfully', async () => {
    const user = userEvent.setup()
    vi.mocked(downloadContractEvidencePackage)
      .mockRejectedValueOnce(domainError('EVIDENCE_PACKAGE_INCOMPLETE', 422))
      .mockResolvedValueOnce({
        blob: new Blob(['zip']),
        filename: 'ok.zip',
        contentType: null,
      })
    render(<EvidencePackageDownload contractId="contract-1" />)
    const button = screen.getByRole('button', { name: /Tải gói bằng chứng/ })
    await user.click(button)
    await screen.findByRole('alert')
    await user.click(button)
    await waitFor(() =>
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    )
    expect(await screen.findByRole('status')).toHaveTextContent('Đã tải ok.zip')
  })

  it('never inspects the package contents in the browser', async () => {
    const user = userEvent.setup()
    const blob = new Blob(['zip'])
    const blobWithReaders = blob as Blob & {
      arrayBuffer: () => Promise<ArrayBuffer>
      text: () => Promise<string>
      stream: () => ReadableStream<Uint8Array>
      slice: Blob['slice']
    }
    Object.assign(blobWithReaders, {
      arrayBuffer: async () => new ArrayBuffer(0),
      text: async () => '',
      stream: () => new ReadableStream<Uint8Array>(),
      slice: blob.slice.bind(blob),
    })
    const spies = [
      vi.spyOn(blobWithReaders, 'arrayBuffer'),
      vi.spyOn(blobWithReaders, 'text'),
      vi.spyOn(blobWithReaders, 'stream'),
      vi.spyOn(blobWithReaders, 'slice'),
    ]
    vi.mocked(downloadContractEvidencePackage).mockResolvedValue({
      blob,
      filename: 'a.zip',
      contentType: 'application/zip',
    })
    render(<EvidencePackageDownload contractId="contract-1" />)
    await user.click(screen.getByRole('button', { name: /Tải gói bằng chứng/ }))
    await screen.findByRole('status')
    for (const spy of spies) expect(spy).not.toHaveBeenCalled()
  })
})
