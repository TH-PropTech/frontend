'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'

const STORAGE_KEY = 'th_favorites'

export interface UseFavoritesResult {
  favorites: string[]
  toggleFavorite: (id: string, title?: string) => void
  isFavorite: (id: string) => boolean
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFavorites(JSON.parse(stored))
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const toggleFavorite = (id: string, title?: string): void => {
    const isAdding = !favorites.includes(id)
    const next = isAdding
      ? [...favorites, id]
      : favorites.filter(item => item !== id)

    setFavorites(next)

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      window.dispatchEvent(new Event('favorites-updated'))
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
  }

  useEffect(() => {
    const handleUpdate = (): void => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          setFavorites(JSON.parse(stored))
        } catch {
          // ignore
        }
      }
    }

    window.addEventListener('favorites-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return (): void => {
      window.removeEventListener('favorites-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const isFavorite = (id: string): boolean => favorites.includes(id)

  return { favorites, toggleFavorite, isFavorite }
}
