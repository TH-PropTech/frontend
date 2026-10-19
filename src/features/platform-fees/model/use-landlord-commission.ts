'use client'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import {
  getApartmentCommission,
  previewLandlordCommission,
  type LandlordCommissionPackageInput,
  type LandlordCommissionPreview,
} from '../api/platform-fees-api'

export type LandlordCommissionSource =
  | { apartmentId: string }
  | { packages: LandlordCommissionPackageInput[] }

/** Fetches only while `enabled` (the dialog is open). */
export function useLandlordCommission(
  source: LandlordCommissionSource,
  enabled: boolean
): UseQueryResult<LandlordCommissionPreview, Error> {
  const apartmentId = 'apartmentId' in source ? source.apartmentId : null
  const packages = 'packages' in source ? source.packages : []
  return useQuery({
    queryKey: apartmentId
      ? ['platform-fees', 'apartment-commission', apartmentId]
      : ['platform-fees', 'commission-preview', packages],
    queryFn: () =>
      apartmentId
        ? getApartmentCommission(apartmentId)
        : previewLandlordCommission(packages),
    enabled,
    staleTime: 30_000,
  })
}
