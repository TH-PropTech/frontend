'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMyListings } from '@/features/apartment-posting'
import { getMyContracts } from '@/features/contracts'
import type { LandlordPortfolio, ProfileDataStatus } from './types'
import { EMPTY_STATS, buildPortfolio } from './landlord-portfolio'

const EMPTY = buildPortfolio([], [])

/**
 * Tải căn hộ + hợp đồng của chủ nhà từ backend với 3 trạng thái: loading, error, ready.
 */
export function useLandlordPortfolio(enabled: boolean): LandlordPortfolio {
  const [hasToken, setHasToken] = React.useState(false)
  React.useEffect(() => {
    const timer = setTimeout(
      () => setHasToken(!!localStorage.getItem('accessToken')),
      0
    )
    return () => clearTimeout(timer)
  }, [])
  const live = enabled && hasToken

  const listings = useQuery({
    queryKey: ['my-listings'],
    queryFn: getMyListings,
    enabled: live,
  })
  const contracts = useQuery({
    queryKey: ['my-contracts'],
    queryFn: getMyContracts,
    enabled: live,
  })

  const retry = React.useCallback(() => {
    void listings.refetch()
    void contracts.refetch()
  }, [listings, contracts])

  const isLoading = live && (listings.isLoading || contracts.isLoading)
  const isError = live && (listings.isError || contracts.isError)
  const status: ProfileDataStatus = !live
    ? 'ready'
    : isLoading
      ? 'loading'
      : isError
        ? 'error'
        : 'ready'

  const built = React.useMemo(
    () =>
      listings.data && contracts.data
        ? buildPortfolio(listings.data, contracts.data)
        : EMPTY,
    [listings.data, contracts.data]
  )

  return {
    ...built,
    stats: live && !isError ? built.stats : EMPTY_STATS,
    isLive: live,
    isLoading: !!isLoading,
    isError: !!isError,
    status,
    retry,
  }
}
