import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiClientError } from '@/shared/api'
import {
  describeEvidencePackageError,
  resolveEvidencePackageFilename,
  saveBlobAsFile,
} from './evidence-package'

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

afterEach(() => {
  restoreObjectUrls()
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

describe('resolveEvidencePackageFilename', () => {
  it('uses the server filename when it is a safe zip name', () => {
    expect(resolveEvidencePackageFilename('evidence-HD-1.zip', 'c1')).toBe(
      'evidence-HD-1.zip'
    )
  })

  it('falls back to a deterministic name when the header is missing', () => {
    expect(resolveEvidencePackageFilename(null, 'contract-1')).toBe(
      'evidence-package-contract-1.zip'
    )
  })

  it('appends .zip when the server omitted the extension', () => {
    expect(resolveEvidencePackageFilename('package', 'c1')).toBe('package.zip')
  })

  it('sanitizes unsafe characters in the contract id fallback', () => {
    expect(resolveEvidencePackageFilename(null, '../a b/c')).toBe(
      'evidence-package-a-b-c.zip'
    )
  })
})

describe('describeEvidencePackageError', () => {
  function domain(code: string, status: number): ApiClientError {
    return new ApiClientError('raw', status, {
      code: `HTTP_${status}`,
      message: 'raw',
      details: { code },
    })
  }

  it('explains incomplete evidence, oversized packages and artifact mismatch', () => {
    expect(
      describeEvidencePackageError(domain('EVIDENCE_PACKAGE_INCOMPLETE', 422))
    ).toMatch(/chưa đầy đủ/)
    expect(
      describeEvidencePackageError(domain('EVIDENCE_PACKAGE_TOO_LARGE', 413))
    ).toMatch(/quá lớn/)
    expect(
      describeEvidencePackageError(domain('EVIDENCE_ARTIFACT_MISMATCH', 409))
    ).toMatch(/toàn vẹn/)
  })

  it('explains authorization and not-found responses without backend text', () => {
    const forbidden = new ApiClientError('Forbidden resource', 403, null)
    expect(describeEvidencePackageError(forbidden)).toMatch(/quyền/)
    expect(describeEvidencePackageError(forbidden)).not.toMatch(/Forbidden/)
    expect(
      describeEvidencePackageError(new ApiClientError('nf', 404, null))
    ).toMatch(/Không tìm thấy/)
  })

  it('handles transport and unknown failures', () => {
    expect(
      describeEvidencePackageError(new ApiClientError('offline', 0, null))
    ).toMatch(/kết nối/)
    expect(describeEvidencePackageError(new Error('boom'))).toMatch(
      /Không thể tải/
    )
  })
})

describe('saveBlobAsFile', () => {
  it('downloads through an object URL and revokes it afterwards', async () => {
    const createObjectURL = vi.fn(() => 'blob:evidence-1')
    const revokeObjectURL = vi.fn()
    stubObjectUrls(createObjectURL, revokeObjectURL)
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined)

    const blob = new Blob(['zip'], { type: 'application/zip' })
    saveBlobAsFile(blob, 'evidence.zip')

    expect(createObjectURL).toHaveBeenCalledWith(blob)
    expect(click).toHaveBeenCalledTimes(1)
    const anchor = click.mock.contexts[0] as HTMLAnchorElement
    expect(anchor.download).toBe('evidence.zip')
    expect(anchor.href).toBe('blob:evidence-1')
    await vi.waitFor(() =>
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:evidence-1')
    )
    expect(document.querySelector('a[download]')).toBeNull()
  })

  it('revokes the object URL even when the click throws', async () => {
    const revokeObjectURL = vi.fn()
    stubObjectUrls(() => 'blob:evidence-2', revokeObjectURL)
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(() => saveBlobAsFile(new Blob(['x']), 'x.zip')).toThrow('blocked')
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:evidence-2')
  })

  it('never reads the package bytes', async () => {
    const revokeObjectURL = vi.fn()
    stubObjectUrls(() => 'blob:evidence-3', revokeObjectURL)
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
      () => undefined
    )
    const blob = new Blob(['zip'])
    const byteReaders = [vi.fn(), vi.fn(), vi.fn(), vi.spyOn(blob, 'slice')]
    Object.defineProperties(blob, {
      arrayBuffer: { value: byteReaders[0] },
      text: { value: byteReaders[1] },
      stream: { value: byteReaders[2] },
    })
    saveBlobAsFile(blob, 'x.zip')
    for (const spy of byteReaders) {
      expect(spy).not.toHaveBeenCalled()
    }
    await vi.waitFor(() => expect(revokeObjectURL).toHaveBeenCalledTimes(1))
  })
})
