'use client'

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  deliverDesignRequest,
  escalateDesignRequest,
  getDesignRequest,
  listDesignRequestQueue,
  rejectDesignRequest,
  requestInfoDesignRequest,
  startDesignRequest,
  type DesignRequest,
  type DesignRequestListFilter,
} from '../api/design-requests-api'

export const staffDesignRequestKeys = {
  all: ['design-requests', 'staff'] as const,
  queueRoot: () => [...staffDesignRequestKeys.all, 'queue'] as const,
  queue: (filter: DesignRequestListFilter) =>
    [...staffDesignRequestKeys.queueRoot(), filter] as const,
  detail: (id: string) =>
    [...staffDesignRequestKeys.all, 'detail', id] as const,
}

export function useDesignRequestQueue(filter: DesignRequestListFilter) {
  return useQuery({
    queryKey: staffDesignRequestKeys.queue(filter),
    queryFn: () => listDesignRequestQueue(filter),
    placeholderData: keepPreviousData,
  })
}

export function useDesignRequestDetail(id: string | null) {
  return useQuery({
    queryKey: staffDesignRequestKeys.detail(id ?? ''),
    queryFn: () => getDesignRequest(id ?? ''),
    enabled: id !== null,
  })
}

function useStaffTransition<TInput>(
  action: (id: string, input: TInput) => Promise<DesignRequest>
) {
  const queryClient = useQueryClient()
  const invalidate = async (id: string): Promise<void> => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: staffDesignRequestKeys.queueRoot(),
      }),
      queryClient.invalidateQueries({
        queryKey: staffDesignRequestKeys.detail(id),
      }),
    ])
  }
  const mutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: TInput }) =>
      action(id, input),
    onSuccess: (_data, { id }) => invalidate(id),
  })
  // Một yêu cầu đã đổi trạng thái (409): vẫn phải tải lại cho đúng.
  return { ...mutation, refresh: invalidate }
}

export function useEscalateDesignRequest() {
  return useStaffTransition<{ note?: string }>(escalateDesignRequest)
}

export function useRequestInfoDesignRequest() {
  return useStaffTransition<{ note: string }>(requestInfoDesignRequest)
}

export function useRejectDesignRequest() {
  return useStaffTransition<{ note: string }>(rejectDesignRequest)
}

export function useStartDesignRequest() {
  return useStaffTransition<undefined>(id => startDesignRequest(id))
}

export function useDeliverDesignRequest() {
  return useStaffTransition<{ designId: string; note?: string }>(
    deliverDesignRequest
  )
}
