import { describe, expect, it } from 'vitest'
import { parseContentDispositionFilename } from './content-disposition'

describe('parseContentDispositionFilename', () => {
  it('reads a quoted filename', () => {
    expect(
      parseContentDispositionFilename(
        'attachment; filename="evidence-HD-2026-001.zip"'
      )
    ).toBe('evidence-HD-2026-001.zip')
  })

  it('reads an unquoted filename', () => {
    expect(
      parseContentDispositionFilename('attachment; filename=evidence.zip')
    ).toBe('evidence.zip')
  })

  it('prefers the RFC 5987 filename* form and decodes it', () => {
    expect(
      parseContentDispositionFilename(
        `attachment; filename="fallback.zip"; filename*=UTF-8''g%C3%B3i%20b%E1%BA%B1ng%20ch%E1%BB%A9ng.zip`
      )
    ).toBe('gói bằng chứng.zip')
  })

  it('strips path segments so a header cannot steer the save location', () => {
    expect(
      parseContentDispositionFilename('attachment; filename="../../etc/x.zip"')
    ).toBe('x.zip')
    expect(
      parseContentDispositionFilename('attachment; filename="C:\\temp\\y.zip"')
    ).toBe('y.zip')
  })

  it('returns null when absent, empty, or undecodable', () => {
    expect(parseContentDispositionFilename(null)).toBeNull()
    expect(parseContentDispositionFilename('attachment')).toBeNull()
    expect(
      parseContentDispositionFilename('attachment; filename=""')
    ).toBeNull()
    expect(
      parseContentDispositionFilename("attachment; filename*=UTF-8''%E0%A4%A")
    ).toBeNull()
  })
})
