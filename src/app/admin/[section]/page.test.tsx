import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AdminSectionPage from './page'

vi.mock('@/features/property-ownership-transfer', () => ({
  OwnershipTransferPanel: () => (
    <div data-testid="ownership-transfer-route-panel">Ownership transfer</div>
  ),
}))

describe('Admin section route', () => {
  it('mounts the ownership transfer operation under the admin surface', async () => {
    render(
      await AdminSectionPage({
        params: Promise.resolve({ section: 'ownership-transfer' }),
      })
    )

    expect(
      screen.getByTestId('ownership-transfer-route-panel')
    ).toBeInTheDocument()
  })

  it('keeps unknown admin sections unchanged', async () => {
    expect(
      await AdminSectionPage({
        params: Promise.resolve({ section: 'overview' }),
      })
    ).toBeNull()
  })
})
