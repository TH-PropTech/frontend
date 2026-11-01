import { renderHook, act, waitFor } from '@testing-library/react'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import {
  useFavorites,
  syncGuestFavorites,
  extractFavoriteIds,
  FAVORITES_STORAGE_KEY,
  FAVORITES_GUEST_FLAG_KEY,
} from './use-favorites'
import { apiClient } from '@/shared/api'
import { toast } from 'sonner'

vi.mock('@/shared/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}))

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('extractFavoriteIds', () => {
    it('handles various response payload structures', () => {
      expect(extractFavoriteIds(null)).toEqual([])
      expect(extractFavoriteIds(['id-1', 'id-2'])).toEqual(['id-1', 'id-2'])
      expect(extractFavoriteIds([{ id: 'id-1' }, { _id: 'id-2' }])).toEqual([
        'id-1',
        'id-2',
      ])
      expect(
        extractFavoriteIds([{ apartmentId: 'apt-1' }, { id: 'apt-2' }])
      ).toEqual(['apt-1', 'apt-2'])
      expect(extractFavoriteIds({ favorites: ['id-3', 'id-4'] })).toEqual([
        'id-3',
        'id-4',
      ])
      expect(
        extractFavoriteIds({ items: [{ id: 'id-5' }, { apartmentId: 'id-6' }] })
      ).toEqual(['id-5', 'id-6'])
    })
  })

  describe('Guest user flow', () => {
    it('initializes from localStorage when unauthenticated', async () => {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(['apt-guest-1', 'apt-guest-2'])
      )

      const { result } = renderHook(() => useFavorites())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.favorites).toEqual(['apt-guest-1', 'apt-guest-2'])
      expect(result.current.isFavorite('apt-guest-1')).toBe(true)
      expect(result.current.isFavorite('apt-guest-99')).toBe(false)
      expect(apiClient.get).not.toHaveBeenCalled()
    })

    it('allows guest to toggle favorites and marks guest flag', async () => {
      const { result } = renderHook(() => useFavorites())

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        const ok = result.current.toggleFavorite('apt-1', 'Căn 1 PN')
        expect(ok).toBe(true)
      })

      expect(result.current.favorites).toContain('apt-1')
      expect(localStorage.getItem(FAVORITES_GUEST_FLAG_KEY)).toBe('true')
      expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)!)).toEqual([
        'apt-1',
      ])
      expect(toast.success).toHaveBeenCalledWith(
        'Đã lưu: Căn 1 PN',
        expect.any(Object)
      )

      // Toggle off
      act(() => {
        result.current.toggleFavorite('apt-1', 'Căn 1 PN')
      })

      expect(result.current.favorites).not.toContain('apt-1')
      expect(toast.info).toHaveBeenCalledWith('Đã bỏ lưu: Căn 1 PN')
    })

    it('clears favorites locally for guest', async () => {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(['apt-1', 'apt-2'])
      )

      const { result } = renderHook(() => useFavorites())
      await waitFor(() => expect(result.current.favorites.length).toBe(2))

      await act(async () => {
        await result.current.clearFavorites()
      })

      expect(result.current.favorites).toEqual([])
      expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)!)).toEqual(
        []
      )
      expect(apiClient.delete).not.toHaveBeenCalled()
      expect(toast.info).toHaveBeenCalledWith(
        'Đã xóa tất cả căn hộ khỏi danh sách yêu thích.'
      )
    })
  })

  describe('Authenticated user cloud sync flow', () => {
    it('fetches cloud favorites on mount when authenticated', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue(['apt-cloud-1', 'apt-cloud-2'])

      const { result } = renderHook(() => useFavorites())

      await waitFor(() => {
        expect(result.current.favorites).toEqual(['apt-cloud-1', 'apt-cloud-2'])
      })

      expect(apiClient.get).toHaveBeenCalledWith('/favorites')
      expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)!)).toEqual([
        'apt-cloud-1',
        'apt-cloud-2',
      ])
    })

    it('shares one GET /favorites across hook instances mounted together', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue(['apt-1'])

      const hooks = Array.from({ length: 5 }, () =>
        renderHook(() => useFavorites())
      )

      await waitFor(() => {
        hooks.forEach(({ result }) => {
          expect(result.current.favorites).toEqual(['apt-1'])
        })
      })

      expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    it('fetches again on a later mount once the previous request settled', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue(['apt-1'])

      const first = renderHook(() => useFavorites())
      await waitFor(() => expect(first.result.current.isLoading).toBe(false))

      const second = renderHook(() => useFavorites())
      await waitFor(() => expect(second.result.current.isLoading).toBe(false))

      expect(apiClient.get).toHaveBeenCalledTimes(2)
    })

    it('automatically reconciles guest favorites into cloud when guest flag is set', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      localStorage.setItem(FAVORITES_GUEST_FLAG_KEY, 'true')
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(['apt-guest-1', 'apt-guest-2'])
      )

      vi.mocked(apiClient.post).mockResolvedValue({
        syncedCount: 2,
        favorites: ['apt-cloud-existing', 'apt-guest-1', 'apt-guest-2'],
      })

      const { result } = renderHook(() => useFavorites())

      await waitFor(() => {
        expect(apiClient.post).toHaveBeenCalledWith('/favorites/sync', {
          apartmentIds: ['apt-guest-1', 'apt-guest-2'],
        })
      })

      await waitFor(() => {
        expect(result.current.favorites).toEqual([
          'apt-cloud-existing',
          'apt-guest-1',
          'apt-guest-2',
        ])
      })

      expect(localStorage.getItem(FAVORITES_GUEST_FLAG_KEY)).toBeNull()
    })

    it('optimistically adds favorite and calls POST endpoint', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue([])
      vi.mocked(apiClient.post).mockResolvedValue({ isFavorite: true })

      const { result } = renderHook(() => useFavorites())
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.toggleFavorite('apt-new', 'Căn hộ mới')
      })

      // Immediate optimistic update
      expect(result.current.favorites).toContain('apt-new')
      expect(apiClient.post).toHaveBeenCalledWith('/favorites/apt-new', {})
    })

    it('optimistically removes favorite and calls DELETE endpoint', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue(['apt-to-remove'])
      vi.mocked(apiClient.delete).mockResolvedValue({ success: true })

      const { result } = renderHook(() => useFavorites())
      await waitFor(() =>
        expect(result.current.favorites).toEqual(['apt-to-remove'])
      )

      act(() => {
        result.current.toggleFavorite('apt-to-remove')
      })

      expect(result.current.favorites).not.toContain('apt-to-remove')
      expect(apiClient.delete).toHaveBeenCalledWith('/favorites/apt-to-remove')
    })

    it('reverts state and displays error toast if API call rejects', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue([])
      vi.mocked(apiClient.post).mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useFavorites())
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.toggleFavorite('apt-fail')
      })

      expect(result.current.favorites).toContain('apt-fail')

      // Wait for catch block to revert
      await waitFor(() => {
        expect(result.current.favorites).not.toContain('apt-fail')
      })

      expect(toast.error).toHaveBeenCalledWith(
        'Không thể cập nhật danh sách yêu thích. Vui lòng thử lại.'
      )
    })

    it('batch clears favorites via DELETE /favorites', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue(['apt-1', 'apt-2'])
      vi.mocked(apiClient.delete).mockResolvedValue({ count: 2 })

      const { result } = renderHook(() => useFavorites())
      await waitFor(() => expect(result.current.favorites.length).toBe(2))

      await act(async () => {
        await result.current.clearFavorites()
      })

      expect(apiClient.delete).toHaveBeenCalledWith('/favorites')
      expect(result.current.favorites).toEqual([])
      expect(JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)!)).toEqual(
        []
      )
    })

    it('reverts batch clear if DELETE /favorites rejects', async () => {
      localStorage.setItem('accessToken', 'mock-token')
      vi.mocked(apiClient.get).mockResolvedValue(['apt-1', 'apt-2'])
      vi.mocked(apiClient.delete).mockRejectedValue(new Error('Server error'))

      const { result } = renderHook(() => useFavorites())
      await waitFor(() => expect(result.current.favorites.length).toBe(2))

      await expect(
        act(async () => {
          await result.current.clearFavorites()
        })
      ).rejects.toThrow('Server error')

      expect(result.current.favorites).toEqual(['apt-1', 'apt-2'])
      expect(toast.error).toHaveBeenCalledWith(
        'Không thể xóa danh sách yêu thích. Vui lòng thử lại.'
      )
    })
  })

  describe('syncGuestFavorites standalone function', () => {
    it('returns empty array if no token is present', async () => {
      const res = await syncGuestFavorites(['apt-1'])
      expect(res).toEqual([])
      expect(apiClient.post).not.toHaveBeenCalled()
    })

    it('calls /favorites/sync and returns merged list', async () => {
      localStorage.setItem('accessToken', 'token-123')
      localStorage.setItem(FAVORITES_GUEST_FLAG_KEY, 'true')
      vi.mocked(apiClient.post).mockResolvedValue({
        syncedCount: 1,
        favorites: ['apt-cloud-1', 'apt-guest-1'],
      })

      const res = await syncGuestFavorites(['apt-guest-1'])

      expect(apiClient.post).toHaveBeenCalledWith('/favorites/sync', {
        apartmentIds: ['apt-guest-1'],
      })
      expect(res).toEqual(['apt-cloud-1', 'apt-guest-1'])
      expect(localStorage.getItem(FAVORITES_GUEST_FLAG_KEY)).toBeNull()
    })
  })
})
