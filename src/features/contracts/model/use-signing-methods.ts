'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  getSigningMethods,
  type SigningMethodId,
  type SigningMethodOption,
} from '../api/contracts-api'

export interface UseSigningMethodsResult {
  methods: SigningMethodOption[]
  selected: SigningMethodId | null
  select: (id: SigningMethodId) => void
  loading: boolean
  error: string | null
  reload: () => void
}

/** Lấy danh sách phương thức ký từ backend; chọn sẵn phương thức khả dụng đầu tiên. */
export function useSigningMethods(
  contractId: string,
  enabled: boolean
): UseSigningMethodsResult {
  const [methods, setMethods] = useState<SigningMethodOption[]>([])
  const [selected, setSelected] = useState<SigningMethodId | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let active = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(null)
    getSigningMethods(contractId)
      .then(list => {
        if (!active) return
        setMethods(list)
        setSelected(
          current =>
            list.find(item => item.id === current && item.available)?.id ??
            list.find(item => item.available)?.id ??
            null
        )
      })
      .catch((cause: unknown) => {
        if (!active) return
        setMethods([])
        setSelected(null)
        setError(
          cause instanceof Error
            ? cause.message
            : 'Không tải được danh sách phương thức ký.'
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [contractId, enabled, attempt])

  const reload = useCallback(() => setAttempt(value => value + 1), [])

  return { methods, selected, select: setSelected, loading, error, reload }
}
