import { describe, expect, it } from 'vitest'
import { makeApartment } from '../../lib/__tests__/apartment-fixture'
import { buildCriteria, getVerifiedScore } from './compare-config'

describe('compare verification criterion', () => {
  it('scores verified listings 100 and unverified 0', () => {
    expect(getVerifiedScore(makeApartment({ isVerified: true }))).toBe(100)
    expect(getVerifiedScore(makeApartment({ isVerified: false }))).toBe(0)
  })

  it('exposes real verification state without blockchain scores', () => {
    const apts = [
      makeApartment({ id: 'a', isVerified: true }),
      makeApartment({ id: 'b', isVerified: false }),
    ]
    const criterion = buildCriteria(apts, () => 1).find(
      c => c.key === 'verified'
    )
    expect(criterion?.getValue(apts[0]!)).toBe('Đã kiểm duyệt')
    expect(criterion?.getValue(apts[1]!)).toBe('Chưa kiểm duyệt')
    expect(criterion?.isWinner?.(apts[0]!)).toBe(true)
    expect(criterion?.isWinner?.(apts[1]!)).toBe(false)
    expect(criterion?.getAnalysis?.(apts)).not.toMatch(/blockchain|\d+%/i)
  })

  it('warns when no listing is verified', () => {
    const apts = [
      makeApartment({ id: 'a', isVerified: false }),
      makeApartment({ id: 'b', isVerified: false }),
    ]
    const criterion = buildCriteria(apts, () => 1).find(
      c => c.key === 'verified'
    )
    expect(criterion?.getAnalysis?.(apts)).toContain('Chưa có căn hộ nào')
  })
})
