import { describe, expect, it, vi } from 'vitest'
import type { KycOcrBackResult, KycOcrFrontResult } from '../api/kyc-api'
import { attemptOcr, describeOcrIssues } from './kyc-ocr-issues'

const FRONT: KycOcrFrontResult = {
  idNumber: '079123456789',
  fullName: 'NGUYEN VAN A',
  dob: '01/02/2000',
  gender: 'Nam',
  nationality: 'Việt Nam',
}
const BACK: KycOcrBackResult = {
  success: true,
  data: { issueDate: '04/05/2021' },
}

describe('attemptOcr', () => {
  it('returns the value on success', async () => {
    await expect(attemptOcr(() => Promise.resolve(FRONT))).resolves.toEqual({
      value: FRONT,
      error: null,
    })
  })

  it('swallows a failure and keeps its user-facing message', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    await expect(
      attemptOcr(() => Promise.reject(new Error('Không phát hiện nội dung')))
    ).resolves.toEqual({ value: null, error: 'Không phát hiện nội dung' })
    await expect(attemptOcr(() => Promise.reject('boom'))).resolves.toEqual({
      value: null,
      error: null,
    })
  })
})

describe('describeOcrIssues', () => {
  it('is empty when both sides were read fully', () => {
    expect(
      describeOcrIssues(
        { value: FRONT, error: null },
        { value: BACK, error: null }
      )
    ).toEqual([])
  })

  it('names the front side and the missing fields', () => {
    const issues = describeOcrIssues(
      { value: { ...FRONT, idNumber: '', dob: '' }, error: null },
      { value: BACK, error: null }
    )

    expect(issues).toHaveLength(1)
    expect(issues[0]).toContain('Mặt trước: chưa đọc được Số CCCD, Ngày sinh')
    expect(issues[0]).toContain('đủ sáng')
  })

  it('names the back side when the issue date is missing', () => {
    const issues = describeOcrIssues(
      { value: FRONT, error: null },
      { value: { success: true, data: {} }, error: null }
    )

    expect(issues).toEqual([
      expect.stringContaining('Mặt sau: chưa đọc được Ngày cấp'),
    ])
  })

  it('reports each failed side separately with the upstream reason', () => {
    const issues = describeOcrIssues(
      { value: null, error: 'Không phát hiện nội dung mặt trước' },
      { value: null, error: null }
    )

    expect(issues).toHaveLength(2)
    expect(issues[0]).toContain(
      'Mặt trước: không đọc được (Không phát hiện nội dung mặt trước)'
    )
    expect(issues[1]).toMatch(/^Mặt sau: không đọc được\. /)
  })
})
