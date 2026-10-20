'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMyListings } from '@/features/apartment-posting'
import { getMyContracts } from '@/features/contracts'
import type { LandlordPortfolio } from './types'
import { EMPTY_STATS, buildPortfolio } from './landlord-portfolio'

const EMPTY = buildPortfolio([], [])

/**
 * Tải căn hộ + hợp đồng của chủ nhà từ backend. Chỉ chạy khi vai trò là chủ nhà và đã có accessToken;
 * chưa đăng nhập thì `isLive = false` để giao diện giữ dữ liệu demo như trước.
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

  const built = React.useMemo(
    () =>
      listings.data && contracts.data
        ? buildPortfolio(listings.data, contracts.data)
        : EMPTY,
    [listings.data, contracts.data]
  )

  return {
    ...built,
    stats: live ? built.stats : EMPTY_STATS,
    isLive: live,
    isLoading: live && (listings.isLoading || contracts.isLoading),
    isError: live && (listings.isError || contracts.isError),
  }
}
