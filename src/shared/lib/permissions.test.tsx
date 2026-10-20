import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '@/shared/api'
import {
  PermissionsLoader,
  PermissionsProvider,
  useCan,
  type PermissionAction,
  type PermissionSubject,
} from './permissions'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('@/shared/api', () => ({ apiClient: { get: vi.fn() } }))

function Probe({
  action,
  subject,
}: {
  action: PermissionAction
  subject: PermissionSubject
}): React.ReactElement {
  const can = useCan()
  return (
    <span data-testid={`${action}:${subject}`}>
      {can(action, subject) ? 'allowed' : 'denied'}
    </span>
  )
}

function renderLoader(): void {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <PermissionsLoader>
        <Probe action="create" subject="Booking" />
        <Probe action="read" subject="Booking" />
      </PermissionsLoader>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  window.localStorage.clear()
})

afterEach(() => {
  window.localStorage.clear()
})

describe('useCan', () => {
  it('allows everything without a provider (admin, tests, not loaded yet)', () => {
    render(<Probe action="approve" subject="Kyc" />)
    expect(screen.getByTestId('approve:Kyc')).toHaveTextContent('allowed')
  })

  it('follows the provided map and treats missing keys as allowed', () => {
    render(
      <PermissionsProvider permissions={{ 'create:Booking': false }}>
        <Probe action="create" subject="Booking" />
        <Probe action="read" subject="Booking" />
      </PermissionsProvider>
    )
    expect(screen.getByTestId('create:Booking')).toHaveTextContent('denied')
    expect(screen.getByTestId('read:Booking')).toHaveTextContent('allowed')
  })
})

describe('PermissionsLoader', () => {
  it('does not call the API for a visitor who is not logged in', () => {
    renderLoader()
    expect(apiClient.get).not.toHaveBeenCalled()
    expect(screen.getByTestId('create:Booking')).toHaveTextContent('allowed')
  })

  it('loads the permissions of a logged-in user and applies them', async () => {
    window.localStorage.setItem('accessToken', 'token')
    window.localStorage.setItem('user', JSON.stringify({ email: 't@x.vn' }))
    vi.mocked(apiClient.get).mockResolvedValue({
      isAdmin: false,
      permissions: { 'create:Booking': false, 'read:Booking': true },
    } as never)
    renderLoader()
    await waitFor(() =>
      expect(screen.getByTestId('create:Booking')).toHaveTextContent('denied')
    )
    expect(apiClient.get).toHaveBeenCalledWith('/rbac/me/permissions')
    expect(screen.getByTestId('read:Booking')).toHaveTextContent('allowed')
  })

  it('keeps everything visible when the permissions cannot be loaded (backend still blocks)', async () => {
    window.localStorage.setItem('accessToken', 'token')
    vi.mocked(apiClient.get).mockRejectedValue(new Error('down') as never)
    renderLoader()
    await waitFor(() => expect(apiClient.get).toHaveBeenCalled())
    expect(screen.getByTestId('create:Booking')).toHaveTextContent('allowed')
  })
})
