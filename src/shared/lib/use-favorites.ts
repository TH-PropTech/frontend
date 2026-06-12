'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'th_favorites'

export interface UseFavoritesResult {
  favorites: string[]
  toggleFavorite: (id: string) => void
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

  const toggleFavorite = (id: string): void => {
    setFavorites(prev => {
      const next = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        // Dispatch in the next tick to avoid cascading render warnings
        setTimeout(() => {
          window.dispatchEvent(new Event('favorites-updated'))
        }, 0)
      }
      return next
    })
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
