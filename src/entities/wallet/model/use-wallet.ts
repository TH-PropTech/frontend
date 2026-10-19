'use client'

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import {
  getPayableInvoices,
  getReceivingStatus,
  getWallet,
  getWalletTransactions,
  linkWallet,
  reportPayoutIssue,
  type LinkWalletInput,
  type PayableInvoice,
  type ReceivingStatus,
  type Wallet,
  type WalletTransactionPage,
} from '../api/wallet-api'

const WALLET_KEY = ['wallet'] as const

export function useWallet(): UseQueryResult<Wallet, Error> {
  return useQuery({ queryKey: [...WALLET_KEY, 'me'], queryFn: getWallet })
}

export function useWalletTransactions(): UseQueryResult<
  WalletTransactionPage,
  Error
> {
  return useQuery({
    queryKey: [...WALLET_KEY, 'transactions'],
    queryFn: getWalletTransactions,
  })
}

export function usePayableInvoices(options?: {
  /** Poll interval while a payment dialog is open; false/undefined = off. */
  refetchIntervalMs?: number | false
}): UseQueryResult<PayableInvoice[], Error> {
  return useQuery({
    queryKey: [...WALLET_KEY, 'invoices'],
    queryFn: getPayableInvoices,
    refetchInterval: options?.refetchIntervalMs ?? false,
  })
}

export function useLinkWallet(): UseMutationResult<
  Wallet,
  Error,
  LinkWalletInput
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: linkWallet,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: WALLET_KEY })
      await queryClient.invalidateQueries({ queryKey: ['payouts'] })
    },
  })
}

const RECEIVING_STATUS_KEY = [...WALLET_KEY, 'receiving-status'] as const

export function useReceivingStatus(): UseQueryResult<ReceivingStatus, Error> & {
  /** Forces a fresh server-side live check (refresh=true). */
  refreshNow: () => Promise<unknown>
} {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: RECEIVING_STATUS_KEY,
    queryFn: () => getReceivingStatus(false),
    staleTime: 60_000,
  })
  const refreshNow = async (): Promise<unknown> => {
    const fresh = await getReceivingStatus(true)
    queryClient.setQueryData(RECEIVING_STATUS_KEY, fresh)
    return fresh
  }
  return { ...query, refreshNow }
}

export function useReportPayoutIssue(): UseMutationResult<
  { reportedAt: string },
  Error,
  { payoutId: string; note?: string }
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ payoutId, note }) => reportPayoutIssue(payoutId, note),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: RECEIVING_STATUS_KEY })
    },
  })
}
