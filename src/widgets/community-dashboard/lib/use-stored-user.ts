'use client'

import { useMemo, useSyncExternalStore } from 'react'
import type { StoredUser } from './community-types'

const USER_STORAGE_KEY = 'user'

function subscribe(onChange: () => void): () => void {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

function readRawUser(): string | null {
  try {
    return window.localStorage.getItem(USER_STORAGE_KEY)
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Không đọc được thông tin người dùng đã lưu:', error)
    }
    return null
  }
}

export function parseStoredUser(raw: string | null): StoredUser | null {
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as StoredUser) : null
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Dữ liệu người dùng đã lưu không hợp lệ:', error)
    }
    return null
  }
}

/** Người dùng đăng nhập hiện tại; `null` ở server render và khi chưa đăng nhập. */
export function useStoredUser(): StoredUser | null {
  const raw = useSyncExternalStore(subscribe, readRawUser, () => null)
  return useMemo(() => parseStoredUser(raw), [raw])
}
