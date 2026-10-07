'use client'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { getMyPayouts, type PayoutList } from '../api/payout-api'

export function useLandlordPayouts(): UseQueryResult<PayoutList, Error> {
  return useQuery({
    queryKey: ['payouts', 'me'],
    queryFn: getMyPayouts,
  })
}
