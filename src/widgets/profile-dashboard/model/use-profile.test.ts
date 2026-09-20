import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProfile } from './use-profile'

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
