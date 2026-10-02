import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import AdminLayout from './layout'

vi.mock('@/widgets/staff-dashboard', () => ({
  StaffDashboard: () => <div data-testid="staff-dashboard" />,
}))
vi.mock('@/shared/ui/role-guard', () => ({
  RoleGuard: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

describe('AdminLayout', () => {
  it('keeps the dashboard and renders nested admin contract routes', () => {
    render(
      <AdminLayout>
        <div data-testid="contract-editor-route">Editor</div>
      </AdminLayout>
    )

    expect(screen.getByTestId('staff-dashboard')).toBeTruthy()
    expect(screen.getByTestId('contract-editor-route')).toBeTruthy()
  })
})
