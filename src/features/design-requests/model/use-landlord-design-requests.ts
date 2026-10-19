'use client'

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import {
  approveDesignRequest,
  cancelDesignRequest,
  createDesignRequest,
  feedbackDesignRequest,
  getDesignRequest,
  listMyDesignRequests,
  replyDesignRequest,
  type CreateDesignRequestInput,
  type DesignRequest,
  type DesignRequestListFilter,
  type DesignRequestNoteInput,
  type DesignRequestPage,
  type DesignRequestSummary,
} from '../api/design-requests-api'

export const designRequestKeys = {
  all: ['design-requests'] as const,
  mine: (filter: DesignRequestListFilter) =>
    ['design-requests', 'my', filter] as const,
  detail: (id: string) => ['design-requests', 'detail', id] as const,
}

interface QueryOptions {
  enabled?: boolean
  refetchIntervalMs?: number
}

export function useMyDesignRequests(
  filter: DesignRequestListFilter = {},
  options: QueryOptions = {}
): UseQueryResult<DesignRequestPage, Error> {
  const { enabled = true, refetchIntervalMs } = options
  return useQuery({
    queryKey: designRequestKeys.mine(filter),
    queryFn: () => listMyDesignRequests(filter),
    enabled,
    refetchInterval: refetchIntervalMs ?? false,
  })
}

export function useDesignRequest(
  id: string | null,
  options: QueryOptions = {}
): UseQueryResult<DesignRequest, Error> {
  const { enabled = true, refetchIntervalMs } = options
  return useQuery({
    queryKey: designRequestKeys.detail(id ?? ''),
    queryFn: () => getDesignRequest(id as string),
    enabled: enabled && id !== null,
    refetchInterval: refetchIntervalMs ?? false,
  })
}

function useInvalidateAll(): () => Promise<void> {
  const client = useQueryClient()
  return () => client.invalidateQueries({ queryKey: designRequestKeys.all })
}

export function useCreateDesignRequest(): UseMutationResult<
  DesignRequestSummary,
  Error,
  CreateDesignRequestInput
> {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: input => createDesignRequest(input),
    onSuccess: invalidate,
  })
}

export function useReplyDesignRequest(): UseMutationResult<
  DesignRequest,
  Error,
  { id: string; input: DesignRequestNoteInput }
> {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: ({ id, input }) => replyDesignRequest(id, input),
    onSuccess: invalidate,
  })
}

export function useApproveDesignRequest(): UseMutationResult<
  DesignRequest,
  Error,
  string
> {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: id => approveDesignRequest(id),
    onSuccess: invalidate,
  })
}

export function useFeedbackDesignRequest(): UseMutationResult<
  DesignRequest,
  Error,
  { id: string; input: DesignRequestNoteInput }
> {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: ({ id, input }) => feedbackDesignRequest(id, input),
    onSuccess: invalidate,
  })
}

export function useCancelDesignRequest(): UseMutationResult<
  DesignRequest,
  Error,
  string
> {
  const invalidate = useInvalidateAll()
  return useMutation({
    mutationFn: id => cancelDesignRequest(id),
    onSuccess: invalidate,
  })
}
