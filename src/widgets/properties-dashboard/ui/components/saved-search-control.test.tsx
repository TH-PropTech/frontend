import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PermissionsProvider } from '@/shared/lib/permissions'
import { SavedSearchControl } from './saved-search-control'

vi.mock('@/features/saved-searches', () => ({
  SaveSearchDialog: () => <button type="button">Lưu tìm kiếm</button>,
}))

describe('SavedSearchControl', () => {
  it('shows the save button by default', () => {
    render(<SavedSearchControl filters={{} as never} />)
    expect(screen.getByRole('button', { name: 'Lưu tìm kiếm' })).toBeVisible()
  })

  it('hides it when the admin switched off creating saved searches for this role', () => {
    render(
      <PermissionsProvider permissions={{ 'create:SavedSearch': false }}>
        <SavedSearchControl filters={{} as never} />
      </PermissionsProvider>
    )
    expect(screen.queryByRole('button', { name: 'Lưu tìm kiếm' })).toBeNull()
  })
})
