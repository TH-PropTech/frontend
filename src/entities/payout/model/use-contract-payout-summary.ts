'use client'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import {
  getContractPayoutSummary,
  type ContractPayoutSummary,
} from '../api/payout-api'

export function useContractPayoutSummary(
  contractId: string | null | undefined,
  enabled = true
): UseQueryResult<ContractPayoutSummary, Error> {
  return useQuery({
    queryKey: ['payouts', 'contract-summary', contractId],
    queryFn: () => getContractPayoutSummary(contractId as string),
    enabled: enabled && Boolean(contractId),
  })
}
