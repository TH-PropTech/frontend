'use client'

import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDepositStatement, getMoveOutHandover } from '../api/move-out-api'
import { getMoveOutErrorMessage } from '../lib/move-out-labels'

export const moveOutKeys = {
  handover: (contractId: string) => ['move-out-handover', contractId] as const,
  statement: (contractId: string) => ['deposit-statement', contractId] as const,
}

export interface ActionRunner {
  busy: boolean
  error: string | null
  run: (action: () => Promise<unknown>, fallback: string) => Promise<boolean>
}

/** Chạy một thao tác ghi: bật busy, hiện lỗi tiếng Việt, tải lại dữ liệu khi xong. */
export function useActionRunner(onDone: () => unknown): ActionRunner {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const run = useCallback(
    async (
      action: () => Promise<unknown>,
      fallback: string
    ): Promise<boolean> => {
      setBusy(true)
      setError(null)
      try {
        await action()
        await onDone()
        return true
      } catch (actionError) {
        setError(getMoveOutErrorMessage(actionError, fallback))
        return false
      } finally {
        setBusy(false)
      }
    },
    [onDone]
  )
  return { busy, error, run }
}

/** Tải lại dữ liệu của hợp đồng cha sau mỗi thao tác ghi thành công. */
export type OnChanged = () => unknown

export function useMoveOutHandover(contractId: string, onChanged?: OnChanged) {
  const query = useQuery({
    queryKey: moveOutKeys.handover(contractId),
    queryFn: () => getMoveOutHandover(contractId),
  })
  const { refetch } = query
  const runner = useActionRunner(
    useCallback(async () => {
      await refetch()
      await onChanged?.()
    }, [refetch, onChanged])
  )
  return {
    handover: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    ...runner,
  }
}

/** Chỉ tải bảng khấu trừ khi biên bản trả nhà đã hoàn tất. */
export function useDepositStatement(
  contractId: string,
  enabled: boolean,
  onChanged?: OnChanged
) {
  const query = useQuery({
    queryKey: moveOutKeys.statement(contractId),
    queryFn: () => getDepositStatement(contractId),
    enabled,
  })
  const { refetch } = query
  const runner = useActionRunner(
    useCallback(async () => {
      await refetch()
      await onChanged?.()
    }, [refetch, onChanged])
  )
  return {
    statement: query.data ?? null,
    isLoading: enabled && query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    ...runner,
  }
}
