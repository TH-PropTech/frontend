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
  getWallet,
  getWalletBanks,
  getWalletTransactions,
  linkWallet,
  payInvoiceFromWallet,
  type LinkWalletInput,
  type PayableInvoice,
  type Wallet,
  type WalletBank,
  type WalletTransactionPage,
} from '../api/wallet-api'

const WALLET_KEY = ['wallet'] as const

export function useWallet(): UseQueryResult<Wallet, Error> {
  return useQuery({ queryKey: [...WALLET_KEY, 'me'], queryFn: getWallet })
}

export function useWalletBanks(): UseQueryResult<WalletBank[], Error> {
  return useQuery({
    queryKey: [...WALLET_KEY, 'banks'],
    queryFn: getWalletBanks,
    staleTime: Infinity,
  })
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

export function usePayableInvoices(): UseQueryResult<PayableInvoice[], Error> {
  return useQuery({
    queryKey: [...WALLET_KEY, 'invoices'],
    queryFn: getPayableInvoices,
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

export function usePayInvoiceFromWallet(): UseMutationResult<
  unknown,
  Error,
  string
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: payInvoiceFromWallet,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: WALLET_KEY })
    },
  })
}
