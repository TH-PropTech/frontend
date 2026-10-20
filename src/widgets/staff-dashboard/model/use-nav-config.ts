'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api'

export interface NavConfig {
  /** Id các mục menu admin đã ẩn với nhân viên. */
  hiddenForStaff: string[]
  updatedAt: string | null
  updatedBy: string | null
}

const PATH = '/admin/nav-config'
export const navConfigKey = ['admin', 'nav-config'] as const

export function useNavConfig() {
  return useQuery({
    queryKey: navConfigKey,
    queryFn: () => apiClient.get<NavConfig>(PATH),
    staleTime: 60_000,
  })
}

export function useUpdateNavConfig() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (hiddenForStaff: string[]) =>
      apiClient.put<NavConfig>(PATH, { hiddenForStaff }),
    onSuccess: data => {
      queryClient.setQueryData(navConfigKey, data)
    },
  })
}
