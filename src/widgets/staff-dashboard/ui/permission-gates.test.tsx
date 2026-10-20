import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  PermissionsProvider,
  useCan,
  type PermissionAction,
  type PermissionSubject,
} from '@/shared/lib/permissions'

function Probe({
  action,
  subject,
}: {
  action: PermissionAction
  subject: PermissionSubject
}): React.ReactElement {
  const can = useCan()
  return <span>{can(action, subject) ? 'allowed' : 'denied'}</span>
}

describe('useCan', () => {
  it('allows everything without a provider (admin, tests, not loaded yet)', () => {
    render(<Probe action="approve" subject="Kyc" />)
    expect(screen.getByText('allowed')).toBeVisible()
  })

  it('follows the provided map and treats missing keys as allowed', () => {
    render(
      <PermissionsProvider permissions={{ 'approve:Kyc': false }}>
        <Probe action="approve" subject="Kyc" />
        <Probe action="read" subject="Kyc" />
      </PermissionsProvider>
    )
    expect(screen.getByText('denied')).toBeVisible()
    expect(screen.getByText('allowed')).toBeVisible()
  })
})
