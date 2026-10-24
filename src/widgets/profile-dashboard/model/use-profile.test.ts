import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as React from 'react'
import { renderHook as baseRenderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProfile } from './use-profile'

// useProfile đọc danh mục chủ nhà qua react-query nên cần QueryClientProvider
const renderHook = <T>(fn: () => T) =>
  baseRenderHook(fn, {
    wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        QueryClientProvider,
        {
          client: new QueryClient({
            defaultOptions: { queries: { retry: false } },
          }),
        },
        children
      ),
  })

const replaceMock = vi.fn()
const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: replaceMock,
    push: pushMock,
  }),
}))

vi.mock('../api/kyc-api', () => ({
  getMyKyc: vi.fn().mockResolvedValue(null),
}))

describe('useProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    window.history.replaceState({}, '', '/profile')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('initializes with tenant role and progress tab by default', () => {
    const { result } = renderHook(() => useProfile())
    expect(result.current.role).toBe('tenant')
    expect(result.current.activeTab).toBe('progress')
  })

  it('synchronizes tab with URL when setActiveTab is called', () => {
    const { result } = renderHook(() => useProfile())

    act(() => {
      result.current.setActiveTab('bills')
    })

    expect(result.current.activeTab).toBe('bills')
    expect(replaceMock).toHaveBeenCalledWith(
      expect.stringContaining('tab=bills'),
      { scroll: false }
    )
  })

  it('resolves functional updater and calls router once', () => {
    const { result } = renderHook(() => useProfile())

    act(() => {
      result.current.setActiveTab(prev =>
        prev === 'progress' ? 'security' : prev
      )
    })

    expect(result.current.activeTab).toBe('security')
    expect(replaceMock).toHaveBeenCalledTimes(1)
    expect(replaceMock).toHaveBeenCalledWith(
      expect.stringContaining('tab=security'),
      { scroll: false }
    )
  })

  it('does not update URL when selected tab already matches', () => {
    window.history.replaceState({}, '', '/profile?tab=bills')
    const { result } = renderHook(() => useProfile())
    replaceMock.mockClear()

    act(() => {
      result.current.setActiveTab('bills')
    })

    expect(replaceMock).not.toHaveBeenCalled()
  })

  it('does not emit setState-in-render warning when switching tab', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useProfile())

    act(() => {
      result.current.setActiveTab('bills')
    })

    const messages = errorSpy.mock.calls.map(c => String(c[0]))
    expect(
      messages.some(m => m.includes('while rendering a different component'))
    ).toBe(false)
    errorSpy.mockRestore()
  })

  it('updates role and URL when handleRoleChange is called', () => {
    const { result } = renderHook(() => useProfile())

    act(() => {
      result.current.handleRoleChange('landlord')
    })

    expect(result.current.role).toBe('landlord')
    expect(replaceMock).toHaveBeenCalledWith(
      expect.stringContaining('role=landlord'),
      { scroll: false }
    )
  })

  it('reads URL query params on mount and applies them', async () => {
    window.history.replaceState({}, '', '/profile?tab=listings')

    const { result } = renderHook(() => useProfile())

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    expect(result.current.role).toBe('landlord')
    expect(result.current.activeTab).toBe('listings')
  })
})
