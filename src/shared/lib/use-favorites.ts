'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { apiClient } from '@/shared/api'

export const FAVORITES_STORAGE_KEY = 'th_favorites'
export const FAVORITES_GUEST_FLAG_KEY = 'th_favorites_is_guest'

export interface UseFavoritesResult {
  favorites: string[]
  isLoading: boolean
  toggleFavorite: (id: string, title?: string) => boolean
  isFavorite: (id: string) => boolean
  clearFavorites: () => Promise<void>
  syncGuestFavorites: () => Promise<string[]>
}

export function extractFavoriteIds(data: unknown): string[] {
  if (!data) return []
  if (Array.isArray(data)) {
    return data
      .map(item => {
        if (typeof item === 'string') return item
        if (item && typeof item === 'object') {
          const rec = item as Record<string, unknown>
          const val = rec.apartmentId ?? rec.id ?? rec._id
          return typeof val === 'string' ? val : ''
        }
        return ''
      })
      .filter(Boolean)
  }
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>
    if (Array.isArray(obj.favorites)) {
      return extractFavoriteIds(obj.favorites)
    }
    if (Array.isArray(obj.items)) {
      return extractFavoriteIds(obj.items)
    }
  }
  return []
}

let inflightCloudFetch: Promise<unknown> | null = null

/**
 * Every `useFavorites` instance (one per listing card) loads on mount, so
 * concurrent callers share a single `GET /favorites` request.
 */
function fetchCloudFavorites(): Promise<unknown> {
  if (!inflightCloudFetch) {
    inflightCloudFetch = apiClient.get<unknown>('/favorites').finally(() => {
      inflightCloudFetch = null
    })
  }
  return inflightCloudFetch
}

/**
 * Reconciles local guest favorites with the user's cloud account on login.
 */
export async function syncGuestFavorites(
  apartmentIds?: string[]
): Promise<string[]> {
  if (typeof window === 'undefined') return []
  const token = localStorage.getItem('accessToken')
  if (!token) return []

  let idsToSync = apartmentIds
  if (!idsToSync) {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      idsToSync = stored ? JSON.parse(stored) : []
    } catch {
      idsToSync = []
    }
  }

  if (!Array.isArray(idsToSync) || idsToSync.length === 0) {
    return []
  }

  try {
    const res = await apiClient.post<unknown>('/favorites/sync', {
      apartmentIds: idsToSync,
    })
    localStorage.removeItem(FAVORITES_GUEST_FLAG_KEY)
    const serverIds = extractFavoriteIds(res)
    const merged = Array.from(new Set([...serverIds, ...idsToSync]))
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(merged))
    window.dispatchEvent(new Event('favorites-updated'))
    return merged
  } catch (err) {
    console.error('Failed to sync guest favorites:', err)
    return idsToSync
  }
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadFavorites = useCallback(async (): Promise<void> => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem('accessToken')

    if (token) {
      const isGuest = localStorage.getItem(FAVORITES_GUEST_FLAG_KEY) === 'true'
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      let localIds: string[] = []
      if (stored) {
        try {
          localIds = JSON.parse(stored)
        } catch {
          localIds = []
        }
      }

      if (isGuest && Array.isArray(localIds) && localIds.length > 0) {
        try {
          const syncRes = await apiClient.post<unknown>('/favorites/sync', {
            apartmentIds: localIds,
          })
          localStorage.removeItem(FAVORITES_GUEST_FLAG_KEY)
          const serverIds = extractFavoriteIds(syncRes)
          const merged = Array.from(new Set([...serverIds, ...localIds]))
          setFavorites(merged)
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(merged))
          setIsLoading(false)
          return
        } catch (err) {
          console.error('Failed to sync guest favorites on load:', err)
        }
      }

      try {
        const res = await fetchCloudFavorites()
        const serverIds = extractFavoriteIds(res)
        setFavorites(serverIds)
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(serverIds))
      } catch (err) {
        console.error('Failed to fetch cloud favorites:', err)
        if (stored) {
          try {
            setFavorites(JSON.parse(stored))
          } catch {
            // ignore
          }
        }
      } finally {
        setIsLoading(false)
      }
    } else {
      // Guest user
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setFavorites(parsed)
          }
        } catch {
          // ignore
        }
      }
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Syncs state from external stores (localStorage + cloud API) on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFavorites()
  }, [loadFavorites])

  useEffect(() => {
    const handleUpdate = (): void => {
      if (typeof window === 'undefined') return
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setFavorites(parsed)
          }
        } catch {
          // ignore
        }
      } else {
        setFavorites([])
      }
    }

    window.addEventListener('favorites-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return (): void => {
      window.removeEventListener('favorites-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const toggleFavorite = (id: string, title?: string): boolean => {
    const isAdding = !favorites.includes(id)
    const previous = [...favorites]
    const next = isAdding
      ? [...favorites, id]
      : favorites.filter(item => item !== id)

    // 1. Optimistic update
    setFavorites(next)

    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next))
      window.dispatchEvent(new Event('favorites-updated'))
    }

    // 2. Auth check
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

    if (token) {
      const apiCall = isAdding
        ? apiClient.post(`/favorites/${encodeURIComponent(id)}`, {})
        : apiClient.delete(`/favorites/${encodeURIComponent(id)}`)

      apiCall.catch(err => {
        console.error('Failed to update favorite on server:', err)
        // Revert
        setFavorites(previous)
        if (typeof window !== 'undefined') {
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(previous))
          window.dispatchEvent(new Event('favorites-updated'))
        }
        toast.error('Không thể cập nhật danh sách yêu thích. Vui lòng thử lại.')
      })
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_GUEST_FLAG_KEY, 'true')
      }
    }

    if (isAdding) {
      toast.success(
        title ? `Đã lưu: ${title}` : 'Đã lưu căn hộ vào danh sách yêu thích',
        {
          description: 'Bạn có thể xem lại trong mục Căn hộ đã lưu.',
        }
      )
    } else {
      toast.info(
        title
          ? `Đã bỏ lưu: ${title}`
          : 'Đã bỏ lưu căn hộ khỏi danh sách yêu thích'
      )
    }

    return true
  }

  const clearFavorites = async (): Promise<void> => {
    const previous = [...favorites]
    setFavorites([])

    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([]))
      localStorage.removeItem(FAVORITES_GUEST_FLAG_KEY)
      window.dispatchEvent(new Event('favorites-updated'))
    }

    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

    if (token) {
      try {
        await apiClient.delete('/favorites')
        toast.info('Đã xóa tất cả căn hộ khỏi danh sách yêu thích.')
      } catch (err) {
        console.error('Failed to clear favorites on server:', err)
        setFavorites(previous)
        if (typeof window !== 'undefined') {
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(previous))
          window.dispatchEvent(new Event('favorites-updated'))
        }
        toast.error('Không thể xóa danh sách yêu thích. Vui lòng thử lại.')
        throw err
      }
    } else {
      toast.info('Đã xóa tất cả căn hộ khỏi danh sách yêu thích.')
    }
  }

  const isFavorite = (id: string): boolean => favorites.includes(id)

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    syncGuestFavorites: () => syncGuestFavorites(),
  }
}
