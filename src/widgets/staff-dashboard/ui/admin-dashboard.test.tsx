import { describe, expect, it } from 'vitest'
import { resolveAdminTab } from './admin-dashboard'

describe('admin dashboard navigation', () => {
  it('resolves the ownership transfer section from the admin route', () => {
    expect(resolveAdminTab('/admin/ownership-transfer')).toBe(
      'ownership-transfer'
    )
  })

  it('falls back to overview for an unknown admin section', () => {
    expect(resolveAdminTab('/admin/not-a-section')).toBe('overview')
  })
})
