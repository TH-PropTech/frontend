import { describe, expect, it, vi } from 'vitest'
import AdminPage from './page'

const mocks = vi.hoisted(() => ({
  redirect: vi.fn(() => {
    throw new Error('NEXT_REDIRECT')
  }),
}))

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}))

describe('Admin route', () => {
  it('redirects the dashboard root to the overview section', () => {
    expect(() => AdminPage()).toThrow('NEXT_REDIRECT')
    expect(mocks.redirect).toHaveBeenCalledWith('/admin/overview')
  })
})
