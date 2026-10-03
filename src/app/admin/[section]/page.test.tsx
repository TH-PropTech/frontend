import { describe, expect, it } from 'vitest'
import AdminSectionPage from './page'

describe('Admin section route', () => {
  it('delegates ownership transfer rendering to the dashboard shell', async () => {
    expect(
      await AdminSectionPage({
        params: Promise.resolve({ section: 'ownership-transfer' }),
      })
    ).toBeNull()
  })

  it('keeps unknown admin sections unchanged', async () => {
    expect(
      await AdminSectionPage({
        params: Promise.resolve({ section: 'overview' }),
      })
    ).toBeNull()
  })
})
